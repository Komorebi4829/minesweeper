import React, { useEffect } from 'react'
import useGameStore from '@/store/game'
import { Level } from '@/utils/constants'
import cls from 'classnames'
import { useTranslation } from 'react-i18next'
import i18next from '@/i18n.config'

type Props = {}

export default function Toolbar(props: Props) {
  const { t, i18n } = useTranslation()
  const toggleMode = useGameStore((state) => state.toggleMode)
  const level = useGameStore((state) => state.level)
  const reset = useGameStore((state) => state.reset)
  const cells = useGameStore((state) => state.cells)
  const debugPos = useGameStore((state) => state.debugPos)
  const lang = useGameStore((state) => state.lang)
  const setLang = useGameStore((state) => state.setLang)
  const toggleTheme = useGameStore((state) => state.toggleTheme)

  const game = useGameStore((state) => ({
    debugPos: state.debugPos,
    mode: state.mode,
    level: state.level,
    boomPos: state.boomPos,
    status: state.status,
    mouseDown: state.mouseDown,
    lang: state.lang,
    startTime: state.startTime,
    endTime: state.endTime,
    theme: state.theme,
  }))

  const levelI18n = {
    Beginner: i18next.t('app.beginner'),
    Intermediate: i18next.t('app.intermediate'),
    Expert: i18next.t('app.expert'),
  }

  return (
    <div className="flex items-center">
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn btn-ghost gap-1 normal-case m-1 min-w-[149px]">
          <span>{levelI18n[level]}</span>
          <svg
            width="12px"
            height="12px"
            className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </label>
        <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
          <ul tabIndex={0} className="">
            <li>
              <button
                className={cls(level === Level.beginner && 'active')}
                onClick={() => reset(Level.beginner)}
              >
                {t('app.beginner')}
              </button>
            </li>
            <li>
              <button
                className={cls(level === Level.intermediate && 'active')}
                onClick={() => reset(Level.intermediate)}
              >
                {t('app.intermediate')}
              </button>
            </li>
            <li>
              <button
                className={cls(level === Level.expert && 'active')}
                onClick={() => reset(Level.expert)}
              >
                {t('app.expert')}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div title="Change Language" className="dropdown dropdown-hover">
        <div tabIndex={0} className="btn btn-ghost gap-1 normal-case">
          <svg
            className="inline-block h-4 w-4 fill-current md:h-5 md:w-5"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
          >
            <path d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"></path>
            <path d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z"></path>
          </svg>
          <svg
            width="12px"
            height="12px"
            className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <div className="dropdown-content bg-base-100 menu gap-1 text-base-content rounded-t-box rounded-b-box top-px mt-12 w-40 p-2 overflow-y-auto shadow-2xl">
          <ul className="" tabIndex={0}>
            <li>
              <button
                className={cls('flex', lang === 'en_US' && 'active')}
                onClick={() => {
                  const lang = 'en_US'
                  i18n.changeLanguage(lang)
                  setLang(lang)
                }}
              >
                <img
                  loading="lazy"
                  width="20"
                  height="20"
                  alt="English"
                  src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg"
                />
                <span className="flex flex-1 justify-between">English</span>
              </button>
            </li>
            <li>
              <button
                className={cls('flex', lang === 'zh_CN' && 'active')}
                onClick={() => {
                  const lang = 'zh_CN'
                  i18n.changeLanguage(lang)
                  setLang(lang)
                }}
              >
                <img
                  loading="lazy"
                  width="20"
                  height="20"
                  alt="中文"
                  src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1e8-1f1f3.svg"
                />
                <span className="flex flex-1 justify-between">中文 </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="btn btn-ghost">
        <label className="swap swap-flip">
          <input type="checkbox" onChange={toggleMode} />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="swap-on w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="swap-off w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </label>
      </div>

      <div className="btn btn-ghost">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onClick={(e: React.MouseEvent<HTMLDivElement>) => toggleTheme()} />

          {/* sun icon */}
          <svg
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-settheme={'light'}
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-settheme={'dark'}
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div
          className="btn btn-ghost"
          onClick={() =>
            console.log(
              `debug: x=${debugPos[0]} y=${debugPos[1]}`,
              cells[debugPos[1]][debugPos[0]],
              game,
            )
          }
        >
          log
        </div>
      )}
    </div>
  )
}
