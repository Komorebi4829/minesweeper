import { create } from 'zustand'
import { Level, SPECIFICATION, CellStatus, GameMode, CellType, GameStatus } from '@/utils/constants'
import { initLevel, initLang } from '@/config'
import type { CellInfo } from '@/types/cell'
import init from '@/utils/gameHelper'

interface BearState {
  mode: GameMode
  cells: CellInfo[][]
  level: Level
  boomPos: [number, number]
  status: GameStatus
  mouseDown: boolean
  lang: string
  startTime: number
  endTime: number

  toggleMode: () => void
  setCells: (cells: CellInfo[][]) => void
  refresh: () => void
  reset: (level?: Level) => void
  start: () => void
  finish: (status: GameStatus.success | GameStatus.fail) => void
  boom: (x: number, y: number) => void
  debugPos: [number, number]
  setDebugPos: (x: number, y: number) => void
  setMouseDown: (s: boolean) => void
  setLang: (lang: string) => void
}

const { row, col, amount } = SPECIFICATION[initLevel]
const cells = init(row, col, amount)

const useBearStore = create<BearState>()((set) => ({
  mode: process.env.NODE_ENV === 'development' ? GameMode.cheat : GameMode.normal,
  level: initLevel,
  status: GameStatus.initial,
  mouseDown: false,
  lang: initLang,
  startTime: 0,
  endTime: 0,

  setMouseDown: (s: boolean) => set((state) => ({ mouseDown: s })),
  toggleMode: () =>
    set((state) => ({ mode: state.mode === GameMode.cheat ? GameMode.normal : GameMode.cheat })),
  changeLevel: (newLevel: Level) => set((state) => ({ level: newLevel })),
  cells: cells,
  setCells: (cells: CellInfo[][]) => set(() => ({ cells })),
  refresh: () =>
    set((state) => ({
      cells: init(
        SPECIFICATION[state.level].row,
        SPECIFICATION[state.level].col,
        SPECIFICATION[state.level].amount,
      ),
    })),
  reset: (level?: Level) =>
    set((state) => ({
      status: GameStatus.initial,
      cells: init(
        SPECIFICATION[level || state.level].row,
        SPECIFICATION[level || state.level].col,
        SPECIFICATION[level || state.level].amount,
      ),
      boomPos: [-1, -1],
      level: level || state.level,
      startTime: 0,
      endTime: 0,
    })),
  start: () =>
    set((state) => ({
      status: GameStatus.start,
      startTime: +new Date(),
    })),
  finish: (status: GameStatus.success | GameStatus.fail) =>
    set((state) => ({
      status: status,
      endTime: +new Date(),
    })),

  boomPos: [-1, -1],
  boom: (x: number, y: number) =>
    set((state) => ({
      status: GameStatus.fail,
      boomPos: [x, y],
    })),

  debugPos: [0, 0],
  setDebugPos: (x: number, y: number) =>
    set((state) => ({
      debugPos: [x, y],
    })),
  setLang: (lang: string) => set((state) => ({ lang })),
}))

export default useBearStore
