const cube: Cube = new Cube()
  .translate(new Vec3(0, 0, 3))
  .rotate(0, 0.2, 0.5)

const graphics: Graphics = new Graphics().appendTo(document.body)

const projectionMatrix: Matrix = graphics.createProjectionMatrix(90, 1000, 0.1)

let theta: number = 0

function projectTriangle(triangle: Triangle, matrix: Matrix): Triangle {
  const p1Mat: Matrix = Matrix.FromArr([...triangle.p1, 1])
  const p2Mat: Matrix = Matrix.FromArr([...triangle.p2, 1])
  const p3Mat: Matrix = Matrix.FromArr([...triangle.p3, 1])

  const projectedP1Mat: Matrix = p1Mat.dot(matrix)
  const projectedP2Mat: Matrix = p2Mat.dot(matrix)
  const projectedP3Mat: Matrix = p3Mat.dot(matrix)

  const projectedP1Arr: number[] = projectedP1Mat.toArray()
  const projectedP2Arr: number[] = projectedP2Mat.toArray()
  const projectedP3Arr: number[] = projectedP3Mat.toArray()

  const projectedP1: Vec3 = new Vec3(...projectedP1Arr)
  const projectedP2: Vec3 = new Vec3(...projectedP2Arr)
  const projectedP3: Vec3 = new Vec3(...projectedP3Arr)

  const p1W: number = projectedP1Arr[3]
  const p2W: number = projectedP2Arr[3]
  const p3W: number = projectedP3Arr[3]

  if (p1W != 0) Vec3.Scale(projectedP1, 1 / p1W)
  if (p2W != 0) Vec3.Scale(projectedP2, 1 / p2W)
  if (p3W != 0) Vec3.Scale(projectedP3, 1 / p3W)

  return new Triangle(projectedP1, projectedP2, projectedP3)
}

const cameraPos: Vec3 = new Vec3()

let lastTimestamp: number = 0
function drawLoop(timestamp: number = 0): void {
  const deltaTime: number = timestamp - lastTimestamp
  lastTimestamp = timestamp



  cube.rotate(deltaTime / 1000, 0, 0)



  graphics.bg()
  graphics.strokeStyle = '#fff'

  const mutatedTriangles: Triangle[] = cube.applyMatrices()
  const filtered: Triangle[] = mutatedTriangles.filter(triangle => {
    return triangle.getNormal().dot(triangle.p1.sub(cameraPos)) < 0
  })

  for (const triangle of filtered) {
    const projectedTriangle: Triangle = projectTriangle(triangle, projectionMatrix)

    graphics.triangleToScreenSpace(projectedTriangle)
  }

  // const outputVecArr: number[] = mutated.toArray()
  // const outputVec: Vec3 = new Vec3(...outputVecArr)

  // const w: number = outputVecArr[3]

  // if (w != 0) {
  //   outputVec.x /= w
  //   outputVec.y /= w
  //   outputVec.z /= w
  // }

  // return outputVec


  window.requestAnimationFrame(drawLoop)
}

window.requestAnimationFrame(drawLoop)