"use strict";
// function initBuffers(gl: WebGLRenderingContext) {
//   const positionBuffer = initPositionBuffer(gl)
//   const normalBuffer = initNormalBuffer(gl)
//   const indexBuffer = initIndexBuffer(gl)
//   const textureBuffer = initTextureBuffer(gl)
//   return {
//     position: positionBuffer,
//     normal: normalBuffer,
//     textureCoord: textureBuffer,
//     indices: indexBuffer
//   }
// }
// function initColorBuffer(gl: WebGLRenderingContext): WebGLBuffer {
//   const faceColors = [
//     [1, 1, 1, 1],
//     [1, 0, 0, 1],
//     [0, 1, 0, 1],
//     [0, 0, 1, 1],
//     [1, 1, 0, 1],
//     [1, 0, 1, 1]
//   ]
//   var colors: number[] = []
//   for (let j = 0; j < faceColors.length; j++) {
//     const c = faceColors[j]
//     colors = colors.concat(c, c, c, c)
//   }
//   const colorBuffer = gl.createBuffer() as WebGLBuffer
//   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
//   return colorBuffer
// }
// function initPositionBuffer(gl: WebGLRenderingContext) {
//   const positionBuffer = gl.createBuffer() as WebGLBuffer
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
//   const positions = [
//     -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
//     -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1,
//     -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
//     -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1,
//     1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
//     -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1,
//   ]
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
//   return positionBuffer
// }
// function initIndexBuffer(gl: WebGLRenderingContext) {
//   const indexBuffer = gl.createBuffer() as WebGLBuffer
//   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
//   const indices = [
//     0, 1, 2, 0, 2, 3,
//     4, 5, 6, 4, 6, 7,
//     8, 9, 10, 8, 10, 11,
//     12, 13, 14, 12, 14, 15,
//     16, 17, 18, 16, 18, 19,
//     20, 21, 22, 20, 22, 23
//   ]
//   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
//   return indexBuffer
// }
// function initTextureBuffer(gl: WebGLRenderingContext): WebGLBuffer {
//   const textureCoordBuffer = gl.createBuffer() as WebGLBuffer
//   gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer)
//   const textureCoordinates = [
//     0, 0, 1, 0, 1, 1, 0, 1,
//     0, 0, 1, 0, 1, 1, 0, 1,
//     0, 0, 1, 0, 1, 1, 0, 1,
//     0, 0, 1, 0, 1, 1, 0, 1,
//     0, 0, 1, 0, 1, 1, 0, 1,
//     0, 0, 1, 0, 1, 1, 0, 1
//   ]
//   gl.bufferData(
//     gl.ARRAY_BUFFER,
//     new Float32Array(textureCoordinates),
//     gl.STATIC_DRAW
//   )
//   return textureCoordBuffer
// }
// function initNormalBuffer(gl: WebGLRenderingContext): WebGLBuffer {
//   const normalBuffer = gl.createBuffer() as WebGLBuffer
//   gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
//   const vertexNormals = [
//     0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
//     0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
//     0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
//     0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
//     1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
//     -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0
//   ]
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW)
//   return normalBuffer
// }
//# sourceMappingURL=initBuffers.js.map