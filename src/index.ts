const cube: Cube = new Cube()
  .translate(new Vec3(0, 0, 3))
  .rotate(0, 0.2, 0.5)

const graphics: Graphics = new Graphics().appendTo(document.body)

const projectionMatrix: Matrix = graphics.createProjectionMatrix(90, 1000, 0.1)

let theta: number = 0

const cameraPos: Vec3 = new Vec3()
const lightDir: Vec3 = new Vec3(0, 0, -1)

let lastTimestamp: number = 0
function drawLoop(timestamp: number = 0): void {
  const deltaTime: number = timestamp - lastTimestamp
  lastTimestamp = timestamp







  cube.rotate(deltaTime / 1000, 0, 0)



  graphics.bg()

  const mutatedMesh: Mesh = cube.applyMatrices()

  const mutatedTriangles: MeshTriangle[] = mutatedMesh.triangles
  const filtered: MeshTriangle[] = mutatedTriangles.filter(triangle => {
    return triangle.getNormal().dot(triangle.getP1().sub(cameraPos)) < 0
  })

  for (const triangle of filtered) {
    const normal: Vec3 = triangle.getNormal()
    const dp: number = lightDir.dot(normal)

    const s: string = Math.round(lerp(dp, 0, 1, 10, 250)).toString(16)
    graphics.fillStyle = '#' + s + s + s

    const projectedTriangle: Triangle = triangle.project(projectionMatrix)

    graphics.triangleToScreenSpace(projectedTriangle)
  }






  window.requestAnimationFrame(drawLoop)
}

window.requestAnimationFrame(drawLoop)