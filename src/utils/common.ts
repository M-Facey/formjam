export function trunc(str: string, length: number = 5, fill: string = "..") {
  return str.slice(0, length) + fill;
}
