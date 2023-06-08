export function random(): number {
  return Math.random()
}

/**
 *
 * @param a
 * @param b
 * @returns
 */
export function intersect(a: number[], b: number[]): number[] {
  const set1 = new Set(a)
  const set2 = new Set(b)
  // @ts-ignore
  return [...new Set([...set1].filter((x) => set2.has(x)))]
}

export function getAround(x: number, y: number, row: number, column: number): number[][] {
  // prettier-ignore
  let l = [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y],                 [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
  ]
  l = l.filter((i) => {
    let x = i[0]
    let y = i[1]
    return x >= 0 && x <= column - 1 && y >= 0 && y <= row - 1
  })
  // log('getAround', x, y, l)
  return l
}
