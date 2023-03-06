import React, { useState, useEffect, useMemo } from 'react'
import Cell from '@/components/Cell'
import {
  GameStatus,
  GameMode,
  SPECIFICATION,
  CellType,
  CellStatus,
  CellGameOverStatus,
} from '@/utils/constants'
// import useGameStore from '@/store'
import useBearStore from '@/store/game'
import Game from '@/utils/Game'
import init from '@/utils/gameHelper'
import PlayInfo from '@/container/PlayInfo'
import { isMine, isBlank, isNumber, isOpen, isFlag } from '@/utils/cellHelper'
import type { CellInfo } from '@/types/cell'
import { getAround } from '@/utils/utils'
import './index.less'

export default function Playground() {
  // const game = new Game()
  const mode = useBearStore((state) => state.mode)
  const level = useBearStore((state) => state.level)
  const setCells = useBearStore((state) => state.setCells)
  const cells = useBearStore((state) => state.cells)
  const status = useBearStore((state) => state.status)
  const refresh = useBearStore((state) => state.refresh)
  const start = useBearStore((state) => state.start)
  const finish = useBearStore((state) => state.finish)
  const boom = useBearStore((state) => state.boom)
  const setDebugPos = useBearStore((state) => state.setDebugPos)
  const setMouseDown = useBearStore((state) => state.setMouseDown)

  useEffect(() => {}, [])

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // TODO if right click, flag immediately when mouse down
    const { x, y } = e.currentTarget.dataset as any
    if (e.button === 1) {
      setDebugPos(Number(x), Number(y))
    }
    setMouseDown(true)
  }

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    let { x, y } = e.currentTarget.dataset as any
    setMouseDown(false)

    if (e.button !== 0) {
      console.log(e.button)
      return
    }

    if (status === GameStatus.success || status === GameStatus.fail) {
      return
    }

    const { row, col, amount } = SPECIFICATION[level]
    x = Number(x)
    y = Number(y)

    let cell = cells[y][x]
    let newCells = cells
    if (status === GameStatus.initial) {
      while (isMine(cell)) {
        newCells = init(
          SPECIFICATION[level].row,
          SPECIFICATION[level].col,
          SPECIFICATION[level].amount,
        )
        cell = newCells[y][x]
      }
      start()
      newCells = open(newCells, x, y, row, col, amount)
      if (isBlank(cell)) {
        newCells = openMoreBlank(newCells, x, y, row, col)
      }
      setCells([...newCells])
    } else {
      const cell = cells[y][x]
      if (cell.status === CellStatus.initial) {
        open(cells, x, y, row, col, amount)
        if (isMine(cell)) {
          openAll(cells)
          boom(x, y)
          finish(GameStatus.fail)
          setCells([...cells])
          return
        }

        // check complete or not

        if (isBlank(cell)) {
          openMoreBlank(cells, x, y, row, col)
        }

        if (checkComplete(cells, row, col, amount)) {
          openAll(cells)
          finish(GameStatus.success)
        }
        setCells([...cells])
      }
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { x, y } = e.currentTarget.dataset
  }

  /**
   * open one cell
   * @param x
   * @param y
   * @param row
   * @param col
   * @param amount
   * @returns cells
   */
  const open = (
    cells: CellInfo[][],
    x: number,
    y: number,
    row: number,
    col: number,
    amount: number,
  ): CellInfo[][] => {
    const c = cells[y][x]
    if (isFlag(c) || isOpen(c)) {
      return cells
    }
    c.status = CellStatus.opened
    if (isMine(c)) {
      openAll(cells)
      boom(x, y)
      return cells
    }
    if (isBlank(c)) {
      openMoreBlank(cells, x, y, row, col)
    }
    return cells
  }

  const checkComplete = (
    cells: CellInfo[][],
    row: number,
    col: number,
    amount: number,
  ): boolean => {
    let open = 0
    const size = row * col
    for (let i = 0; i < cells.length; i++) {
      var item = cells[i]
      for (let j = 0; j < item.length; j++) {
        let item2 = item[j]
        if (isOpen(item2)) {
          open += 1
        }
      }
    }
    if (open + amount === size) {
      return true
    }
    return false
  }

  const openMoreBlank = (
    cells: CellInfo[][],
    x: number,
    y: number,
    row: number,
    column: number,
  ) => {
    const l = getAround(x, y, row, column)
    const toOpenBlock = []
    let haveMine = false
    for (let j = 0; j < l.length; j++) {
      let item = l[j]
      let [aroundX, aroundY] = item
      let aroundCell = cells[aroundY][aroundX]
      // 先看四周是否有雷
      if (isMine(aroundCell)) {
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
          if (!isOpen(aroundCell)) {
            if (!isFlag(aroundCell)) {
              aroundCell.status = CellStatus.opened
            }
            openMoreBlank(cells, aroundX, aroundY, row, column)
          }
        } else if (aroundCell.mineNum > 0) {
          if (!isFlag(aroundCell)) {
            aroundCell.status = CellStatus.opened
          }
        }
      }
    }
    return cells
  }

  const openAll = (cells: CellInfo[][]) => {
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        let cell = cells[i][j]
        if (isFlag(cell) || isOpen(cell)) {
          continue
        }
        cell.status = CellStatus.opened
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <PlayInfo />
      <div className="board flex flex-col justify-center items-center">
        {cells.map((row, i) => {
          const rows = row.map((cell, j) => {
            const key = `x${j}-y${i}`
            return (
              <Cell
                key={key}
                i={i}
                j={j}
                cell={cell}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                // onMouseMove={onMouseMove}
              />
            )
          })

          return (
            <div className="flex" key={i}>
              {rows}
            </div>
          )
        })}
      </div>
    </div>
  )
}
