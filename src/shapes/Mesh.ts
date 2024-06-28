class Mesh {
  points: Vec3[] = []
  triangles: MeshTriangle[] = []
  normals: Vec3[] = []

  constructor(points: Vec3[]) {
    this.points = points.map(v => v.copy())
  }

  getCenter(): Vec3 {
    const length: number = this.points.length
    const [xAvg, yAvg, zAvg]: [number, number, number] = this.points.reduce((prev, curr) => {
      return [prev[0] + curr.x / length, prev[1] + curr.y / length, prev[2] + curr.z / length]
    }, [0, 0, 0])
    return new Vec3(xAvg, yAvg, zAvg)
  }

  generateTriangles(triangles: [number, number, number][]): Mesh {
    for (const [i, triangle] of triangles.entries()) {
      this.triangles[i] = new MeshTriangle(this, i, triangle[0], triangle[1], triangle[2])
    }
    return this
  }

  generateNormals(): Mesh {
    for (const [i, triangle] of this.triangles.entries()) {
      this.normals[i] = triangle.getNormal()
    }
    return this
  }

  projectTriangles(matrices: ProjectionMatrices): Triangle[] {
    matrices.identity ||= Matrix.MakeIdentity()
    matrices.scale ||= Matrix.MakeIdentity()
    matrices.rotation ||= Matrix.MakeIdentity()
    matrices.orbital ||= Matrix.MakeIdentity()
    matrices.translation ||= Matrix.MakeIdentity()

    const projectedVec3s: Vec3[] = this.points.map(v => v.project(matrices))
    const projectedTriangles: Triangle[] = this.triangles.map(triangle => {
      return new Triangle(
        projectedVec3s[triangle.p1],
        projectedVec3s[triangle.p2],
        projectedVec3s[triangle.p3]
      )
    })

    return projectedTriangles
  }

  projectNormals(matrices: ProjectionMatrices): Vec3[] {
    matrices.identity ||= Matrix.MakeIdentity()
    matrices.scale ||= Matrix.MakeIdentity()
    matrices.rotation ||= Matrix.MakeIdentity()
    matrices.orbital ||= Matrix.MakeIdentity()
    matrices.translation ||= Matrix.MakeIdentity()

    return this.normals.map(v => v.project(matrices))
  }
}

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
}