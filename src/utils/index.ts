import p5Types from "p5";

export const scale = (origin:number, a:number, b:number):number => {
  return origin * b / a;
}

export const createHeartPos = (i: number): {x: number, y: number } => {
  const x = 2 * Math.pow(Math.sin(i), 3);
  const y = - 2 * ((13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i)) / 16)
  return {
    x, y
  }
}
