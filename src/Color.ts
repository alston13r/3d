class Color {
  static Black = new Color()
  static White = new Color(255, 255, 255)
  static Red = new Color(255)
  static Green = new Color(0, 255)
  static Blue = new Color(0, 0, 255)

  r: number
  g: number
  b: number

  constructor(r: number = 0, g: number = 0, b: number = 0) {
    this.r = r
    this.g = g
    this.b = b
  }

  static FromGrey(x: number = 0): Color {
    return new Color(x, x, x)
  }

  static FromString(str: string): Color {
    if (str.indexOf('#') == 0) str = str.substring(1)

    let r: number
    let g: number
    let b: number

    if (str.length == 3) {
      r = parseInt(str[0] + str[0], 16)
      g = parseInt(str[1] + str[1], 16)
      b = parseInt(str[2] + str[2], 16)
    } else {
      r = parseInt(str.substring(0, 2), 16)
      g = parseInt(str.substring(2, 4), 16)
      b = parseInt(str.substring(4, 6), 16)
    }

    return new Color(r, g, b)
  }

  toString(): string {
    const rByte: string = this.r.toString(16)
    const gByte: string = this.g.toString(16)
    const bByte: string = this.b.toString(16)
    const rString: string = rByte.length == 1 ? '0' + rByte : rByte
    const gString: string = gByte.length == 1 ? '0' + gByte : gByte
    const bString: string = bByte.length == 1 ? '0' + bByte : bByte
    return '#' + rString + gString + bString
  }
}