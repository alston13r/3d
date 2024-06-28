class MeshTriangle {
  mesh: Mesh
  index: number
  p1: number
  p2: number
  p3: number

  constructor(mesh: Mesh, index: number, p1: number, p2: number, p3: number) {
    this.mesh = mesh
    this.index = index
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
  }

  getP1(): Vec3 {
    return this.mesh.points[this.p1]
  }

  getP2(): Vec3 {
    return this.mesh.points[this.p2]
  }

  getP3(): Vec3 {
    return this.mesh.points[this.p3]
  }

  getNormal(): Vec3 {
    const p1: Vec3 = this.getP1()
    const p2: Vec3 = this.getP2()
    const p3: Vec3 = this.getP3()
    const L1: Vec3 = p2.sub(p1)
    const L2: Vec3 = p3.sub(p1)
    return L1.cross(L2).normal()
  }

  project(matrix: Matrix): Triangle {
    return new Triangle(this.getP1(), this.getP2(), this.getP3())
      .project(matrix)
  }
}