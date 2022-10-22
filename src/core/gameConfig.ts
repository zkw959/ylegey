// 图案数组
const graphics = [
    "🐔",
    "🏀",
    "只",
    "因",
    "你",
    "太",
    "美",
  ];
  
  export const defaultGameConfig: GameConfigType = {
    // 槽容量
    slotNum: 7,
    // 需要多少个一样块的才能合成
    composeNum: 3,
    // 图案个数
    graphicNum: 7,
    // 每层块数（大致）
    levelBlockNum: 24,
    // 边界收缩步长
    borderStep: 1,
    // 总层数（最小为 2）
    levelNum: 6,
    // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
    randomBlocks: [8, 8],
   // 图案数组
    graphics,
  };
  
  /**
   * 简单难度
   */
  export const easyGameConfig: GameConfigType = {
    // 槽容量
    slotNum: 7,
    // 需要多少个一样块的才能合成
    composeNum: 3,
    // 图案个数
    graphicNum: 7,
    // 每层块数（大致）
    levelBlockNum: 10,
    // 边界收缩步长
    borderStep: 1,
    // 总层数（最小为 2）
    levelNum: 6,
    // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
    randomBlocks: [4, 4],
   // 图案数组
    graphics,
  };
  
  /**
   * 中等难度
   */
  export const middleGameConfig: GameConfigType = {
    // 槽容量
    slotNum: 7,
    // 需要多少个一样块的才能合成
    composeNum: 3,
    // 图案个数
    graphicNum: 7,
    // 每层块数（大致）
    levelBlockNum: 12,
    // 边界收缩步长
    borderStep: 1,
    // 总层数（最小为 2）
    levelNum: 7,
    // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
    randomBlocks: [5, 5],
   // 图案数组
    graphics,
  };
  
  /**
   * 困难难度
   */
  export const hardGameConfig: GameConfigType = {
    // 槽容量
    slotNum: 7,
    // 需要多少个一样块的才能合成
    composeNum: 3,
    // 图案个数
    graphicNum: 7,
    // 每层块数（大致）
    levelBlockNum: 16,
    // 边界收缩步长
    borderStep: 1,
    // 总层数（最小为 2）
    levelNum: 8,
    // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
    randomBlocks: [6, 6],
   // 图案数组
    graphics,
  };
  
  /**
   * 地狱难度
   */
  export const lunaticGameConfig: GameConfigType = {
    // 槽容量
    slotNum: 7,
    // 需要多少个一样块的才能合成
    composeNum: 3,
    // 图案个数
    graphicNum: 7,
    // 每层块数（大致）
    levelBlockNum: 20,
    // 边界收缩步长
    borderStep: 2,
    // 总层数（最小为 2）
    levelNum: 10,
    // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
    randomBlocks: [8, 8],
   // 图案数组
    graphics,
  };
  
  /**
   * 天狱难度
   */
  export const skyGameConfig: GameConfigType = {
    // 槽容量
    slotNum: 7,
    // 需要多少个一样块的才能合成
    composeNum: 3,
    // 图案个数
    graphicNum: 7,
    // 每层块数（大致）
    levelBlockNum: 24,
    // 边界收缩步长
    borderStep: 2,
    // 总层数（最小为 2）
    levelNum: 12,
    // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
    randomBlocks: [8, 8],
   // 图案数组
    graphics,
  };
  
  /**
   * 羊了个羊难度
   */
  export const yangGameConfig: GameConfigType = {
    // 槽容量
    slotNum: 7,
    // 需要多少个一样块的才能合成
    composeNum: 3,
    // 图案个数
    graphicNum: 7,
    // 每层块数（大致）
    levelBlockNum: 28,
    // 边界收缩步长
    borderStep: 3,
    // 总层数（最小为 2）
    levelNum: 15,
    // 随机区块数（数组长度代表随机区数量，值表示每个随机区生产多少块）
    randomBlocks: [8, 8],
   // 图案数组
    graphics,
  };
  