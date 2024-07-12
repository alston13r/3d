"use strict";
const projectionMatrixPresets = {
    fieldOfView: 45,
    aspect: 4 / 3,
    zNear: 0.1,
    zFar: 100
};
const projectionMatrix = updateProjectionMatrix(mat4.create());
function updateProjectionMatrix(projectionMatrix) {
    return mat4.perspective(projectionMatrix, matrix.toRadian(projectionMatrixPresets.fieldOfView), projectionMatrixPresets.aspect, projectionMatrixPresets.zNear, projectionMatrixPresets.zFar);
}
function drawScene(gl, programInfo, buffers, texture, cubeRotation) {
    gl.clearColor(0, 0, 0, 1); // Clear to black, fully opaque
    gl.clearDepth(1); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
    // Clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();
    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    mat4.translate(modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [0, 0, -6]); // amount to translate
    mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation, [0, 0, 1]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * 0.7, [0, 1, 0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * 0.3, [1, 0, 0]);
    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    setPositionAttribute(gl, buffers, programInfo);
    setTextureAttribute(gl, buffers, programInfo);
    setNormalAttribute(gl, buffers, programInfo);
    // @ts-ignore
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);
    // Set the shader uniforms
    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.normalMatrix, false, normalMatrix);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
    {
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
}
function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 3; // pull out 2 values per iteration
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    // @ts-ignore
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}
function setColorAttribute(gl, buffers, programInfo) {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    // @ts-ignore
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}
function setTextureAttribute(gl, buffers, programInfo) {
    const num = 2; // every coordinate composed of 2 values
    const type = gl.FLOAT; // the data in the buffer is 32-bit float
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set to the next
    const offset = 0; // how many bytes inside the buffer to start from
    // @ts-ignore
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, num, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
}
function setNormalAttribute(gl, buffers, programInfo) {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    // @ts-ignore
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexNormal, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
}
//# sourceMappingURL=drawScene.js.map