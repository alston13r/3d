"use strict";
class Vec3 {
    x;
    y;
    z;
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static Add(a, b) {
        a.x += b.x;
        a.y += b.y;
        a.z += b.z;
        return a;
    }
    add(v) {
        return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    static Sub(a, b) {
        a.x -= b.x;
        a.y -= b.y;
        a.z -= b.z;
        return a;
    }
    sub(v) {
        return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    static Scale(v, scalar) {
        v.x *= scalar;
        v.y *= scalar;
        v.z *= scalar;
        return v;
    }
    scale(scalar) {
        return new Vec3(scalar * this.x, scalar * this.y, scalar * this.z);
    }
    tuple() {
        return [this.x, this.y, this.z];
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
    static Normal(v) {
        return Vec3.Scale(v, 1 / v.mag());
    }
    normal() {
        return this.scale(1 / this.mag());
    }
    distanceTo(v) {
        return v.sub(this).mag();
    }
    copy() {
        return new Vec3(this.x, this.y, this.z);
    }
    static CopyFrom(vector, target) {
        vector.x = target.x;
        vector.y = target.y;
        vector.z = target.z;
        return vector;
    }
    static Dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    dot(v) {
        return Vec3.Dot(this, v);
    }
    static Cross(a, b) {
        return new Vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }
    cross(v) {
        return Vec3.Cross(this, v);
    }
    applyMatrices(matrices) {
        matrices.identity ||= Matrix.MakeIdentity();
        matrices.scale ||= Matrix.MakeIdentity();
        matrices.rotation ||= Matrix.MakeIdentity();
        matrices.orbital ||= Matrix.MakeIdentity();
        matrices.translation ||= Matrix.MakeIdentity();
        const vecMat = Matrix.FromArr([this.x, this.y, this.z, 1]);
        const mutated = vecMat
            .dot(matrices.identity)
            .dot(matrices.scale)
            .dot(matrices.rotation)
            .dot(matrices.orbital)
            .dot(matrices.translation);
        return new Vec3(...mutated.toArray());
    }
    project(matrix) {
        const mat = Matrix.FromArr([...this, 1]);
        const projectedMat = mat.dot(matrix);
        const projectedArr = projectedMat.toArray();
        const projected = new Vec3(...projectedArr);
        const w = projectedArr[3];
        if (w != 0)
            Vec3.Scale(projected, 1 / w);
        return projected;
    }
}
//# sourceMappingURL=Vec3.js.map