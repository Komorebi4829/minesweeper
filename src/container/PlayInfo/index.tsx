import React, { useState, useEffect, useRef } from 'react'
import useGameStore from '@/store/game'
import {
  CellStatus,
  SPECIFICATION,
  CellType,
  CellGameOverStatus,
  GameStatus,
  GameMode,
} from '@/utils/constants'

type Props = {}

export default function Index(props: Props) {
  const reset = useGameStore((state) => state.reset)
  const status = useGameStore((state) => state.status)
  const level = useGameStore((state) => state.level)
  const initialAmount = SPECIFICATION[level].amount
  const mouseDown = useGameStore((state) => state.mouseDown)
  const startTime = useGameStore((state) => state.startTime)
  const endTime = useGameStore((state) => state.endTime)
  const initialTime = 1
  const [time, settime] = useState(initialTime)
  const timeRef = useRef(initialTime)
  const timeoutIdRef = useRef<any>()
  const smileBtnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === GameStatus.start) {
      setnow()
      updateTime()
    } else {
      clearTimeout(timeoutIdRef.current)
    }
  }, [status])

  function setnow() {
    const now = Math.floor((+new Date() - startTime) / 1000) + initialTime
    settime(now)
    timeRef.current = now
  }

  function updateTime() {
    timeoutIdRef.current = setTimeout(() => {
      if (status === GameStatus.start && timeRef.current < 999) {
        setnow()
        updateTime()
      }
    }, 1000)
  }

  const gameFinish = status === GameStatus.success || status === GameStatus.fail
  return (
    <div className="w-full flex justify-between items-center">
      <div>💣 {String(initialAmount).padStart(2, '0')}</div>
      <div
        className="btn btn-ghost text-4xl"
        onClick={(e) => {
          e.stopPropagation()
          reset()
        }}
      >
        {!gameFinish ? (mouseDown ? '😮' : '🙂') : ''}
        {status === GameStatus.success && '🎉'}
        {status === GameStatus.fail && '😞'}
      </div>

      <div>⏱️ {status === GameStatus.initial ? '000' : String(time).padStart(3, '0')}</div>
    </div>
  )
}
