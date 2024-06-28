"use strict";
function lerp(x, a, b, c, d) {
    return (x - a) / (b - a) * (d - c) + c;
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
//# sourceMappingURL=Utils.js.map