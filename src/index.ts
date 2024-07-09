const scene: Scene = new Scene()

const camera: Camera = scene.camera

const cube: Cube = new Cube()
  .translate(new Vec3(2, 0, 3))
  .centerPoints()

const uvsphere: UVSphere = new UVSphere(0.5, 10, 10)
  .translate(new Vec3(-2, 0, 3))

const icosphere: Icosphere = new Icosphere(0.5, 2)
  .translate(new Vec3(0, 2, 3))

const objects: MutableObject[] = [cube, uvsphere, icosphere]

const keys: Record<string, boolean> = {}

window.addEventListener('keydown', e => keys[e.key] = true)
window.addEventListener('keyup', e => keys[e.key] = false)

const lightDir: Vec3 = new Vec3(-0.1, -0.1, 1).normal().scale(-1)

const keybinds: Record<string, string> = {
  'Forward': 'w',
  'Backward': 's',
  'Left': 'a',
  'Right': 'd',
  'Up': 'e',
  'Down': 'q',
  'Yaw left': 'ArrowLeft',
  'Yaw right': 'ArrowRight',
  'Pitch up': 'ArrowDown',
  'Pitch down': 'ArrowUp'
}

function projectShape(shape: MutableShape, viewMatrix: Matrix, raster: { triangle: Triangle, color: string }[]): void {
  const worldMatrix: Matrix = shape.getWorldMatrix()

  for (const tri of shape.mesh.triangles) {
    const triangle = new Triangle(tri.getP1(), tri.getP2(), tri.getP3())

    const transformedTriangle: Triangle = triangle.applyMatrix(worldMatrix)

    const cameraRay: Vec3 = transformedTriangle.p1.sub(camera.position)

    if (cameraRay.dot(camera.getFront()) < 0) continue // triangle is behind camera

    const normal: Vec3 = transformedTriangle.getNormal()

    if (normal.dot(cameraRay) < 0) { // triangle face is visible
      const dp: number = lightDir.dot(normal)
      const color: string = Color.FromGrey(clamp(Math.round(dp * 255), 30, 250)).toString()

      // view
      const viewedTriangle: Triangle = transformedTriangle.applyMatrix(viewMatrix)

      // clip against near and far planes
      const triangles: Triangle[] = scene.clipTriangleAgainstNearFarPlanes(viewedTriangle)

      for (const clipped of triangles) {
        // project
        const projected: Triangle = clipped.project(scene.projectionMatrix)

        // scale
        const scaled: Triangle = scene.graphics.triangleToScreenSpace(projected)

        raster.push({ triangle: scaled, color })
      }
    }
  }
}

function loadInputs(): void {
  const FB: number = (keys[keybinds['Forward']] ? 1 : 0) - (keys[keybinds['Backward']] ? 1 : 0)
  const LR: number = (keys[keybinds['Right']] ? 1 : 0) - (keys[keybinds['Left']] ? 1 : 0)
  const UD: number = (keys[keybinds['Up']] ? 1 : 0) - (keys[keybinds['Down']] ? 1 : 0)
  const Y: number = (keys[keybinds['Yaw left']] ? 1 : 0) - (keys[keybinds['Yaw right']] ? 1 : 0)
  const P: number = (keys[keybinds['Pitch up']] ? 1 : 0) - (keys[keybinds['Pitch down']] ? 1 : 0)

  const right: Vec3 = camera.getRight()
  const up: Vec3 = camera.getUp()
  const front: Vec3 = camera.getFront()

  camera.translate(front.normal().scale(FB * 0.02))
  camera.translate(right.normal().scale(LR * 0.02))
  camera.translate(up.normal().scale(UD * 0.02))

  camera.rotate(up, Y * 0.01)
  camera.rotate(camera.getRight(), P * 0.01)
}

function getLightColor(dp: number): string {
  const x: number = clamp(Math.round(dp * 255), 30, 250)
  return new Color(x, x, x).toString()
}

let lastTimestamp: number = 0
function drawLoop(timestamp: number = 0): void {
  const deltaTime: number = timestamp - lastTimestamp
  lastTimestamp = timestamp

  loadInputs()

  scene.graphics.bg()

  cube.rotate(new Vec3(1, 0, 0), 0.008)

  const viewMatrix: Matrix = camera.createViewMatrix()

  const raster: { triangle: Triangle, color: string }[] = []

  projectShape(cube, viewMatrix, raster)
  projectShape(uvsphere, viewMatrix, raster)
  projectShape(icosphere, viewMatrix, raster)

  raster.sort((a, b) => b.triangle.p1.z - a.triangle.p1.z)

  for (const obj of raster) {
    const toClip: Triangle = obj.triangle
    scene.graphics.fillStyle = obj.color
    scene.graphics.strokeStyle = obj.color

    const triangles: Triangle[] = scene.clipTriangleAgainstBorderPlanes(toClip)

    for (const clipped of triangles) {
      scene.graphics.triangleFromInstance(clipped)
    }
  }

  window.requestAnimationFrame(drawLoop)
}

window.requestAnimationFrame(drawLoop)