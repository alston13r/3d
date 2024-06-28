"use strict";
const cube = new Cube()
    .translate(new Vec3(0, 0, 3))
    .rotate(0, 0.2, 0.5);
const graphics = new Graphics().appendTo(document.body);
const projectionMatrix = graphics.createProjectionMatrix(90, 1000, 0.1);
let theta = 0;
function projectTriangle(triangle, matrix) {
    const p1Mat = Matrix.FromArr([...triangle.p1, 1]);
    const p2Mat = Matrix.FromArr([...triangle.p2, 1]);
    const p3Mat = Matrix.FromArr([...triangle.p3, 1]);
    const projectedP1Mat = p1Mat.dot(matrix);
    const projectedP2Mat = p2Mat.dot(matrix);
    const projectedP3Mat = p3Mat.dot(matrix);
    const projectedP1Arr = projectedP1Mat.toArray();
    const projectedP2Arr = projectedP2Mat.toArray();
    const projectedP3Arr = projectedP3Mat.toArray();
    const projectedP1 = new Vec3(...projectedP1Arr);
    const projectedP2 = new Vec3(...projectedP2Arr);
    const projectedP3 = new Vec3(...projectedP3Arr);
    const p1W = projectedP1Arr[3];
    const p2W = projectedP2Arr[3];
    const p3W = projectedP3Arr[3];
    if (p1W != 0)
        Vec3.Scale(projectedP1, 1 / p1W);
    if (p2W != 0)
        Vec3.Scale(projectedP2, 1 / p2W);
    if (p3W != 0)
        Vec3.Scale(projectedP3, 1 / p3W);
    return new Triangle(projectedP1, projectedP2, projectedP3);
}
const cameraPos = new Vec3();
let lastTimestamp = 0;
function drawLoop(timestamp = 0) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    cube.rotate(deltaTime / 1000, 0, 0);
    graphics.bg();
    graphics.strokeStyle = '#fff';
    const mutatedTriangles = cube.applyMatrices();
    const filtered = mutatedTriangles.filter(triangle => {
        return triangle.getNormal().dot(triangle.p1.sub(cameraPos)) < 0;
    });
    for (const triangle of filtered) {
        const projectedTriangle = projectTriangle(triangle, projectionMatrix);
        graphics.triangleToScreenSpace(projectedTriangle);
    }
    // const outputVecArr: number[] = mutated.toArray()
    // const outputVec: Vec3 = new Vec3(...outputVecArr)
    // const w: number = outputVecArr[3]
    // if (w != 0) {
    //   outputVec.x /= w
    //   outputVec.y /= w
    //   outputVec.z /= w
    // }
    // return outputVec
    window.requestAnimationFrame(drawLoop);
}
window.requestAnimationFrame(drawLoop);
//# sourceMappingURL=index.js.map