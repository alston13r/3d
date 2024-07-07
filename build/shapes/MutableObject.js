"use strict";
class MutableObject {
    position = new Vec3();
    orientation = Matrix.MakeIdentity();
    translate(translation) {
        Vec3.Add(this.position, translation);
        return this;
    }
    moveTo(position) {
        Vec3.CopyFrom(this.position, position);
        return this;
    }
    rotate(axis, theta) {
        Matrix.Dot(this.orientation, createRotMatQuaternion(axis, theta));
        return this;
    }
    getRight() {
        return new Vec3(...this.orientation.mat[0]);
    }
    getUp() {
        return new Vec3(...this.orientation.mat[1]);
    }
    getFront() {
        return new Vec3(...this.orientation.mat[2]);
    }
}
//# sourceMappingURL=MutableObject.js.map