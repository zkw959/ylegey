/**
 * 游戏逻辑 V2（不固定 level）
 *
 */

import { useglobalStore } from "@/store";
import _ from "lodash";
import { ref } from "vue";
const useGame = () => {

  const { gameConfig } = useglobalStore();

  // 游戏状态：0 - 初始化, 1 - 进行中, 2 - 失败结束, 3 - 胜利
  const gameStatus = ref(0);

  // 叠卡区
  const levelBlocksVal = ref<BlockType[]>([]);
  // 随机区
  const randomBlocksVal = ref<BlockType[][]>([]);
  // 插槽区
  const slotAreaVal = ref<BlockType[]>([]);
  // 当前槽占用数
  const currSlotNum = ref(0);


  
  // 保存所有块（叠卡区+随机区）
  const allBlocks: BlockType[] = [];
  const blockData: Record<number, BlockType> = {};


  //  总块数
  let totalBlockNum = ref(0);

  // 已消除块数
  let clearBlockNum = ref(0);

  // 总共划分 24 x 24 的格子，每个块占 3 x 3 的格子，生成的起始 x 和 y 坐标范围均为 0 ~ 21
  const boxWidthNum = 24;
  const boxHeightNum = 24;
  
  // 每个格子的宽高
  const widthUnit = 14;
  const heightUnit = 14;

  // 声明 棋盘 每个格子的状态
  let chessBoard: ChessBoardUnitType[][] = []

  // 操作历史
  let opHistory: BlockType[] = [];


  /**
   * 初始化指定大小的棋盘
   * @param width 
   * @param height 
   */
  const initChessBoard = (width: number, height: number) => {
    chessBoard = new Array(width)
    for(let i = 0; i < width; i++){
      chessBoard[i] = new Array(height)
      for(let j = 0; j < height; j++){
        chessBoard[i][j] = {
          blocks: []
        };
      }
    }
  }
  // 初始化棋盘
  initChessBoard(boxWidthNum, boxHeightNum);

  /**
   * 初始化游戏
   */
  const initGame = () => {
    // 0. 设置父容器宽高
    const levelBoardDom: any = document.querySelector('.level-board');
    
    levelBoardDom.style.width = widthUnit * boxWidthNum +'px';
    levelBoardDom.style.height = heightUnit * boxHeightNum  +'px';

    // 1. 规划块数（层级块+随机块）
    // 块单位
    const blockNumUnit = gameConfig.composeNum * gameConfig.graphicNum;
    console.log("块单位数：", blockNumUnit);

    // 随机块数
    const totalRandomBlockNum = gameConfig.randomBlocks.reduce((pre: number, cur: number) => (pre + cur), 0);
    console.log("随机生成的总块数", totalRandomBlockNum);

    // 最小块数(叠卡区+随机区)
    const minBlockNum = gameConfig.levelBlockNum * gameConfig.levelNum + totalRandomBlockNum;
    console.log("需要的最小块数", minBlockNum);

    // 根据块单位,补齐块数
    // e.g. minBlockNum = 160, blockNumUnit = 36, 补到 180
    totalBlockNum.value = minBlockNum;
    if(totalBlockNum.value % blockNumUnit !== 0){
      // 若不是整数倍
      totalBlockNum.value = Math.ceil(minBlockNum / blockNumUnit) * blockNumUnit;
    }
    console.log("总块数", totalBlockNum.value);

    // 2. 初始化块，随机生成块内容
    // 保存所有块的数组
    const graphicBlocks: String[] = [];
    // 需要用到的图形数组
    const needGraphics = gameConfig.graphics.slice(0, gameConfig.graphicNum);
    // 遍历依次把块放进数组里
    for(let i = 0; i < totalBlockNum.value; i++){
      graphicBlocks.push(needGraphics[i % gameConfig.graphicNum]);
    }
    // 打乱数组
    const randomGraphicBlocks = _.shuffle(graphicBlocks);

    // 初始化
    for(let i = 0; i < totalBlockNum.value; i++){
      const newBlock = {
        id: i,
        status: 0,
        level: 0,
        type: randomGraphicBlocks[i],
        higherThanBlocks: [] as BlockType[],
        lowerThanBlocks: [] as BlockType[]
      } as BlockType
      allBlocks.push(newBlock);
    }

    // 记录下一个要放入的块
    let pos = 0;

    // 3.计算随机生成的块
    const randomBlocks: BlockType[][] = []; // [8,8]
    gameConfig.randomBlocks.forEach((randomBlock: number, index: number)=>{
      randomBlocks[index] = []
      for(let i = 0; i < randomBlock; i++){
        randomBlocks[index].push(allBlocks[pos]);
        blockData[pos] = allBlocks[pos];
        pos++;
      }
    });

    // 剩余的块数
    let leftBlockNum = totalBlockNum.value - totalRandomBlockNum;
    
    // 4.计算有层级关系的块
    const levelBlocks: BlockType[] = [];
    let minX = 0;
    let maxX = 22;
    let minY = 0;
    let maxY = 22;
    // 分为 gameConfig.levelNum 批，依次生成，每批的边界不同
    for(let i = 0; i < gameConfig.levelNum; i++){
      let nextBlockNum = Math.min(gameConfig.levelBlockNum, leftBlockNum);
      // 最后一批，分配所有的 levelBlockNum
      if(i == gameConfig.levelNum - 1){
        nextBlockNum = leftBlockNum
      }
      // 边界收缩
      const { borderStep } = gameConfig
      if(borderStep > 0){
        const dir = i % 4;
        
        switch (dir) {
          case 0: {
            maxY -= borderStep;
            break;
          }
          case 1: {
            maxX -= borderStep;
            break;
          }
          case 2: {
            minY += borderStep;
            break;
          }
          case 3: {
            minX += borderStep;
            break;
          }
        }
        
      }
      const nextGenBlocks = allBlocks.slice(pos, pos + nextBlockNum);
      levelBlocks.push(...nextGenBlocks);
      pos = pos + nextBlockNum;
      // 生成块坐标
      genLevelBlockPos(nextGenBlocks, minX, minY, maxX, maxY);
      leftBlockNum -= nextBlockNum;
      if(leftBlockNum <= 0){
        break;
      }
    }

    // 5. 初始化空插槽
    const slotArea: BlockType[] = new Array(gameConfig.slotNum).fill(null);
    console.log("随机块情况", randomBlocks);
    
    return {
      levelBlocks,
      randomBlocks,
      slotArea
    }
  }

  /**
     * 生成一批层级块（坐标、层级关系）
     * @param blocks 
     * @param minX 
     * @param minY 
     * @param maxX 
     * @param maxY 
     */
   const genLevelBlockPos = (
    blocks: BlockType[],
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ) => {
    // 记录这批块的坐标，用于保证同批次元素不能完全重叠
    const currentPosSet = new Set<String>();
    blocks.forEach((block: BlockType, index: number)=>{
      // 随机生成坐标
      let newPosX;
      let newPosY;
      let key;
      while(true){
        newPosX = Math.floor(Math.random() * maxX + minX);
        newPosY = Math.floor(Math.random() * maxY + minY);
        key = newPosX + "," + newPosY;
        if(!currentPosSet.has(key)){
          break;
        }
      }
      chessBoard[newPosX][newPosY].blocks.push(block);
      currentPosSet.add(key);
      block.x = newPosX;
      block.y = newPosY;
      // 填充层级关系
      genLevelRelation(block);
    })
  };

  /**
   * 给块绑定层级关系（用于确认哪些元素是当前可点击的）
   * 核心逻辑：每个块压住和其坐标有交集棋盘格内所有 level 大于它的点，双向建立联系
   * @param block 
   */
  const genLevelRelation = (block: BlockType) => {
    // 确定该块附近的格子坐标范围
    const minX = Math.max(block.x - 2, 0);
    const minY = Math.max(block.y - 2, 0);
    const maxX = Math.min(block.x + 3, boxWidthNum - 2);
    const maxY = Math.min(block.y + 3, boxWidthNum - 2);
    // 遍历该块附近的格子
    let maxLevel = 0;
    for(let i = minX; i < maxX; i++){
      for(let j = minY; j < maxY; j++){
        const relationBlocks = chessBoard[i][j].blocks;
        if(relationBlocks.length > 0){
          // 取当前位置最高层的块
          const maxLevelRelationBlocks = relationBlocks[relationBlocks.length - 1] as BlockType
          // 排除自己
          if(maxLevelRelationBlocks.id === block.id){
            continue;
          }
          maxLevel = Math.max(maxLevel, maxLevelRelationBlocks.level);
          block.higherThanBlocks.push(maxLevelRelationBlocks);
          maxLevelRelationBlocks.lowerThanBlocks.push(block);
        }
      }
    }
    // 比最高层的块再高一层(初始为1)
    block.level = maxLevel + 1;
  }

  /**
   * 游戏开始
   */
  const doStart = () => {
    gameStatus.value = 0;
    const { levelBlocks, randomBlocks, slotArea } = initGame();
    console.log(levelBlocks, randomBlocks, slotArea);
    levelBlocksVal.value = levelBlocks;
    randomBlocksVal.value = randomBlocks;
    slotAreaVal.value = slotArea;
    gameStatus.value = 1;
  }
  
  /**
   * 点击块事件
   * @param block 
   * @param randomIndex 
   */
  const doClickBlock = (block: BlockType, randomIndex = -1,) => {
    // 不能点击：输了 | 已经点击的 | 有上层块
    if(gameStatus.value === 2 || block.status !== 0 || block.lowerThanBlocks.length > 0) {
      return;
    }
    // 修改元素状态为已点击
    block.status = 1;
    // 移除当前元素
    if(randomIndex >= 0){
      // 随机区
      randomBlocksVal.value[randomIndex].shift();
    }else{
      // 叠卡区
      // 操作堆栈
      opHistory.push(block);
      // 移除覆盖关系
      block.higherThanBlocks.forEach((higherThanBlock)=>{
        _.remove(higherThanBlock.lowerThanBlocks, (lowerThanBlock) => block.id === lowerThanBlock.id)
      });
    }

    // 将新元素加入插槽
    let tempSlotNum = currSlotNum.value;
    slotAreaVal.value[tempSlotNum] = block
    // 检查是否有可消除的
    // block => 出现次数
    const map: Record<string, number> = {};
    // 去除空槽
    const tempSlotAreaVal = slotAreaVal.value.filter(slotBlock => !!slotBlock);
    // 累计图案数量加入到map
    tempSlotAreaVal.forEach(slotBlock => {
      const type = slotBlock.type;
      if(!map[type]){
        // 初始化
        map[type] = 1;
      }else{
        // 自加
        map[type]++;
      }
    })
    console.log("tempSlotAreaVal", tempSlotAreaVal);
    console.log("map", map);

    // 得到合成后的新数组
    const newSlotAreaVal = new Array(gameConfig.slotNum).fill(null);
    tempSlotNum = 0;
    tempSlotAreaVal.forEach(slotBlock => {
      // 成功消除(不添加合成后的新数组)
      if(map[slotBlock.type] >= gameConfig.composeNum){
        // 块状态已消除
        slotBlock.status = 2;
        // 已消除块数 +1
        clearBlockNum.value++;
        // 清除操作记录,防止撤回
        opHistory = [];
        return;
      }
      newSlotAreaVal[tempSlotNum++] = slotBlock;
    })
    // 更新插槽区
    slotAreaVal.value = newSlotAreaVal;
    currSlotNum.value = tempSlotNum;
    // 游戏结束
    if(tempSlotNum >= gameConfig.slotNum) {
      gameStatus.value = 2;
      alert("你输了");
    }

    // 游戏胜利
    if(clearBlockNum.value >= totalBlockNum.value){
      gameStatus.value = 3;
    }
    






  }

  return{
    gameStatus,
    levelBlocksVal,
    randomBlocksVal,
    slotAreaVal,
    widthUnit,
    heightUnit,
    currSlotNum,
    opHistory,
    totalBlockNum,
    clearBlockNum,
    doStart,
    doClickBlock
  }
}
export default useGame;