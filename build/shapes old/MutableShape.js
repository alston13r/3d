"use strict";
// interface MutableShape {
//   translate(translation: Vec3): MutableShape
//   moveTo(position: Vec3): MutableShape
//   rotate(axis: Vec3, theta: number): MutableShape
// }
// class MutableShape extends MutableObject {
//   mesh: Mesh
//   scale: Matrix = Matrix.MakeIdentity()
//   constructor(points: Vec3[], triangles: [number, number, number][]) {
//     super()
//     this.mesh = new Mesh(points)
//       .generateTriangles(triangles)
//       .generateNormals()
//   }
//   centerPoints(): MutableShape {
//     this.mesh.centerPoints()
//     return this
//   }
//   stretch(x: number = 1, y: number = 1, z: number = 1): MutableShape {
//     this.scale.mat[0][0] *= x
//     this.scale.mat[1][1] *= y
//     this.scale.mat[2][2] *= z
//     return this
//   }
//   getWorldMatrix(): Matrix {
//     return this.scale.dot(super.getWorldMatrix())
//   }
// }
//# sourceMappingURL=MutableShape.js.map