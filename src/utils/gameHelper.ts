import type { CellInfo } from '@/types/cell'
import { random, intersect, getAround } from './utils'
import { CellStatus, Level, SPECIFICATION, GameMode, CellType, GameStatus } from '@/utils/constants'

export default function init(row: number, column: number, mineAmount: number): CellInfo[][] {
  const minesIndexs = _generateMines(row, column, mineAmount)
  const matrix = _generateNumber(row, column, minesIndexs)
  const cells = _initCells(row, column, matrix)
  return cells
}

/**
 * Records the index of the mine on the grid
 * @param row
 * @param column
 * @param amount
 */
function _generateMines(row: number, column: number, amount: number): number[] {
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

function _generateNumber(row: number, column: number, minesIndex: number[]) {
  const size = row * column
  const matrix = Array(size).fill(0)
  for (let i = 0; i < minesIndex.length; i++) {
    const item = minesIndex[i]
    const y = Math.floor(item / column)
    const x = item - y * column
    const l = getAround(x, y, row, column)
    // mark the mine on grid
    matrix[_getIndex(x, y, row, column)] = '💣'

    for (let j = 0; j < l.length; j++) {
      // Traverse around the mine. Finally, if a number is obtained, replace the grid with the number
      const item = l[j]
      // console.debug('item', item)
      const x = item[0]
      const y = item[1]
      // The surroundings of the mine are not all numbers; there may also be mines
      if (minesIndex.indexOf(_getIndex(x, y, row, column)) > -1) {
        continue
      }
      const ll = getAround(x, y, row, column)
      // Convert x and y to indices
      // Here we get the coordinates of the original mine’s surroundings
      const ll_index = ll.map((item) => {
        const x = item[0]
        const y = item[1]
        return _getIndex(x, y, row, column)
      })
      // Use this index to compare with the index of mines. If there is a match, it means that this point’s number +1
      const result = intersect(ll_index, minesIndex)
      const mineNum = result.length

      const mineNumIndex = _getIndex(x, y, row, column)
      matrix[mineNumIndex] = mineNum
    }
  }
  // console.debug('matrix', matrix)
  return matrix
}

function _initCells(row: number, column: number, matrix: Array<number | string>): CellInfo[][] {
  const cells = []
  for (let i = 0; i < row; i++) {
    const line = []
    for (let j = 0; j < column; j++) {
      const index = _getIndex(j, i, row, column)
      const mineNum = matrix[index]

      let type
      if (typeof mineNum === 'number') {
        type = mineNum === 0 ? CellType.blank : CellType.number
      } else {
        type = CellType.mine
      }

      line.push({
        x: j,
        y: i,
        mineNum,
        type,
        status: CellStatus.initial,
      })
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
function _getIndex(x: number, y: number, row: number, column: number): number {
  return y * column + x
}
