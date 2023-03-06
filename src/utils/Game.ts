import { Level, SPECIFICATION, GameMode, CellType, GameStatus } from '@/utils/constants'
import { initLevel } from '@/config'
import Cell from './Cell'
import { random, intersect, getAround } from './utils'

export default class Game {
  public mineNum: number
  public level: Level
  public mode: GameMode
  // @ts-ignore
  public cells: Cell[][]
  public status: GameStatus

  private startTime
  private endTime

  constructor() {
    this.level = initLevel
    const { row, col, amount } = SPECIFICATION[initLevel]
    this.mineNum = amount
    this.mode = GameMode.cheat
    this.status = GameStatus.initial

    this.startTime = 0
    this.endTime = 0

    this.init(row, col, amount)
  }

  private init(row: number, column: number, mineAmount: number): void {
    const minesIndexs = this._generateMines(row, column, mineAmount)
    const matrix = this._generateNumber(row, column, minesIndexs)
    const cells = this._initCells(row, column, matrix)
    this.cells = cells
  }

  /**
   * Records the index of the mine on the grid
   * @param row
   * @param column
   * @param amount
   */
  private _generateMines(row: number, column: number, amount: number): number[] {
    const size = row * column
    const l = []
    for (let i = 0; i < amount; i++) {
      let mineIndex = random() * size
      mineIndex = Math.floor(mineIndex)
      // if repeat
      while (l.indexOf(mineIndex) !== -1) {
        mineIndex = random() * size
        mineIndex = Math.floor(mineIndex)
      }
      l.push(mineIndex)
    }
    return l
  }

  private _generateNumber(row: number, column: number, minesIndex: number[]) {
    const size = row * column
    const matrix = Array(size).fill(0)
    for (let i = 0; i < minesIndex.length; i++) {
      const item = minesIndex[i]
      const y = Math.floor(item / column)
      const x = item - y * column
      const l = getAround(x, y, row, column)
      // mark the mine on grid
      matrix[this._getIndex(x, y, row, column)] = 'x'

      for (let j = 0; j < l.length; j++) {
        // 遍历雷的四周，最后如果得到了数字，就把数字替换到格子上
        const item = l[j]
        // console.debug('item', item)
        const x = item[0]
        const y = item[1]
        // 雷的四周不全是数字，也有可能是雷
        if (minesIndex.indexOf(this._getIndex(x, y, row, column)) > -1) {
          continue
        }
        const ll = getAround(x, y, row, column)
        // 转化x y到索引
        // 这里得到的是 原始雷的四周的四周的坐标索引
        const ll_index = ll.map((item) => {
          const x = item[0]
          const y = item[1]
          return this._getIndex(x, y, row, column)
        })
        // 用这个索引 与 雷 的索引对比，如果有一致的说明这个点的数字+1
        const result = intersect(ll_index, minesIndex)
        const mineNum = result.length

        const mineNumIndex = this._getIndex(x, y, row, column)
        matrix[mineNumIndex] = mineNum
      }
    }
    // console.debug('matrix', matrix)
    return matrix
  }

  private _initCells(row: number, column: number, matrix: Array<number | string>): Cell[][] {
    const cells = []
    for (let i = 0; i < row; i++) {
      const line = []
      for (let j = 0; j < column; j++) {
        const index = this._getIndex(j, i, row, column)
        const info = matrix[index]
        line.push(new Cell(j, i, info))
      }
      cells.push(line)
    }
    return cells
  }

  /**
   * Given x,y coordinates and column, calculate the index of this point
   * @param x
   * @param y
   * @param row not use
   * @param column
   * @returns
   */
  private _getIndex(x: number, y: number, row: number, column: number): number {
    return y * column + x
  }

  // TODO too many parameters?
  open(x: number, y: number, row: number, column: number, amount: number) {
    const c = this.cells[y][x]
    if (c.isFlag() || c.isOpen()) {
      return
    }
    c.open()
    if (c.isMine()) {
      this.openAll()
      c.boom()
      return
    }
    if (c.isBlank()) {
      this.openMoreBlank(x, y, row, column)
    }
    if (this.checkComplete(row, column, amount)) {
      this.openAll()
    }
  }

  openAll() {
    const { cells } = this
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        let cell = cells[i][j]
        if (cell.isFlag() || cell.isOpen()) {
          continue
        }

        cell.open()
      }
    }
  }

  checkComplete(row: number, column: number, amount: number): boolean {
    const { cells } = this
    let open = 0
    const size = row * column
    for (let i = 0; i < cells.length; i++) {
      var item = cells[i]
      for (let j = 0; j < item.length; j++) {
        let item2 = item[j]
        if (item2.isOpen()) {
          open += 1
        }
      }
    }
    if (open + amount === size) {
      return true
    }
    return false
  }

  openMoreBlank(x: number, y: number, row: number, column: number) {
    const { cells } = this
    const l = getAround(x, y, row, column)
    const toOpenBlock = []
    let haveMine = false
    for (let j = 0; j < l.length; j++) {
      let item = l[j]
      let [aroundX, aroundY] = item
      let aroundCell = cells[aroundY][aroundX]
      // 先看四周是否有雷
      if (aroundCell.isMine()) {
        haveMine = true
      } else {
        toOpenBlock.push(item)
      }
    }
    // 如果没有雷才继续开空白块
    if (!haveMine) {
      for (let j = 0; j < toOpenBlock.length; j++) {
        let item = l[j]
        let [aroundX, aroundY] = item
        let aroundCell = cells[aroundY][aroundX]
        if (aroundCell.mineNum === 0) {
          if (!aroundCell.isOpen()) {
            if (!aroundCell.isFlag()) {
              aroundCell.open()
            }
            this.openMoreBlank(aroundX, aroundY, row, column)
          }
        } else if (aroundCell.mineNum > 0) {
          if (!aroundCell.isFlag()) {
            aroundCell.open()
          }
        }
      }
    }
  }

  refresh() {
    const { row, col, amount } = SPECIFICATION[this.level]
    this.init(row, col, amount)
  }

  reset() {
    this.status = GameStatus.initial
    this.startTime = 0
    this.endTime = 0
  }

  start() {
    this.status = GameStatus.start
    this.startTime = +new Date()
  }

  finish() {
    this.status = GameStatus.finish
    this.endTime = +new Date()
  }
}
