"use strict";
class Cube {
    static P1 = new Vec3(0, 0, 0);
    static P2 = new Vec3(0, 1, 0);
    static P3 = new Vec3(1, 0, 0);
    static P4 = new Vec3(1, 1, 0);
    static P5 = new Vec3(1, 0, 1);
    static P6 = new Vec3(1, 1, 1);
    static P7 = new Vec3(0, 0, 1);
    static P8 = new Vec3(0, 1, 1);
    mesh;
    position = new Vec3();
    scale = new Vec3(1, 1, 1);
    rotation = new Vec3();
    constructor() {
        this.mesh = new Mesh([
            Cube.P1, Cube.P2, Cube.P3, Cube.P4,
            Cube.P5, Cube.P6, Cube.P7, Cube.P8
        ]).generateTriangles([
            [0, 1, 2], [1, 3, 2],
            [6, 7, 0], [7, 1, 0],
            [4, 5, 6], [5, 7, 6],
            [2, 3, 4], [3, 5, 4],
            [1, 7, 3], [7, 5, 3],
            [6, 0, 4], [0, 2, 4]
        ]).generateNormals();
    }
    translate(translation) {
        Vec3.Add(this.position, translation);
        return this;
    }
    moveTo(position) {
        Vec3.CopyFrom(this.position, position);
        return this;
    }
    rotate(xTheta = 0, yTheta = 0, zTheta = 0) {
        Vec3.Add(this.rotation, new Vec3(xTheta, yTheta, zTheta));
        return this;
    }
    stretch(x = 1, y = 1, z = 1) {
        this.scale.x *= x;
        this.scale.y *= y;
        this.scale.z *= z;
        return this;
    }
    applyMatrices() {
        return this.mesh.mutateTriangles({
            scale: Matrix.FromArr([
                [this.scale.x, 0, 0, 0],
                [0, this.scale.y, 0, 0],
                [0, 0, this.scale.z, 0],
                [0, 0, 0, 1]
            ]),
            translation: createTranslationMat(this.position),
            rotation: createRotMatZ(this.rotation.z)
                .dot(createRotMatY(this.rotation.y))
                .dot(createRotMatX(this.rotation.x))
        });
    }
}
//# sourceMappingURL=Cube.js.map