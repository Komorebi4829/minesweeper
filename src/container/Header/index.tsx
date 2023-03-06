import React from 'react'
import Toolbar from '@/container/Toolbar'

type Props = {}

export default function Header(props: Props) {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-[750px] bg-[#015796] h-[52px] leading-[52px] rounded-[10px] text-white text-center text-3xl my-4">
        Minesweeper
      </div>
      <div className="">
        <Toolbar />
      </div>
    </div>
  )
}
