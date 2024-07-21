const bufferManager = {
  initBuffers(gl: WebGLRenderingContext): Record<string, WebGLBuffer> {
    const positionBuffer = this.initPositionBuffer(gl)
    const normalBuffer = this.initNormalBuffer(gl)
    const colorBuffer = this.initColorBuffer(gl)
    const indexBuffer = this.initIndexBuffer(gl)

    return {
      position: positionBuffer,
      normal: normalBuffer,
      color: colorBuffer,
      indices: indexBuffer
    }
  },

  initPositionBuffer(gl: WebGLRenderingContext): WebGLBuffer {
    const positions = Cube.Positions

    const positionBuffer = gl.createBuffer() as WebGLBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    return positionBuffer
  },

  initColorBuffer(gl: WebGLRenderingContext): WebGLBuffer {
    const faceColors = [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [0, 1, 0, 1],
      [0, 0, 1, 1],
      [1, 1, 0, 1],
      [1, 0, 1, 1]
    ]

    var colors: number[] = []

    for (let j = 0; j < faceColors.length; j++) {
      const c = faceColors[j]
      colors = colors.concat(c, c, c, c)
    }

    const colorBuffer = gl.createBuffer() as WebGLBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

    return colorBuffer
  },

  initIndexBuffer(gl: WebGLRenderingContext): WebGLBuffer {
    const indices = Cube.Indices

    const indexBuffer = gl.createBuffer() as WebGLBuffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

    return indexBuffer
  },

  initNormalBuffer(gl: WebGLRenderingContext): WebGLBuffer {
    const normals = shape.generateNormals(Cube.Positions, Cube.Indices)

    const normalBuffer = gl.createBuffer() as WebGLBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW)

    return normalBuffer
  }
}