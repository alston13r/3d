class Triangle {
  p1: Vec3
  p2: Vec3
  p3: Vec3

  constructor(p1: Vec3, p2: Vec3, p3: Vec3) {
    this.p1 = p1.copy()
    this.p2 = p2.copy()
    this.p3 = p3.copy()
  }

  tuple(): [Vec3, Vec3, Vec3] {
    return [this.p1, this.p2, this.p3]
  }

  *[Symbol.iterator]() {
    yield this.p1
    yield this.p2
    yield this.p3
  }

  getNormal(): Vec3 {
    const L1: Vec3 = this.p2.sub(this.p1)
    const L2: Vec3 = this.p3.sub(this.p1)
    return L1.cross(L2).normal()
  }

  applyMatrix(matrix: Matrix): Triangle {
    const mat1: Matrix = Matrix.FromArr([this.p1.x, this.p1.y, this.p1.z, 1]).dot(matrix)
    const mat2: Matrix = Matrix.FromArr([this.p2.x, this.p2.y, this.p2.z, 1]).dot(matrix)
    const mat3: Matrix = Matrix.FromArr([this.p3.x, this.p3.y, this.p3.z, 1]).dot(matrix)

    this.p1.x = mat1.mat[0][0]
    this.p1.y = mat1.mat[0][1]
    this.p1.z = mat1.mat[0][2]

    this.p2.x = mat2.mat[0][0]
    this.p2.y = mat2.mat[0][1]
    this.p2.z = mat2.mat[0][2]

    this.p3.x = mat3.mat[0][0]
    this.p3.y = mat3.mat[0][1]
    this.p3.z = mat3.mat[0][2]

    return this
  }

  project(matrix: Matrix): Triangle {
    return new Triangle(
      this.p1.project(matrix),
      this.p2.project(matrix),
      this.p3.project(matrix)
    )
  }

  draw(graphics: Graphics): void {
    graphics.triangleFromInstance(this)
  }
}