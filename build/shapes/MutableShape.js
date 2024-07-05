"use strict";
class MutableShape {
    mesh;
    position = new Vec3();
    scale = new Vec3(1, 1, 1);
    orientation = new Orientation(new Vec3(0, 0, 1), new Vec3(0, 1, 0));
    rotation = Matrix.MakeIdentity();
    constructor(points, triangles) {
        this.mesh = new Mesh(points)
            .generateTriangles(triangles)
            .generateNormals();
    }
    centerPoints() {
        this.mesh.centerPoints();
        return this;
    }
    translate(translation) {
        Vec3.Add(this.position, translation);
        return this;
    }
    moveTo(position) {
        Vec3.CopyFrom(this.position, position);
        return this;
    }
    rotate(axis, theta) {
        this.rotation = this.orientation.rotate(axis, theta);
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
            rotation: this.rotation
        });
    }
}
//# sourceMappingURL=MutableShape.js.map