import React, { memo } from 'react'
import { CellStatus, CellType, CellGameOverStatus, GameStatus, GameMode } from '@/utils/constants'
import type { CellInfo } from '@/types/cell'
import './index.less'
import useGameStore from '@/store/game'
import cls from 'classnames'

type Props = {
  i: number
  j: number
  cell: CellInfo

  onMouseDown?(event: React.MouseEvent<HTMLDivElement>): void
  onMouseUp?(event: React.MouseEvent<HTMLDivElement>): void
  onMouseMove?(event: React.MouseEvent<HTMLDivElement>): void
}

type SubCellProps = Props & { pos: string; gameFinish: boolean; cheat: boolean }

const BlankCell = (props: SubCellProps) => {
  const { pos, cell, onMouseDown, onMouseUp, onMouseMove, i, j } = props
  const { status } = cell || {}
  const opened = status === CellStatus.opened
  return (
    <div
      data-pos={pos}
      data-x={j}
      data-y={i}
      data-minenum="0"
      className={cls('cell cell-blank', opened ? 'cell-open' : 'cell-initial')}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    ></div>
  )
}

const NumberCell = (props: SubCellProps) => {
  const { pos, cell, onMouseDown, onMouseUp, onMouseMove, i, j, cheat } = props
  const { mineNum, status } = cell || {}
  const opened = status === CellStatus.opened

  return (
    <div
      data-pos={pos}
      data-x={j}
      data-y={i}
      data-num={mineNum}
      className={cls('cell cell-number', opened ? 'cell-open' : 'cell-initial')}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {opened && mineNum}
      {cheat && !opened && <span className="cell-cheat">{mineNum}</span>}
    </div>
  )
}

const MineCell = (props: SubCellProps) => {
  const { pos, cell, onMouseDown, onMouseUp, onMouseMove, i, j, cheat, gameFinish } = props
  const { status } = cell || {}
  const isOpen = status === CellStatus.opened
  const boomPos = useGameStore((state) => state.boomPos)
  const isBoom = boomPos[0] === j && boomPos[1] === i
  return (
    <div
      data-pos={pos}
      data-x={j}
      data-y={i}
      className={cls(
        'cell cell-mine',
        isOpen ? 'cell-open' : 'cell-initial',
        isBoom && 'cell-boom',
      )}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {cheat && !gameFinish && <span className="cell-cheat">💣</span>}
      {gameFinish && '💣'}
    </div>
  )
}

// TODO cheat->perspective
// TODO dark mode, before dark, the UI is high priority

// TODO
// const FlagCell = (props: SubCellProps) => {
//   const { pos, onMouseDown, onMouseUp, onMouseMove, i, j } = props
//   return (
//     <div
//       data-pos={pos}
//       data-x={j}
//       data-y={i}
//       className="cell cell-flag"
//       onMouseDown={onMouseDown}
//       onMouseUp={onMouseUp}
//       onMouseMove={onMouseMove}
//     ></div>
//   )
// }

function Cell(props: Props) {
  const { i, j, cell, onMouseDown, onMouseUp, onMouseMove } = props
  const gameStatus = useGameStore((state) => state.status)
  const mode = useGameStore((state) => state.mode)

  const gameFinishs = [GameStatus.success, GameStatus.fail]
  const commonProps = {
    ...props,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    pos: `x${j}-y${i}`,
    cheat: mode === GameMode.cheat,
    gameFinish: gameFinishs.includes(gameStatus),
  }

  const { type } = cell

  const cellMap = {
    [CellType.blank]: BlankCell,
    [CellType.mine]: MineCell,
    [CellType.number]: NumberCell,
  }
  const SubCell = cellMap[type]
  return <SubCell {...commonProps} />
}

export default memo(Cell)
