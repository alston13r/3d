"use strict";
const cube = new Cube()
    .translate(new Vec3(0, 0, 3));
const graphics = new Graphics().appendTo(document.body);
const projectionMatrix = graphics.createProjectionMatrix(90, 1000, 0.1);
let theta = 0;
let lastTimestamp = 0;
function drawLoop(timestamp = 0) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    cube.rotate(deltaTime / 1000, 0, deltaTime / 1000);
    graphics.bg();
    graphics.strokeStyle = '#fff';
    const triangles = cube.project(projectionMatrix);
    const filtered = triangles.filter(triangle => {
        return triangle.getNormal().z < 0;
    });
    for (const triangle of filtered) {
        // for (const triangle of triangles) {
        graphics.triangleToScreenSpace(triangle);
    }
    window.requestAnimationFrame(drawLoop);
}
window.requestAnimationFrame(drawLoop);
//# sourceMappingURL=index.js.map