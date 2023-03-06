import { CellType, CellStatus, CellGameOverStatus } from '@/utils/constants'

export default class Cell {
  public x
  public y
  public mineNum
  public type: CellType
  public status: CellStatus
  private gameOverStatus: CellGameOverStatus | null

  constructor(x: number, y: number, mineNum: number | string) {
    this.x = x
    this.y = y
    this.mineNum = mineNum

    if (typeof mineNum === 'number') {
      this.type = mineNum === 0 ? CellType.blank : CellType.number
    } else {
      this.type = CellType.mine
    }

    this.status = CellStatus.initial
    this.gameOverStatus = null
  }

  isMine() {
    return this.type === CellType.mine
  }

  isBlank() {
    return this.type === CellType.blank
  }

  isNumber() {
    return this.type === CellType.number
  }

  isOpen() {
    return this.status === CellStatus.opened
  }

  isFlag() {
    return this.status === CellStatus.flagged
  }

  open() {
    this.status = CellStatus.opened
  }

  flag() {
    this.status = CellStatus.flagged
  }

  boom() {
    this.gameOverStatus = CellGameOverStatus.bullseye
  }
}
