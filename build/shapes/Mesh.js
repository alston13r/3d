"use strict";
class Mesh {
    points = [];
    triangles = [];
    normals = [];
    constructor(points) {
        this.points = points.map(v => v.copy());
    }
    getCenter() {
        const length = this.points.length;
        const [xAvg, yAvg, zAvg] = this.points.reduce((prev, curr) => {
            return [prev[0] + curr.x / length, prev[1] + curr.y / length, prev[2] + curr.z / length];
        }, [0, 0, 0]);
        return new Vec3(xAvg, yAvg, zAvg);
    }
    generateTriangles(triangles) {
        for (const [i, triangle] of triangles.entries()) {
            this.triangles[i] = new MeshTriangle(this, i, triangle[0], triangle[1], triangle[2]);
        }
        return this;
    }
    copyTrianglesToMesh(targetMesh) {
        targetMesh.triangles.length = 0;
        for (const [i, triangle] of this.triangles.entries()) {
            targetMesh.triangles[i] = new MeshTriangle(targetMesh, i, triangle.p1, triangle.p2, triangle.p3);
        }
        return targetMesh;
    }
    generateNormals() {
        for (const [i, triangle] of this.triangles.entries()) {
            this.normals[i] = triangle.getNormal();
        }
        return this;
    }
    applyMatrices(matrices) {
        const mutatedVec3s = this.points.map(v => v.applyMatrices(matrices));
        return this.copyTrianglesToMesh(new Mesh(mutatedVec3s)).generateNormals();
    }
}
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
//# sourceMappingURL=Mesh.js.map