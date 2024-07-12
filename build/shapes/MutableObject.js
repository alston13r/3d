"use strict";
// class MutableObject {
//   position: Vec3 = vec3.create()
//   orientation: Mat4 = mat4.create()
//   translate(translation: Vec3): MutableObject {
//     vec3.add(this.position, this.position, translation)
//     return this
//   }
//   moveTo(position: Vec3): MutableObject {
//     Vec3.CopyFrom(this.position, position)
//     return this
//   }
//   rotate(axis: Vec3, theta: number): MutableObject {
//     this.orientation = Matrix.Dot(this.orientation, createRotMatQuaternion(axis, theta))
//     return this
//   }
//   getRight(): Vec3 {
//     return new Vec3(...this.orientation.mat[0])
//   }
//   getUp(): Vec3 {
//     return new Vec3(...this.orientation.mat[1])
//   }
//   getFront(): Vec3 {
//     return new Vec3(...this.orientation.mat[2])
//   }
//   getWorldMatrix(): Matrix {
//     return this.orientation.dot(createTranslationMat(this.position))
//   }
// }
//# sourceMappingURL=MutableObject.js.map