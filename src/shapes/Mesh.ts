class Mesh {
  points: Vec3[] = []
  triangles: MeshTriangle[] = []
  normals: Vec3[] = []

  constructor(points: Vec3[] = []) {
    this.points = points.map(v => v.copy())
  }

  getCenter(): Vec3 {
    const length: number = this.points.length
    const [xAvg, yAvg, zAvg]: [number, number, number] = this.points.reduce((prev, curr) => {
      return [prev[0] + curr.x / length, prev[1] + curr.y / length, prev[2] + curr.z / length]
    }, [0, 0, 0])
    return new Vec3(xAvg, yAvg, zAvg)
  }

  centerPoints(): Mesh {
    const center: Vec3 = this.getCenter()

    this.points.forEach(point => Vec3.Sub(point, center))
    this.generateNormals()

    return this
  }

  generateTriangles(triangles: [number, number, number][]): Mesh {
    for (const [i, triangle] of triangles.entries()) {
      this.triangles[i] = new MeshTriangle(this, i, triangle[0], triangle[1], triangle[2])
    }
    return this
  }

  copyTrianglesToMesh(targetMesh: Mesh): Mesh {
    targetMesh.triangles.length = 0
    for (const [i, triangle] of this.triangles.entries()) {
      targetMesh.triangles[i] = new MeshTriangle(targetMesh, i, triangle.p1, triangle.p2, triangle.p3)
    }
    return targetMesh
  }

  generateNormals(): Mesh {
    for (const [i, triangle] of this.triangles.entries()) {
      this.normals[i] = triangle.getNormal()
    }
    return this
  }

  applyMatrices(matrices: MutationMatrices): Mesh {
    const mutatedVec3s: Vec3[] = this.points.map(v => v.applyMatrices(matrices))
    return this.copyTrianglesToMesh(new Mesh(mutatedVec3s)).generateNormals()
  }
}