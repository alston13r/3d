// const GoldenRatio: number = (1 + Math.sqrt(5)) / 2

// function lerp(x: number, a: number, b: number, c: number, d: number): number {
//   return (x - a) / (b - a) * (d - c) + c
// }

// function clamp(x: number, min: number, max: number): number {
//   return Math.max(min, Math.min(max, x))
// }

// function createRotMatX(theta: number): Matrix {
//   const cos: number = Math.cos(theta)
//   const sin: number = Math.sin(theta)

//   return Matrix.FromArr([
//     [1, 0, 0, 0],
//     [0, cos, sin, 0],
//     [0, -sin, cos, 0],
//     [0, 0, 0, 1]
//   ])
// }

// function createRotMatY(theta: number): Matrix {
//   const cos: number = Math.cos(theta)
//   const sin: number = Math.sin(theta)

//   return Matrix.FromArr([
//     [cos, 0, sin, 0],
//     [0, 1, 0, 0],
//     [-sin, 0, cos, 0],
//     [0, 0, 0, 1]
//   ])
// }

// function createRotMatZ(theta: number): Matrix {
//   const cos: number = Math.cos(theta)
//   const sin: number = Math.sin(theta)

//   return Matrix.FromArr([
//     [cos, sin, 0, 0],
//     [-sin, cos, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
//   ])
// }

// function createTranslationMat(translation: Vec3): Matrix {
//   return Matrix.FromArr([
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [translation.x, translation.y, translation.z, 1]
//   ])
// }

// function createRotMatQuaternion(axis: Vec3, theta: number) {
//   const front: Vec3 = new Vec3(0, 0, 1)
//   const up: Vec3 = new Vec3(0, 1, 0)

//   const cos: number = Math.cos(-theta / 2)
//   const sin: number = Math.sin(-theta / 2)

//   const q: Quaternion = new Quaternion(cos, axis.normal().scale(sin))
//   const qi: Quaternion = q.inverse()

//   const frontRotated: Vec3 = q.mul(new Quaternion(0, front)).mul(qi).imaginary
//   const upRotated: Vec3 = q.mul(new Quaternion(0, up)).mul(qi).imaginary
//   const rightRotated: Vec3 = upRotated.cross(frontRotated)

//   return Matrix.FromArr([
//     [...rightRotated, 0],
//     [...upRotated, 0],
//     [...frontRotated, 0],
//     [0, 0, 0, 1]
//   ])
// }

// function createLookAtMatrix(pos: Vec3, target: Vec3, up: Vec3): Matrix {
//   const newFront: Vec3 = target.sub(pos).normal()
//   const a: Vec3 = newFront.scale(up.normal().dot(newFront))
//   const newUp: Vec3 = up.sub(a).normal()
//   const newRight: Vec3 = newUp.cross(newFront)

//   return Matrix.FromArr([
//     [...newRight, 0],
//     [...newUp, 0],
//     [...newFront, 0],
//     [...pos, 1]
//   ])
// }

// function invertLookAtMatrix(matrix: Matrix): Matrix {
//   const arr: number[][] = [[], [], [], []]
//   arr[0] = [matrix.mat[0][0], matrix.mat[1][0], matrix.mat[2][0], 0]
//   arr[1] = [matrix.mat[0][1], matrix.mat[1][1], matrix.mat[2][1], 0]
//   arr[2] = [matrix.mat[0][2], matrix.mat[1][2], matrix.mat[2][2], 0]
//   arr[3] = [
//     -(matrix.mat[3][0] * arr[0][0] + matrix.mat[3][1] * arr[1][0] + matrix.mat[3][2] * arr[2][0]),
//     -(matrix.mat[3][0] * arr[0][1] + matrix.mat[3][1] * arr[1][1] + matrix.mat[3][2] * arr[2][1]),
//     -(matrix.mat[3][0] * arr[0][2] + matrix.mat[3][1] * arr[1][2] + matrix.mat[3][2] * arr[2][2]),
//     1
//   ]
//   return Matrix.FromArr(arr)
// }