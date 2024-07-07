"use strict";
const scene = new Scene();
const camera = scene.camera;
const cube = new Cube()
    .translate(new Vec3(2, 0, 3))
    .centerPoints();
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);
let theta = 0;
const lightDir = new Vec3(0.2, 0, -1).normal();
const keybinds = {
    'Forward': 'w',
    'Backward': 's',
    'Left': 'a',
    'Right': 'd',
    'Up': 'e',
    'Down': 'q',
    'Yaw left': 'ArrowLeft',
    'Yaw right': 'ArrowRight',
    'Pitch up': 'ArrowDown',
    'Pitch down': 'ArrowUp'
};
function loadInputs() {
    const FB = (keys[keybinds['Forward']] ? 1 : 0) - (keys[keybinds['Backward']] ? 1 : 0);
    const LR = (keys[keybinds['Right']] ? 1 : 0) - (keys[keybinds['Left']] ? 1 : 0);
    const UD = (keys[keybinds['Up']] ? 1 : 0) - (keys[keybinds['Down']] ? 1 : 0);
    const Y = (keys[keybinds['Yaw left']] ? 1 : 0) - (keys[keybinds['Yaw right']] ? 1 : 0);
    const P = (keys[keybinds['Pitch up']] ? 1 : 0) - (keys[keybinds['Pitch down']] ? 1 : 0);
    const right = camera.getRight();
    const up = camera.getUp();
    const front = camera.getFront();
    camera.translate(front.normal().scale(FB * 0.02));
    camera.translate(right.normal().scale(LR * 0.02));
    camera.translate(up.normal().scale(UD * 0.02));
    camera.rotate(up, Y * 0.01);
    camera.rotate(camera.getRight(), P * 0.01);
}
function getLightColor(dp) {
    const x = clamp(Math.round(dp * 255), 30, 250);
    return new Color(x, x, x).toString();
}
let lastTimestamp = 0;
function drawLoop(timestamp = 0) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    theta += deltaTime / 1000;
    theta %= 2 * Math.PI;
    loadInputs();
    scene.graphics.bg();
    const rotationMatrix = createRotMatQuaternion(new Vec3(1, 0, 0), theta);
    const translationMatrix = createTranslationMat(new Vec3(0, 0, 3));
    const worldMatrix = Matrix.MakeIdentity()
        .dot(rotationMatrix)
        .dot(translationMatrix);
    const viewMatrix = invertLookAtMatrix(camera.createLookAtMatrix());
    const raster = [];
    for (const tri of cube.mesh.triangles) {
        const triangle = new Triangle(tri.getP1(), tri.getP2(), tri.getP3());
        const transformedTriangle = triangle.applyMatrix(worldMatrix);
        const cameraRay = transformedTriangle.p1.sub(camera.position);
        if (cameraRay.dot(camera.getFront()) < 0)
            continue; // triangle is behind camera
        const normal = transformedTriangle.getNormal();
        if (normal.dot(cameraRay) < 0) { // triangle face is visible
            const dp = lightDir.dot(normal);
            const color = Color.FromGrey(clamp(Math.round(dp * 255), 30, 250)).toString();
            // view
            const viewedTriangle = transformedTriangle.applyMatrix(viewMatrix);
            // clip against near and far planes
            const triangles = scene.clipTriangleAgainstNearFarPlanes(viewedTriangle);
            for (const clipped of triangles) {
                // project
                const projected = clipped.project(scene.projectionMatrix);
                // scale
                const scaled = scene.graphics.triangleToScreenSpace(projected);
                raster.push({ triangle: scaled, color });
            }
        }
    }
    raster.sort((a, b) => b.triangle.p1.z - a.triangle.p1.z);
    for (const obj of raster) {
        const toClip = obj.triangle;
        scene.graphics.fillStyle = obj.color;
        scene.graphics.strokeStyle = obj.color;
        const triangles = scene.clipTriangleAgainstBorderPlanes(toClip);
        for (const clipped of triangles) {
            scene.graphics.triangleFromInstance(clipped);
        }
    }
    window.requestAnimationFrame(drawLoop);
}
window.requestAnimationFrame(drawLoop);
//# sourceMappingURL=index.js.map