import React, { lazy, Suspense, useState } from 'react'
import './App.less'
import Header from '@/container/Header'
import Playground from '@/container/Playground'
import Footer from '@/container/Footer'
import './i18n.config'
import useBearStore from '@/store/game'

function App() {
  const setMouseDown = useBearStore((state) => state.setMouseDown)

  const disable = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    return false
  }
  const appOnMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(false)
  }

  return (
    <div
      className="App h-screen relative bg-[#f4f4ec] select-none"
      onContextMenu={disable}
      onMouseUp={appOnMouseUp}
    >
      <div className="">
        <Header></Header>
      </div>
      <div className="mt-4 flex justify-center">
        <Playground></Playground>
      </div>
      {/* <div className="absolute bottom-0 left-0 right-0">
        <Footer></Footer>
      </div> */}
    </div>
  )
}

export default App
