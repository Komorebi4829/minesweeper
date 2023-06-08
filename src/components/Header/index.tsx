import React from 'react'
import Toolbar from '@/components/Toolbar'

type Props = {}

export default function Header(props: Props) {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="">
        <Toolbar />
      </div>
    </div>
  )
}
