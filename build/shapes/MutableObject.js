"use strict";
class MutableObject {
    position = vec3.create();
    orientation = mat4.create();
    translate(translation) {
        vec3.add(this.position, this.position, translation);
        return this;
    }
    moveTo(position) {
        vec3.copy(this.position, position);
        return this;
    }
    rotate(axis, theta) {
        mat4.rotate(this.orientation, this.orientation, theta, axis);
        return this;
    }
    getRight() {
        return vec3.fromValues(this.orientation[0], this.orientation[1], this.orientation[2]);
    }
    getUp() {
        return vec3.fromValues(this.orientation[4], this.orientation[5], this.orientation[6]);
    }
    getFront() {
        return vec3.fromValues(this.orientation[8], this.orientation[9], this.orientation[10]);
    }
    getWorldMatrix() {
        return mat4.multiply(mat4.create(), this.orientation, mat4.fromTranslation(mat4.create(), this.position));
    }
}
//# sourceMappingURL=MutableObject.js.map