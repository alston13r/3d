"use strict";
class MeshTriangle {
    mesh;
    index;
    p1;
    p2;
    p3;
    constructor(mesh, index, p1, p2, p3) {
        this.mesh = mesh;
        this.index = index;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    getP1() {
        return this.mesh.points[this.p1];
    }
    getP2() {
        return this.mesh.points[this.p2];
    }
    getP3() {
        return this.mesh.points[this.p3];
    }
    getNormal() {
        const p1 = this.getP1();
        const p2 = this.getP2();
        const p3 = this.getP3();
        const L1 = p2.sub(p1);
        const L2 = p3.sub(p1);
        return L1.cross(L2).normal();
    }
    project(matrix) {
        return new Triangle(this.getP1(), this.getP2(), this.getP3())
            .project(matrix);
    }
}
//# sourceMappingURL=MeshTriangle.js.map