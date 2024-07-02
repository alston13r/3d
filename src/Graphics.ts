class Graphics {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = 800
    this.canvas.height = 600
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  appendTo(element: HTMLElement): Graphics {
    element.appendChild(this.canvas)
    return this
  }

  setSize(width: number, height: number): Graphics {
    this.canvas.width = width
    this.canvas.height = height
    return this
  }

  get width(): number {
    return this.canvas.width
  }

  get height(): number {
    return this.canvas.height
  }

  get aspHW(): number {
    return this.height / this.width
  }

  get aspWH(): number {
    return this.width / this.height
  }

  bg(c: string = '#000'): void {
    this.context.fillStyle = c
    this.context.fillRect(0, 0, this.width, this.height)
  }

  clear(): void {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  beginPath(): Graphics {
    this.context.beginPath()
    return this
  }

  moveTo(x: number, y: number): Graphics {
    this.context.moveTo(x, y)
    return this
  }

  lineTo(x: number, y: number): Graphics {
    this.context.lineTo(x, y)
    return this
  }

  closePath(): Graphics {
    this.context.closePath()
    return this
  }

  stroke(c?: string): Graphics {
    if (c) this.context.strokeStyle = c
    this.context.stroke()
    return this
  }

  fill(c?: string): Graphics {
    if (c) this.context.fillStyle = c
    this.context.fill()
    return this
  }

  get fillStyle(): string {
    return this.context.fillStyle as string
  }

  set fillStyle(c: string) {
    this.context.fillStyle = c
  }

  get strokeStyle(): string {
    return this.context.strokeStyle as string
  }

  set strokeStyle(c: string) {
    this.context.strokeStyle = c
  }

  triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
    // triangle inflation, this is to try to reduce the gaps between touching
    // triangles, doesn't really look that great since corners get pointy

    // const xc: number = (x1 + x2 + x3) / 3
    // const yc: number = (y1 + y2 + y3) / 3

    // x1 = xc + (x1 - xc) * 1.02
    // x2 = xc + (x2 - xc) * 1.02
    // x3 = xc + (x3 - xc) * 1.02
    // y1 = yc + (y1 - yc) * 1.02
    // y2 = yc + (y2 - yc) * 1.02
    // y3 = yc + (y3 - yc) * 1.02

    this.beginPath()
      .moveTo(x1, y1)
      .lineTo(x2, y2)
      .lineTo(x3, y3)
      .closePath()
      .fill()
  }

  triangleFromVec3(p1: Vec3, p2: Vec3, p3: Vec3): void {
    this.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
  }

  triangleToScreenSpace(triangle: Triangle): void {
    const width: number = this.width
    const height: number = this.height

    this.triangle(
      (triangle.p1.x + 1) * 0.5 * width,
      (triangle.p1.y + 1) * 0.5 * height,
      (triangle.p2.x + 1) * 0.5 * width,
      (triangle.p2.y + 1) * 0.5 * height,
      (triangle.p3.x + 1) * 0.5 * width,
      (triangle.p3.y + 1) * 0.5 * height
    )
  }

  createProjectionMatrix(fov: number = 90, zFar: number = 1000, zNear: number = 0.1): Matrix {
    const asp: number = this.aspHW
    fov = lerp(fov, 0, 360, 0, 2 * Math.PI)
    const f: number = 1 / Math.tan(fov / 2)
    const q: number = zFar / (zFar - zNear)

    return Matrix.FromArr([
      [asp * f, 0, 0, 0],
      [0, f, 0, 0],
      [0, 0, q, 1],
      [0, 0, -q * zNear, 0]
    ])
  }
}