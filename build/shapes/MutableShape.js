"use strict";
class MutableShape extends MutableObject {
    mesh;
    position = new Vec3();
    scale = new Vec3(1, 1, 1);
    orientation = Matrix.MakeIdentity();
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
        this.scale.x *= x;
        this.scale.y *= y;
        this.scale.z *= z;
        return this;
    }
    applyMatrices(matrices) {
        return this.mesh.applyMatrices({
            camera: matrices?.camera,
            scale: Matrix.FromArr([
                [this.scale.x, 0, 0, 0],
                [0, this.scale.y, 0, 0],
                [0, 0, this.scale.z, 0],
                [0, 0, 0, 1]
            ]),
            translation: createTranslationMat(this.position),
            rotation: this.orientation
        });
    }
}
//# sourceMappingURL=MutableShape.js.map