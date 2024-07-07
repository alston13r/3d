"use strict";
function lerp(x, a, b, c, d) {
    return (x - a) / (b - a) * (d - c) + c;
}
function clamp(x, min, max) {
    return Math.max(min, Math.min(max, x));
}
function createRotMatX(theta) {
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    return Matrix.FromArr([
        [1, 0, 0, 0],
        [0, cos, sin, 0],
        [0, -sin, cos, 0],
        [0, 0, 0, 1]
    ]);
}
function createRotMatY(theta) {
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    return Matrix.FromArr([
        [cos, 0, sin, 0],
        [0, 1, 0, 0],
        [-sin, 0, cos, 0],
        [0, 0, 0, 1]
    ]);
}
function createRotMatZ(theta) {
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    return Matrix.FromArr([
        [cos, sin, 0, 0],
        [-sin, cos, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]);
}
function createTranslationMat(translation) {
    return Matrix.FromArr([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [translation.x, translation.y, translation.z, 1]
    ]);
}
function createRotMatQuaternion(axis, theta) {
    const front = new Vec3(0, 0, 1);
    const up = new Vec3(0, 1, 0);
    const cos = Math.cos(-theta / 2);
    const sin = Math.sin(-theta / 2);
    const q = new Quaternion(cos, axis.normal().scale(sin));
    const qi = q.inverse();
    const frontRotated = q.mul(new Quaternion(0, front)).mul(qi).imaginary;
    const upRotated = q.mul(new Quaternion(0, up)).mul(qi).imaginary;
    const rightRotated = upRotated.cross(frontRotated);
    return Matrix.FromArr([
        [...rightRotated, 0],
        [...upRotated, 0],
        [...frontRotated, 0],
        [0, 0, 0, 1]
    ]);
}
function createLookAtMatrix(pos, target, up) {
    const newFront = target.sub(pos).normal();
    const a = newFront.scale(up.normal().dot(newFront));
    const newUp = up.sub(a).normal();
    const newRight = newUp.cross(newFront);
    return Matrix.FromArr([
        [...newRight, 0],
        [...newUp, 0],
        [...newFront, 0],
        [...pos, 1]
    ]);
}
function invertLookAtMatrix(matrix) {
    const arr = [[], [], [], []];
    arr[0] = [matrix.mat[0][0], matrix.mat[1][0], matrix.mat[2][0], 0];
    arr[1] = [matrix.mat[0][1], matrix.mat[1][1], matrix.mat[2][1], 0];
    arr[2] = [matrix.mat[0][2], matrix.mat[1][2], matrix.mat[2][2], 0];
    arr[3] = [
        -(matrix.mat[3][0] * arr[0][0] + matrix.mat[3][1] * arr[1][0] + matrix.mat[3][2] * arr[2][0]),
        -(matrix.mat[3][0] * arr[0][1] + matrix.mat[3][1] * arr[1][1] + matrix.mat[3][2] * arr[2][1]),
        -(matrix.mat[3][0] * arr[0][2] + matrix.mat[3][1] * arr[1][2] + matrix.mat[3][2] * arr[2][2]),
        1
    ];
    return Matrix.FromArr(arr);
}
//# sourceMappingURL=Utils.js.map