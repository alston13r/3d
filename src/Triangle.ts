class Triangle {
  p1: Vec3
  p2: Vec3
  p3: Vec3

  constructor(p1: Vec3, p2: Vec3, p3: Vec3) {
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
  }

  getNormal(): Vec3 {
    const L1: Vec3 = this.p2.sub(this.p1)
    const L2: Vec3 = this.p3.sub(this.p1)
    return L1.cross(L2).normal()
  }

  project(matrix: Matrix): Triangle {
    return new Triangle(
      this.p1.project(matrix),
      this.p2.project(matrix),
      this.p3.project(matrix)
    )
  }

  draw(graphics: Graphics): void {
    graphics.triangleFromVec3(this.p1, this.p2, this.p3)
  }
}