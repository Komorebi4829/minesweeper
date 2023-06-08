export enum Level {
  beginner = 'Beginner',
  intermediate = 'Intermediate',
  expert = 'Expert',
}

export const SPECIFICATION = {
  Beginner: {
    row: 8,
    col: 8,
    amount: 10,
  },
  Intermediate: {
    row: 16,
    col: 16,
    amount: 40,
  },
  Expert: {
    row: 16,
    col: 30,
    amount: 99,
  },
}

export enum CellType {
  number = 'number',
  blank = 'blank',
  mine = 'mine',
}

export enum CellStatus {
  initial,
  flagged,
  opened,
}

export enum CellGameOverStatus {
  bullseye, // exploded here
  normal,
}

export enum GameMode {
  normal = 'normal',
  cheat = 'cheat',
}

export enum GameStatus {
  initial,
  start,
  success,
  fail,
}
