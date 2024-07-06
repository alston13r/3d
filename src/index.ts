const nearPlane: number = 0.1
const farPlane: number = 1000

const cube: Cube = new Cube()
  .translate(new Vec3(2, 0, 3))
  .centerPoints()

const graphics: Graphics = new Graphics().appendTo(document.body)

const projectionMatrix: Matrix = graphics.createProjectionMatrix(90, farPlane, nearPlane)

const keys: Record<string, boolean> = {}

window.addEventListener('keydown', e => keys[e.key] = true)
window.addEventListener('keyup', e => keys[e.key] = false)

let theta: number = 0

const cameraPos: Vec3 = new Vec3()
const cameraDir: Vec3 = new Vec3(0, 0, 1)
const cameraUp: Vec3 = new Vec3(0, 1, 0)

const lightDir: Vec3 = new Vec3(0.2, 0, -1).normal()

const keybinds: Record<string, string> = {
  'Forward': 'w',
  'Backward': 's',
  'Left': 'a',
  'Right': 'd',
  'Up': 'e',
  'Down': 'q',
  'Yaw left': 'ArrowLeft',
  'Yaw right': 'ArrowRight'
}

function loadInputs(): void {
  const FB: number = (keys[keybinds['Forward']] ? 1 : 0) - (keys[keybinds['Backward']] ? 1 : 0)
  const LR: number = (keys[keybinds['Right']] ? 1 : 0) - (keys[keybinds['Left']] ? 1 : 0)
  const UD: number = (keys[keybinds['Up']] ? 1 : 0) - (keys[keybinds['Down']] ? 1 : 0)
  const Y: number = (keys[keybinds['Yaw left']] ? 1 : 0) - (keys[keybinds['Yaw right']] ? 1 : 0)

  Vec3.Add(cameraPos, cameraDir.normal().scale(FB * 0.02))
  Vec3.Add(cameraPos, cameraUp.cross(cameraDir).normal().scale(LR * 0.02))
  Vec3.Add(cameraPos, cameraUp.normal().scale(UD * 0.02))
  Vec3.RotateAround(cameraDir, cameraUp, Y * 0.01)
}

function logTriangle(tri: Triangle, t?: string): void {
  if (t) console.log(t)
  console.log('p1: [' + [...tri.p1].join(', ') + ']')
  console.log('p2: [' + [...tri.p2].join(', ') + ']')
  console.log('p3: [' + [...tri.p3].join(', ') + ']')
}

graphics.context.font = 'arial 10px'
graphics.context.textAlign = 'left'
graphics.context.textBaseline = 'top'

function text(t: string, x: number, y: number): void {
  graphics.fillStyle = '#fff'
  graphics.context.fillText(t, x, y)
}

function getLightColor(dp: number): string {
  const s: string = clamp(Math.round(dp * 255), 30, 250).toString(16)
  const sMod: string = s.length == 1 ? '0' + s : s
  return '#' + sMod + sMod + sMod
}

function clipVecAgainstPlane(planePoint: Vec3, planeNormal: Vec3, lineStart: Vec3, lineEnd: Vec3): Vec3 {
  Vec3.Normal(planeNormal)
  const planeD: number = -planeNormal.dot(planePoint)
  const ad: number = lineStart.dot(planeNormal)
  const bd: number = lineEnd.dot(planeNormal)
  const t: number = (-planeD - ad) / (bd - ad)
  const lineStartToEnd: Vec3 = lineEnd.sub(lineStart)
  const lineToIntersect: Vec3 = lineStartToEnd.scale(t)
  return lineStart.add(lineToIntersect)
}

function clipTriangleAgainstPlane(planePoint: Vec3, planeNormal: Vec3, triangle: Triangle): Triangle[] {
  Vec3.Normal(planeNormal)

  const dist = (p: Vec3) => planeNormal.dot(p) - planeNormal.dot(planePoint)

  const insidePoints: Vec3[] = []
  const outsidePoints: Vec3[] = []

  const d0: number = dist(triangle.p1)
  const d1: number = dist(triangle.p2)
  const d2: number = dist(triangle.p3)

  if (d0 >= 0) insidePoints[insidePoints.length] = triangle.p1
  else outsidePoints[outsidePoints.length] = triangle.p1
  if (d1 >= 0) insidePoints[insidePoints.length] = triangle.p2
  else outsidePoints[outsidePoints.length] = triangle.p2
  if (d2 >= 0) insidePoints[insidePoints.length] = triangle.p3
  else outsidePoints[outsidePoints.length] = triangle.p3

  if (insidePoints.length == 0) return []

  else if (insidePoints.length == 3) return [triangle]

  else if (insidePoints.length == 1) {
    const p1: Vec3 = insidePoints[0]
    const p2: Vec3 = clipVecAgainstPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[0])
    const p3: Vec3 = clipVecAgainstPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[1])
    return [new Triangle(p1, p2, p3)]
  }

  else {
    const p1: Vec3 = insidePoints[0]
    const p2: Vec3 = insidePoints[1]
    const p3: Vec3 = clipVecAgainstPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[0])
    const p4: Vec3 = clipVecAgainstPlane(planePoint, planeNormal, insidePoints[1], outsidePoints[0])
    return [new Triangle(p1, p2, p3), new Triangle(p2, p3, p4)]
  }
}

let lastTimestamp: number = 0
function drawLoop(timestamp: number = 0): void {
  const deltaTime: number = timestamp - lastTimestamp
  lastTimestamp = timestamp

  theta += deltaTime / 1000
  theta %= 2 * Math.PI

  loadInputs()

  graphics.bg()





  const rotationMatrix: Matrix = createRotMatQuaternion(new Vec3(1, 0, 0), theta)
  // const rotationMatrix: Matrix = Matrix.MakeIdentity()

  const translationMatrix: Matrix = createTranslationMat(new Vec3(0, 0, 3))

  const worldMatrix: Matrix = Matrix.MakeIdentity()
    .dot(rotationMatrix)
    .dot(translationMatrix)

  const viewMatrix: Matrix = invertLookAtMatrix(createLookAtMatrix(cameraPos, cameraPos.add(cameraDir), cameraUp))






  graphics.strokeStyle = '#fff'

  const raster: { triangle: Triangle, color: string }[] = []

  for (const tri of cube.mesh.triangles) {
    const triangle = new Triangle(tri.getP1(), tri.getP2(), tri.getP3())

    const transformedTriangle: Triangle = triangle.applyMatrix(worldMatrix)

    const normal: Vec3 = transformedTriangle.getNormal()

    const cameraRay: Vec3 = transformedTriangle.p1.sub(cameraPos)

    if (normal.dot(cameraRay) < 0) { // triangle is visible
      const dp: number = lightDir.dot(normal)
      const color: string = getLightColor(dp)

      // view
      const viewedTriangle: Triangle = transformedTriangle.applyMatrix(viewMatrix)

      // clip against near and far planes
      const clippedTriangles: Triangle[] = []
      clippedTriangles.push(...clipTriangleAgainstPlane(
        new Vec3(0, 0, nearPlane),
        new Vec3(0, 0, 1),
        viewedTriangle
      ))
      const clippedN: number = clippedTriangles.length
      for (let i = 0; i < clippedN; i++) {
        const clipped: Triangle = clippedTriangles.shift() as Triangle
        clippedTriangles.push(...clipTriangleAgainstPlane(
          new Vec3(0, 0, farPlane),
          new Vec3(0, 0, -1),
          clipped
        ))
      }


      for (const clipped of clippedTriangles) {
        // project
        const projected: Triangle = clipped.project(projectionMatrix)

        // scale
        const scaled: Triangle = graphics.triangleToScreenSpace(projected)

        raster.push({ triangle: scaled, color })
      }
    }
  }

  raster.sort((a, b) => b.triangle.p1.z - a.triangle.p1.z)

  for (const obj of raster) {
    const toClip: Triangle = obj.triangle
    graphics.fillStyle = obj.color
    graphics.strokeStyle = obj.color

    const arr: Triangle[] = [toClip]

    for (let i = 0; i < 4; i++) {
      const toClipN: number = arr.length

      for (let j = 0; j < toClipN; j++) {
        const clipping: Triangle = arr.shift() as Triangle

        switch (i) {
          case 0:
            arr.push(...clipTriangleAgainstPlane(new Vec3(0, 0, 0), new Vec3(1, 0, 0), clipping))
            break
          case 1:
            arr.push(...clipTriangleAgainstPlane(new Vec3(0, 0, 0), new Vec3(0, 1, 0), clipping))
            break
          case 2:
            arr.push(...clipTriangleAgainstPlane(new Vec3(graphics.width, 0, 0), new Vec3(-1, 0, 0), clipping))
            break
          case 3:
            arr.push(...clipTriangleAgainstPlane(new Vec3(0, graphics.height, 0), new Vec3(0, -1, 0), clipping))
            break
        }
      }
    }

    for (const clipped of arr) {
      graphics.triangleFromInstance(clipped)
    }
  }

  window.requestAnimationFrame(drawLoop)
}

window.requestAnimationFrame(drawLoop)