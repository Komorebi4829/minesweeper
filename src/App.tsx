import React, { lazy, Suspense, useState, useEffect } from 'react'
import './App.less'
import Header from '@/container/Header'
import Playground from '@/container/Playground'
import Footer from '@/container/Footer'
import './i18n.config'
import useGameStore from '@/store/game'
// import { themeChange } from 'theme-change'

function App() {
  const setMouseDown = useGameStore((state) => state.setMouseDown)
  const theme = useGameStore((state) => state.theme)

  const disable = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    return false
  }
  const appOnMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(false)
  }

  useEffect(() => {
    // themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  return (
    <div
      className="App h-screen relative select-none"
      onContextMenu={disable}
      onMouseUp={appOnMouseUp}
      data-theme={theme}
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
