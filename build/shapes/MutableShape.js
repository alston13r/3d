"use strict";
class MutableShape extends MutableObject {
    mesh;
    scale = Matrix.MakeIdentity();
    constructor(points, triangles) {
        super();
        this.mesh = new Mesh(points)
            .generateTriangles(triangles)
            .generateNormals();
    }
    centerPoints() {
        this.mesh.centerPoints();
        return this;
    }
    stretch(x = 1, y = 1, z = 1) {
        this.scale.mat[0][0] *= x;
        this.scale.mat[1][1] *= y;
        this.scale.mat[2][2] *= z;
        return this;
    }
    getWorldMatrix() {
        return this.scale.dot(super.getWorldMatrix());
    }
}
//# sourceMappingURL=MutableShape.js.map