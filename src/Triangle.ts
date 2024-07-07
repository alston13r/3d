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
    for (const point of [this.p1, this.p2, this.p3]) {
      const mat: Matrix = Matrix.FromArr([...point, 1])
      const modifiedMat: Matrix = mat.dot(matrix)
      const modifiedArr: number[] = modifiedMat.toArray()
      point.x = modifiedArr[0]
      point.y = modifiedArr[1]
      point.z = modifiedArr[2]
    }
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