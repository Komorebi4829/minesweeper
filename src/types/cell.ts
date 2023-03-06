import { Level, SPECIFICATION, GameMode, CellType, GameStatus, CellStatus } from '@/utils/constants'

export type CellInfo = {
  x: number
  y: number
  mineNum: number | string
  type: CellType
  status: CellStatus
}
