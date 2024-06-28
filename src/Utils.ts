function lerp(x: number, a: number, b: number, c: number, d: number): number {
  return (x - a) / (b - a) * (d - c) + c
}

function createRotMatX(theta: number): Matrix {
  const cos: number = Math.cos(theta)
  const sin: number = Math.sin(theta)

  return Matrix.FromArr([
    [1, 0, 0, 0],
    [0, cos, sin, 0],
    [0, -sin, cos, 0],
    [0, 0, 0, 1]
  ])
}

function createRotMatY(theta: number): Matrix {
  const cos: number = Math.cos(theta)
  const sin: number = Math.sin(theta)

  return Matrix.FromArr([
    [cos, 0, sin, 0],
    [0, 1, 0, 0],
    [-sin, 0, cos, 0],
    [0, 0, 0, 1]
  ])
}

function createRotMatZ(theta: number): Matrix {
  const cos: number = Math.cos(theta)
  const sin: number = Math.sin(theta)

  return Matrix.FromArr([
    [cos, sin, 0, 0],
    [-sin, cos, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ])
}

function createTranslationMat(translation: Vec3): Matrix {
  return Matrix.FromArr([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [translation.x, translation.y, translation.z, 1]
  ])
}

type MutationMatrices = {
  identity?: Matrix
  scale?: Matrix
  rotation?: Matrix
  orbital?: Matrix
  translation?: Matrix
}