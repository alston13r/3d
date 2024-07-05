const cube: Cube = new Cube()
  .translate(new Vec3(2, 0, 3))
  .centerPoints()
// .rotate(0, 0.2, 0.5)

const graphics: Graphics = new Graphics().appendTo(document.body)

const projectionMatrix: Matrix = graphics.createProjectionMatrix(90, 1000, 0.1)

let theta: number = 0

const cameraPos: Vec3 = new Vec3()
const cameraDir: Vec3 = new Vec3(0, 0, 1)
const cameraUp: Vec3 = new Vec3(0, 1, 0)

const lightDir: Vec3 = new Vec3(-0.2, 0, -1).normal()

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowLeft':
      const left: Vec3 = cameraDir.cross(cameraUp)
      Vec3.Add(cameraPos, left)
      break
    case 'ArrowRight':
      const right: Vec3 = cameraUp.cross(cameraDir)
      Vec3.Add(cameraPos, right)
      break
    case 'ArrowUp':
      Vec3.Add(cameraPos, new Vec3(0, 1, 0))
      break
    case 'ArrowDown':
      Vec3.Add(cameraPos, new Vec3(0, -1, 0))
      break
    case 'e':
      Vec3.Add(cameraPos, cameraDir)
      break
    case 'q':
      Vec3.Sub(cameraPos, cameraDir)
      break
    case 'd':
      Vec3.RotateAround(cameraDir, cameraUp, -0.2)
      break
    case 'a':
      Vec3.RotateAround(cameraDir, cameraUp, 0.2)
      break
  }
})

graphics.context.font = 'arial 10px'
graphics.context.textAlign = 'left'
graphics.context.textBaseline = 'top'

function text(t: string, x: number, y: number): void {
  graphics.fillStyle = '#fff'
  graphics.context.fillText(t, x, y)
}

let lastTimestamp: number = 0
function drawLoop(timestamp: number = 0): void {
  const deltaTime: number = timestamp - lastTimestamp
  lastTimestamp = timestamp





  cube.rotate(new Vec3(1, 0, 0), deltaTime / 1000)

  const lookAt: Matrix = createLookAtMatrix(cameraPos, cameraPos.add(cameraDir), cameraUp)

  // cube.rotate(deltaTime / 1000, 0, 0)



  graphics.bg()

  // graphics.context.putImageData(imageData, 0, 0)

  const mutatedMesh: Mesh = cube.applyMatrices({ camera: invertLookAtMatrix(lookAt) })

  const mutatedTriangles: MeshTriangle[] = mutatedMesh.triangles
  const filtered: MeshTriangle[] = mutatedTriangles.filter(triangle => {
    return triangle.getNormal().dot(triangle.getP1().add(cube.position).sub(cameraPos)) < 0
  })
  // const filtered: MeshTriangle[] = mutatedTriangles

  let i = 5

  for (const triangle of filtered) {
    const normal: Vec3 = triangle.getNormal()
    const dp: number = lightDir.dot(normal);

    text('[' + [...normal].join(', ') + ']', 5, i)
    i += 10

    // console.log(normal)

    const s: string = Math.max(0, Math.min(255, Math.round(dp * 255))).toString(16)
    const sMod: string = s.length == 1 ? '0' + s : s
    graphics.fillStyle = '#' + sMod + sMod + sMod

    // let ensure = (s: string) => (s.length == 1 ? '0' + s : s)

    // graphics.fillStyle = '#' +
    //   ensure(Math.round(lerp(normal.x, -1, 1, 0, 255)).toString(16)) +
    //   ensure(Math.round(lerp(normal.y, -1, 1, 0, 255)).toString(16)) +
    //   ensure(Math.round(lerp(normal.z, -1, 1, 0, 255)).toString(16))

    // console.log(graphics.fillStyle)

    const projectedTriangle: Triangle = triangle.project(projectionMatrix)

    graphics.triangleToScreenSpace(projectedTriangle)
  }

  window.requestAnimationFrame(drawLoop)
}

window.requestAnimationFrame(drawLoop)