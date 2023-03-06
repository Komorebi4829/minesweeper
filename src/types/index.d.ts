export interface CellInfo {
  isOpen: boolean
  mineNum: number | string
  boom: boolean
  isFlag: boolean
}

export interface CellProps {
  i: number
  j: number
}

export interface levelDataInterface {
  level: string
  row: number
  column: number
  amount: number
}

export interface mousePayload {
  mouseButton: number
  x: number
  y: number
}

export interface LEVELInterface {
  easy: string
  medium: string
  expert: string
}

interface specification {
  row: number
  column: number
  amount: number
}

export interface specificationInterface {
  [key: string]: specification
  easy: specification
  medium: specification
  expert: specification
}

export interface mouseInterface {
  [index: number]: boolean
  0: boolean
  1: boolean
  2: boolean
}
