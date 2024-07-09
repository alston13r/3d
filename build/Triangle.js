"use strict";
class Triangle {
    p1;
    p2;
    p3;
    constructor(p1, p2, p3) {
        this.p1 = p1.copy();
        this.p2 = p2.copy();
        this.p3 = p3.copy();
    }
    tuple() {
        return [this.p1, this.p2, this.p3];
    }
    *[Symbol.iterator]() {
        yield this.p1;
        yield this.p2;
        yield this.p3;
    }
    getNormal() {
        const L1 = this.p2.sub(this.p1);
        const L2 = this.p3.sub(this.p1);
        return L1.cross(L2).normal();
    }
    applyMatrix(matrix) {
        const mat1 = Matrix.FromArr([this.p1.x, this.p1.y, this.p1.z, 1]).dot(matrix);
        const mat2 = Matrix.FromArr([this.p2.x, this.p2.y, this.p2.z, 1]).dot(matrix);
        const mat3 = Matrix.FromArr([this.p3.x, this.p3.y, this.p3.z, 1]).dot(matrix);
        this.p1.x = mat1.mat[0][0];
        this.p1.y = mat1.mat[0][1];
        this.p1.z = mat1.mat[0][2];
        this.p2.x = mat2.mat[0][0];
        this.p2.y = mat2.mat[0][1];
        this.p2.z = mat2.mat[0][2];
        this.p3.x = mat3.mat[0][0];
        this.p3.y = mat3.mat[0][1];
        this.p3.z = mat3.mat[0][2];
        return this;
    }
    project(matrix) {
        return new Triangle(this.p1.project(matrix), this.p2.project(matrix), this.p3.project(matrix));
    }
    draw(graphics) {
        graphics.triangleFromInstance(this);
    }
}
//# sourceMappingURL=Triangle.js.map