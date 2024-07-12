"use strict";
// // prettier-ignore
// declare type ReadonlyMat2 =
//   | readonly [
//     number, number,
//     number, number
//   ]
//   | IndexedCollection;
// // prettier-ignore
// declare type ReadonlyMat2d =
//   | readonly [
//     number, number,
//     number, number,
//     number, number
//   ]
//   | IndexedCollection;
// // prettier-ignore
// declare type ReadonlyMat3 =
//   | readonly [
//     number, number, number,
//     number, number, number,
//     number, number, number
//   ]
//   | IndexedCollection;
// // prettier-ignore
// declare type ReadonlyMat4 =
//   | readonly [
//     number, number, number, number,
//     number, number, number, number,
//     number, number, number, number,
//     number, number, number, number
//   ]
//   | IndexedCollection;
// declare type ReadonlyQuat =
//   | readonly [number, number, number, number]
//   | IndexedCollection;
// declare type ReadonlyQuat2 =
//   | readonly [number, number, number, number, number, number, number, number]
//   | IndexedCollection;
// declare type ReadonlyVec2 = readonly [number, number] | IndexedCollection;
// declare type ReadonlyVec3 = readonly [number, number, number] | IndexedCollection;
// declare type ReadonlyVec4 =
//   | readonly [number, number, number, number]
//   | IndexedCollection;
const matrix = {
    EPSILON: 0.000001,
    ANGLE_ORDER: 'zyx',
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
        return Math.abs(a - b) <= this.EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
    }
};
//# sourceMappingURL=common.js.map