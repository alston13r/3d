"use strict";
const cube = new Cube()
    .translate(new Vec3(-2, 0, 2))
    .rotate(0, 0.2, 0.5);
const graphics = new Graphics().appendTo(document.body);
const projectionMatrix = graphics.createProjectionMatrix(90, 1000, 0.1);
let theta = 0;
let lastTimestamp = 0;
function drawLoop(timestamp = 0) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    cube.rotate(deltaTime / 1000, 0, 0);
    graphics.bg();
    graphics.strokeStyle = '#fff';
    const triangles = cube.applyMatrices(projectionMatrix);
    const filtered = triangles.filter(triangle => {
        return triangle.getNormal().z < 0;
    });
    for (const triangle of filtered) {
        graphics.triangleToScreenSpace(triangle);
    }
    window.requestAnimationFrame(drawLoop);
}
window.requestAnimationFrame(drawLoop);
//# sourceMappingURL=index.js.map