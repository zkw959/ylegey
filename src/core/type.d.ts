/**
 * 块类型
 * id、坐标、层级、图案、状态、上下的方块
 */
interface BlockType{
  id: number;
  x: number;
  y: number;
  level: number;
  type: string;
  // 0 -正常，1- 已点击， 2- 已消除
  status: 0 | 1 | 2;
  // 压住的方块
  higherThanBlocks: BlockType[];
  // 被哪些方块压住
  lowerThanBlocks: BlockType[];

}

/**
 * 棋盘每个格子单元类型
 */
interface ChessBoardUnitType{
  // 放到当前格子里的块（层级越高下标越大）
  blocks: BlockTypep[];
}

/**
 * 游戏配置类型
 */
interface GameConfigType{
  // 槽容量
  slotNum: number;
  // 可合成的数量
  composeNum: number;
  // 图案个数
  graphicNum: number
  // 图案列表
  graphics: string[]
  // 边界收缩步长
  borderStep: number;

  // 每层块数
  levelBlockNum: number
  // 总层数
  levelNum: number
  // 随机区块数
  randomBlocks: number[]

}

/**
 * 技能类型
 */
interface SkillType{
  name: string;
  desc: string;
  icon: string;
  action: funciton;
}