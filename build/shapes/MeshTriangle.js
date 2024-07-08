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
    static Subdivide(triangle) {
        const mesh = triangle.mesh;
        // remove original from mesh
        mesh.triangles.splice(mesh.triangles.indexOf(triangle), 1);
        // create three new points
        const pointA = triangle.getP1().midpoint(triangle.getP2());
        const pointB = triangle.getP2().midpoint(triangle.getP3());
        const pointC = triangle.getP3().midpoint(triangle.getP1());
        const pointCIndex = mesh.points.push(pointA, pointB, pointC) - 1;
        const pointBIndex = pointCIndex - 1;
        const pointAIndex = pointBIndex - 1;
        // create four new triangles
        let triangleIndex = mesh.triangles.length;
        const triangleA = new MeshTriangle(mesh, triangleIndex++, triangle.p1, pointAIndex, pointCIndex);
        const triangleB = new MeshTriangle(mesh, triangleIndex++, triangle.p2, pointBIndex, pointAIndex);
        const triangleC = new MeshTriangle(mesh, triangleIndex++, triangle.p3, pointCIndex, pointBIndex);
        const triangleD = new MeshTriangle(mesh, triangleIndex++, pointAIndex, pointBIndex, pointCIndex);
        const newTriangles = [triangleA, triangleB, triangleC, triangleD];
        mesh.triangles.push(...newTriangles);
        mesh.generateNormals();
        return newTriangles;
    }
}
//# sourceMappingURL=MeshTriangle.js.map