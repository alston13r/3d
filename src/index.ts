const cube: Cube = new Cube()
  .translate(new Vec3(-2, 0, 2))
  .rotate(0, 0.2, 0.5)

const graphics: Graphics = new Graphics().appendTo(document.body)

const projectionMatrix: Matrix = graphics.createProjectionMatrix(90, 1000, 0.1)

let theta: number = 0

let lastTimestamp: number = 0
function drawLoop(timestamp: number = 0): void {
  const deltaTime: number = timestamp - lastTimestamp
  lastTimestamp = timestamp



  cube.rotate(deltaTime / 1000, 0, 0)



  graphics.bg()
  graphics.strokeStyle = '#fff'

  const triangles: Triangle[] = cube.applyMatrices(projectionMatrix)
  const filtered: Triangle[] = triangles.filter(triangle => {
    return triangle.getNormal().z < 0
  })

  for (const triangle of filtered) {
    graphics.triangleToScreenSpace(triangle)
  }



  window.requestAnimationFrame(drawLoop)
}

window.requestAnimationFrame(drawLoop)