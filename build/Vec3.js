"use strict";
class Vec3 {
    static iHat = new Vec3(1, 0, 0);
    static jHat = new Vec3(0, 1, 0);
    static kHat = new Vec3(0, 0, 1);
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
    static Cast(a, b) {
        return b.normal().scale(a.dot(b));
    }
    castOnto(v) {
        return Vec3.Cast(this, v);
    }
    static RotateAround(v, axis, theta) {
        const cos = Math.cos(-theta / 2);
        const sin = Math.sin(-theta / 2);
        const q = new Quaternion(cos, axis.normal().scale(sin));
        const qi = q.inverse();
        const p = new Quaternion(0, v);
        const pRot = q.mul(p).mul(qi);
        return Vec3.CopyFrom(v, pRot.imaginary);
    }
    rotateAround(axis, theta) {
        return Vec3.RotateAround(this.copy(), axis, theta);
    }
}
//# sourceMappingURL=Vec3.js.map