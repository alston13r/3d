let cubeRotation = 0
let deltaTime = 0

main()

function main() {
  const canvas = graphics.createCanvas()
  graphics.setSize(canvas, 800, 600)
  document.body.appendChild(canvas)

  const gl = graphics.getWebGL(canvas)
  const shaderProgram = shaderManager.initShaderProgram(gl, shaderManager.sources.vsSource, shaderManager.sources.fsSource)
  const programInfo = shaderManager.createProgramInfo(gl, shaderProgram)
  const buffers = bufferManager.initBuffers(gl)

  let then = 0
  function render(now: number) {
    now *= 0.001
    deltaTime = now - then
    then = now

    cube.rotate(deltaTime, [0, 0, 1])
    cube.rotate(deltaTime * 0.7, [0, 1, 0])
    cube.rotate(deltaTime * 0.3, [1, 0, 0])

    drawScene(gl, programInfo, buffers);
    cubeRotation += deltaTime

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

function createButton(text: string, fn: Function): HTMLButtonElement {
  const button = document.createElement('button')
  button.innerText = text
  button.onclick = () => void fn()
  return button
}

const b1 = createButton('x+', () => cube.translate([1, 0, 0]))
const b2 = createButton('x-', () => cube.translate([-1, 0, 0]))
const b3 = createButton('y+', () => cube.translate([0, 1, 0]))
const b4 = createButton('y-', () => cube.translate([0, -1, 0]))
const b5 = createButton('z+', () => cube.translate([0, 0, 1]))
const b6 = createButton('z-', () => cube.translate([0, 0, -1]))

const buttonContainer = document.createElement('div')
buttonContainer.append(b1, b2, b3, b4, b5, b6)
document.body.appendChild(buttonContainer)

const cube = new Cube([0, 0, -6])

function drawScene(
  gl: WebGLRenderingContext,
  programInfo: ProgramInfo,
  buffers: Record<string, WebGLBuffer>
) {
  gl.clearColor(0, 0, 0, 1)
  gl.clearDepth(1)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  const fieldOfView = matrix.toRadian(45)
  const aspect = gl.canvas.width / gl.canvas.height
  const zNear = 0.1
  const zFar = 100
  const projectionMatrix = mat4.create()

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  const modelViewMatrix = cube.getModelView()

  const normalMatrix = mat4.create()
  mat4.invert(normalMatrix, modelViewMatrix)
  mat4.transpose(normalMatrix, normalMatrix)

  attributeManager.setPositionAttribute(gl, buffers, programInfo)
  attributeManager.setNormalAttribute(gl, buffers, programInfo)
  attributeManager.setColorAttribute(gl, buffers, programInfo)

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)

  shaderManager.useProgram(gl, programInfo.program)

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix,
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix,
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.normalMatrix,
    false,
    normalMatrix
  )

  {
    const offset = 0
    const type = gl.UNSIGNED_SHORT
    const vertexCount = Cube.VertexCount
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset)
  }
}