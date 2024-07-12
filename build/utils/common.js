"use strict";
const matrix = {
    Epsilon: 0.000001,
    AngleOrder: 'zyx',
    ArrayType: (typeof Float32Array !== undefined) ? Float32Array : Array,
    setMatrixArrayType(type) {
        this.ArrayType = type;
    },
    random: Math.random,
    degree: Math.PI / 180,
    radian: 180 / Math.PI,
    toRadian(a) {
        return a * this.degree;
    },
    toDegree(a) {
        return a * this.radian;
    },
    equals(a, b) {
        return Math.abs(a - b) <= this.Epsilon * Math.max(1, Math.abs(a), Math.abs(b));
    }
};
//# sourceMappingURL=common.js.map