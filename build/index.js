"use strict";
const cube = new Cube()
    .translate(new Vec3(0, 0, 3))
    .rotate(0.2, 0.5, 0);
const graphics = new Graphics().appendTo(document.body);
const projectionMatrix = graphics.createProjectionMatrix(90, 1000, 0.1);
let theta = 0;
const cameraPos = new Vec3();
const lightDir = new Vec3(0, 0, -1);
let lastTimestamp = 0;
function drawLoop(timestamp = 0) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    cube.rotate(deltaTime / 1000, 0, 0);
    graphics.bg();
    const mutatedTriangles = cube.applyMatrices();
    const filtered = mutatedTriangles.filter(triangle => {
        return triangle.getNormal().dot(triangle.p1.sub(cameraPos)) < 0;
    });
    for (const triangle of filtered) {
        const normal = triangle.getNormal();
        const dp = lightDir.dot(normal);
        const s = Math.round(lerp(dp, 0, 1, 10, 250)).toString(16);
        graphics.fillStyle = '#' + s + s + s;
        const projectedTriangle = triangle.project(projectionMatrix);
        graphics.triangleToScreenSpace(projectedTriangle);
    }
    window.requestAnimationFrame(drawLoop);
}
window.requestAnimationFrame(drawLoop);
//# sourceMappingURL=index.js.map