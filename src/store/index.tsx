import { create } from 'zustand'
import Game from '@/utils/Game'

export interface GameState {
  game: Game
  setGame: (game: Game) => void
}

const useGameStore = create<GameState>((set) => ({
  game: new Game(),
  setGame: (game: Game) =>
    set((state) => {
      console.log('in segame')
      return { game: game }
    }),
}))
export default useGameStore
