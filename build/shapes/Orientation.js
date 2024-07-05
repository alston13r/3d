"use strict";
class Orientation {
    up;
    front;
    right;
    matrix = Matrix.MakeIdentity();
    constructor(up, front) {
        this.up = up;
        this.front = front;
        this.right = up.cross(front);
    }
    rotate(axis, theta) {
        Vec3.RotateAround(this.up, axis, theta);
        Vec3.RotateAround(this.front, axis, theta);
        Vec3.CopyFrom(this.right, this.up.cross(this.front));
        const rotationMatrix = Matrix.FromArr([
            [...this.right, 0],
            [...this.up, 0],
            [...this.front, 0],
            [0, 0, 0, 1]
        ]);
        Matrix.Map(this.matrix, (e, i, j) => rotationMatrix.mat[i][j]);
        return this.matrix;
    }
}
//# sourceMappingURL=Orientation.js.map