// class Orientation {
//   up: Vec3
//   front: Vec3
//   right: Vec3

//   matrix: Matrix = Matrix.MakeIdentity()

//   constructor(up: Vec3, front: Vec3) {
//     this.up = up
//     this.front = front
//     this.right = up.cross(front)
//   }

//   rotate(axis: Vec3, theta: number): Matrix {
//     Vec3.RotateAround(this.up, axis, theta)
//     Vec3.RotateAround(this.front, axis, theta)
//     Vec3.CopyFrom(this.right, this.up.cross(this.front))

//     const rotationMatrix: Matrix = Matrix.FromArr([
//       [...this.right, 0],
//       [...this.up, 0],
//       [...this.front, 0],
//       [0, 0, 0, 1]
//     ])

//     Matrix.Map(this.matrix, (e, i, j) => rotationMatrix.mat[i as number][j as number])

//     return this.matrix
//   }
// }