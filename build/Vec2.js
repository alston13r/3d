"use strict";
class Vec2 {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static Add(a, b) {
        a.x += b.x;
        a.y += b.y;
        return a;
    }
    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }
    static Sub(a, b) {
        a.x -= b.x;
        a.y -= b.y;
        return a;
    }
    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }
    static Scale(v, s) {
        v.x *= s;
        v.y *= s;
        return v;
    }
    scale(a) {
        return new Vec2(a * this.x, a * this.y);
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    static Normal(v) {
        return Vec2.Scale(v, 1 / v.mag());
    }
    normal() {
        return this.scale(1 / this.mag());
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    static FromAngle(theta) {
        return new Vec2(Math.cos(theta), Math.sin(theta));
    }
    static Sign(p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }
    insideTriangle(p1, p2, p3) {
        let d1 = Vec2.Sign(this, p1, p2);
        let d2 = Vec2.Sign(this, p2, p3);
        let d3 = Vec2.Sign(this, p3, p1);
        let hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        let hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
        return !(hasNeg && hasPos);
    }
    distanceTo(v) {
        return v.sub(this).mag();
    }
    copy() {
        return new Vec2(this.x, this.y);
    }
    toXY() {
        return [this.x, this.y];
    }
    static CopyFrom(vector, target) {
        vector.x = target.x;
        vector.y = target.y;
        return vector;
    }
    static Dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    dot(v) {
        return Vec2.Dot(this, v);
    }
    static Cross(a, b) {
        return a.x * b.y - a.y * b.x;
    }
    cross(v) {
        return Vec2.Cross(this, v);
    }
    static Cast(a, b) {
        return b.normal().scale(a.dot(b));
    }
    castOnto(v) {
        return Vec2.Cast(this, v);
    }
}
//# sourceMappingURL=Vec2.js.map