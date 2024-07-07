"use strict";
class Camera extends MutableObject {
    pointTo(target, roll) {
        this.orientation = Matrix.MakeIdentity();
        const diff = target.sub(this.position);
        const yaw = Math.atan2(diff.z, diff.x);
        const pitch = Math.atan2(diff.y, diff.z);
        this.rotate(Vec3.jHat, yaw)
            .rotate(this.getRight(), pitch);
        if (roll)
            this.rotate(this.getFront(), roll);
        return this;
    }
    createLookAtMatrix() {
        return createLookAtMatrix(this.position, this.position.add(this.getFront()), this.getUp());
    }
}
//# sourceMappingURL=Camera.js.map