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
        for (const point of [this.p1, this.p2, this.p3]) {
            const mat = Matrix.FromArr([...point, 1]);
            const modifiedMat = mat.dot(matrix);
            const modifiedArr = modifiedMat.toArray();
            point.x = modifiedArr[0];
            point.y = modifiedArr[1];
            point.z = modifiedArr[2];
        }
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