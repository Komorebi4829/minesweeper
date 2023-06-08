import type { CellInfo } from '@/types/cell'
import {
  GameStatus,
  GameMode,
  SPECIFICATION,
  CellType,
  CellStatus,
  CellGameOverStatus,
} from '@/utils/constants'

export function isMine(cell: CellInfo) {
  return cell.type === CellType.mine
}

export function isBlank(cell: CellInfo) {
  return cell.type === CellType.blank
}

export function isNumber(cell: CellInfo) {
  return cell.type === CellType.number
}

export function isOpen(cell: CellInfo) {
  return cell.status === CellStatus.opened
}

export function isFlag(cell: CellInfo) {
  return cell.status === CellStatus.flagged
}

export function open(cell: CellInfo) {
  cell.status = CellStatus.opened
}

export function flag(cell: CellInfo) {
  cell.status = CellStatus.flagged
}
