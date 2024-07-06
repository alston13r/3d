"use strict";
const nearPlane = 0.1;
const farPlane = 1000;
const cube = new Cube()
    .translate(new Vec3(2, 0, 3))
    .centerPoints();
const graphics = new Graphics().appendTo(document.body);
const projectionMatrix = graphics.createProjectionMatrix(90, farPlane, nearPlane);
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);
let theta = 0;
const cameraPos = new Vec3();
const cameraDir = new Vec3(0, 0, 1);
const cameraUp = new Vec3(0, 1, 0);
const lightDir = new Vec3(0.2, 0, -1).normal();
const keybinds = {
    'Forward': 'w',
    'Backward': 's',
    'Left': 'a',
    'Right': 'd',
    'Up': 'e',
    'Down': 'q',
    'Yaw left': 'ArrowLeft',
    'Yaw right': 'ArrowRight'
};
function loadInputs() {
    const FB = (keys[keybinds['Forward']] ? 1 : 0) - (keys[keybinds['Backward']] ? 1 : 0);
    const LR = (keys[keybinds['Right']] ? 1 : 0) - (keys[keybinds['Left']] ? 1 : 0);
    const UD = (keys[keybinds['Up']] ? 1 : 0) - (keys[keybinds['Down']] ? 1 : 0);
    const Y = (keys[keybinds['Yaw left']] ? 1 : 0) - (keys[keybinds['Yaw right']] ? 1 : 0);
    Vec3.Add(cameraPos, cameraDir.normal().scale(FB * 0.02));
    Vec3.Add(cameraPos, cameraUp.cross(cameraDir).normal().scale(LR * 0.02));
    Vec3.Add(cameraPos, cameraUp.normal().scale(UD * 0.02));
    Vec3.RotateAround(cameraDir, cameraUp, Y * 0.01);
}
function logTriangle(tri, t) {
    if (t)
        console.log(t);
    console.log('p1: [' + [...tri.p1].join(', ') + ']');
    console.log('p2: [' + [...tri.p2].join(', ') + ']');
    console.log('p3: [' + [...tri.p3].join(', ') + ']');
}
graphics.context.font = 'arial 10px';
graphics.context.textAlign = 'left';
graphics.context.textBaseline = 'top';
function text(t, x, y) {
    graphics.fillStyle = '#fff';
    graphics.context.fillText(t, x, y);
}
function getLightColor(dp) {
    const s = clamp(Math.round(dp * 255), 30, 250).toString(16);
    const sMod = s.length == 1 ? '0' + s : s;
    return '#' + sMod + sMod + sMod;
}
function clipVecAgainstPlane(planePoint, planeNormal, lineStart, lineEnd) {
    Vec3.Normal(planeNormal);
    const planeD = -planeNormal.dot(planePoint);
    const ad = lineStart.dot(planeNormal);
    const bd = lineEnd.dot(planeNormal);
    const t = (-planeD - ad) / (bd - ad);
    const lineStartToEnd = lineEnd.sub(lineStart);
    const lineToIntersect = lineStartToEnd.scale(t);
    return lineStart.add(lineToIntersect);
}
function clipTriangleAgainstPlane(planePoint, planeNormal, triangle) {
    Vec3.Normal(planeNormal);
    const dist = (p) => planeNormal.dot(p) - planeNormal.dot(planePoint);
    const insidePoints = [];
    const outsidePoints = [];
    const d0 = dist(triangle.p1);
    const d1 = dist(triangle.p2);
    const d2 = dist(triangle.p3);
    if (d0 >= 0)
        insidePoints[insidePoints.length] = triangle.p1;
    else
        outsidePoints[outsidePoints.length] = triangle.p1;
    if (d1 >= 0)
        insidePoints[insidePoints.length] = triangle.p2;
    else
        outsidePoints[outsidePoints.length] = triangle.p2;
    if (d2 >= 0)
        insidePoints[insidePoints.length] = triangle.p3;
    else
        outsidePoints[outsidePoints.length] = triangle.p3;
    if (insidePoints.length == 0)
        return [];
    else if (insidePoints.length == 3)
        return [triangle];
    else if (insidePoints.length == 1) {
        const p1 = insidePoints[0];
        const p2 = clipVecAgainstPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[0]);
        const p3 = clipVecAgainstPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[1]);
        return [new Triangle(p1, p2, p3)];
    }
    else {
        const p1 = insidePoints[0];
        const p2 = insidePoints[1];
        const p3 = clipVecAgainstPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[0]);
        const p4 = clipVecAgainstPlane(planePoint, planeNormal, insidePoints[1], outsidePoints[0]);
        return [new Triangle(p1, p2, p3), new Triangle(p2, p3, p4)];
    }
}
let lastTimestamp = 0;
function drawLoop(timestamp = 0) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    theta += deltaTime / 1000;
    theta %= 2 * Math.PI;
    loadInputs();
    graphics.bg();
    const rotationMatrix = createRotMatQuaternion(new Vec3(1, 0, 0), theta);
    // const rotationMatrix: Matrix = Matrix.MakeIdentity()
    const translationMatrix = createTranslationMat(new Vec3(0, 0, 3));
    const worldMatrix = Matrix.MakeIdentity()
        .dot(rotationMatrix)
        .dot(translationMatrix);
    const viewMatrix = invertLookAtMatrix(createLookAtMatrix(cameraPos, cameraPos.add(cameraDir), cameraUp));
    graphics.strokeStyle = '#fff';
    const raster = [];
    for (const tri of cube.mesh.triangles) {
        const triangle = new Triangle(tri.getP1(), tri.getP2(), tri.getP3());
        const transformedTriangle = triangle.applyMatrix(worldMatrix);
        const normal = transformedTriangle.getNormal();
        const cameraRay = transformedTriangle.p1.sub(cameraPos);
        if (normal.dot(cameraRay) < 0) { // triangle is visible
            const dp = lightDir.dot(normal);
            const color = getLightColor(dp);
            // view
            const viewedTriangle = transformedTriangle.applyMatrix(viewMatrix);
            // clip against near and far planes
            const clippedTriangles = [];
            clippedTriangles.push(...clipTriangleAgainstPlane(new Vec3(0, 0, nearPlane), new Vec3(0, 0, 1), viewedTriangle));
            const clippedN = clippedTriangles.length;
            for (let i = 0; i < clippedN; i++) {
                const clipped = clippedTriangles.shift();
                clippedTriangles.push(...clipTriangleAgainstPlane(new Vec3(0, 0, farPlane), new Vec3(0, 0, -1), clipped));
            }
            for (const clipped of clippedTriangles) {
                // project
                const projected = clipped.project(projectionMatrix);
                // scale
                const scaled = graphics.triangleToScreenSpace(projected);
                raster.push({ triangle: scaled, color });
            }
        }
    }
    raster.sort((a, b) => b.triangle.p1.z - a.triangle.p1.z);
    for (const obj of raster) {
        const toClip = obj.triangle;
        graphics.fillStyle = obj.color;
        graphics.strokeStyle = obj.color;
        const arr = [toClip];
        for (let i = 0; i < 4; i++) {
            const toClipN = arr.length;
            for (let j = 0; j < toClipN; j++) {
                const clipping = arr.shift();
                switch (i) {
                    case 0:
                        arr.push(...clipTriangleAgainstPlane(new Vec3(0, 0, 0), new Vec3(1, 0, 0), clipping));
                        break;
                    case 1:
                        arr.push(...clipTriangleAgainstPlane(new Vec3(0, 0, 0), new Vec3(0, 1, 0), clipping));
                        break;
                    case 2:
                        arr.push(...clipTriangleAgainstPlane(new Vec3(graphics.width, 0, 0), new Vec3(-1, 0, 0), clipping));
                        break;
                    case 3:
                        arr.push(...clipTriangleAgainstPlane(new Vec3(0, graphics.height, 0), new Vec3(0, -1, 0), clipping));
                        break;
                }
            }
        }
        for (const clipped of arr) {
            graphics.triangleFromInstance(clipped);
        }
    }
    window.requestAnimationFrame(drawLoop);
}
window.requestAnimationFrame(drawLoop);
//# sourceMappingURL=index.js.map