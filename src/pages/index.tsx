import React, { useEffect } from 'react'
import Head from 'next/head'

import Header from '@/components/Header'
import Playground from '@/components/Playground'
import Footer from '@/components/Footer'
import NoSSR from '@/components/NoSSR'
import '@/i18n.config'
import useGameStore from '@/store/game'

export default function Home() {
  const setMouseDown = useGameStore((state) => state.setMouseDown)
  const theme = useGameStore((state) => state.theme)

  const disable = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    return false
  }
  const appOnMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(false)
  }

  return (
    <>
      <Head>
        <title>Minesweeper - Next.js</title>
        <meta name="description" content="A classical game on Windows" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="App" data-theme={theme}>
        <div
          className="h-screen relative select-none "
          onContextMenu={disable}
          onMouseUp={appOnMouseUp}
        >
          <div className="p-16 h-screen">
            <div className="">
              <Header></Header>
            </div>
            <div className="mt-4 flex justify-center">
              <NoSSR>
                <Playground></Playground>
              </NoSSR>
            </div>
          </div>
          <div className="bg-[#323639] w-full p-8 h-[260px]">
            <Footer></Footer>
          </div>
        </div>
      </main>
    </>
  )
}
