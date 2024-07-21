"use strict";
// class MeshTriangle {
//   mesh: Mesh
//   index: number
//   p1: number
//   p2: number
//   p3: number
//   constructor(mesh: Mesh, index: number, p1: number, p2: number, p3: number) {
//     this.mesh = mesh
//     this.index = index
//     this.p1 = p1
//     this.p2 = p2
//     this.p3 = p3
//   }
//   getP1(): Vec3 {
//     return this.mesh.points[this.p1]
//   }
//   getP2(): Vec3 {
//     return this.mesh.points[this.p2]
//   }
//   getP3(): Vec3 {
//     return this.mesh.points[this.p3]
//   }
//   getNormal(): Vec3 {
//     const p1: Vec3 = this.getP1()
//     const p2: Vec3 = this.getP2()
//     const p3: Vec3 = this.getP3()
//     const L1: Vec3 = p2.sub(p1)
//     const L2: Vec3 = p3.sub(p1)
//     return L1.cross(L2).normal()
//   }
//   project(matrix: Matrix): Triangle {
//     return new Triangle(this.getP1(), this.getP2(), this.getP3())
//       .project(matrix)
//   }
//   static Subdivide(triangle: MeshTriangle): MeshTriangle[] {
//     const mesh: Mesh = triangle.mesh
//     // remove original from mesh
//     mesh.triangles.splice(mesh.triangles.indexOf(triangle), 1)
//     // create three new points
//     const pointA: Vec3 = triangle.getP1().midpoint(triangle.getP2())
//     const pointB: Vec3 = triangle.getP2().midpoint(triangle.getP3())
//     const pointC: Vec3 = triangle.getP3().midpoint(triangle.getP1())
//     const pointCIndex: number = mesh.points.push(pointA, pointB, pointC) - 1
//     const pointBIndex: number = pointCIndex - 1
//     const pointAIndex: number = pointBIndex - 1
//     // create four new triangles
//     let triangleIndex: number = mesh.triangles.length
//     const triangleA: MeshTriangle = new MeshTriangle(mesh, triangleIndex++, triangle.p1, pointAIndex, pointCIndex)
//     const triangleB: MeshTriangle = new MeshTriangle(mesh, triangleIndex++, triangle.p2, pointBIndex, pointAIndex)
//     const triangleC: MeshTriangle = new MeshTriangle(mesh, triangleIndex++, triangle.p3, pointCIndex, pointBIndex)
//     const triangleD: MeshTriangle = new MeshTriangle(mesh, triangleIndex++, pointAIndex, pointBIndex, pointCIndex)
//     const newTriangles: MeshTriangle[] = [triangleA, triangleB, triangleC, triangleD]
//     mesh.triangles.push(...newTriangles)
//     mesh.generateNormals()
//     return newTriangles
//   }
// }
//# sourceMappingURL=MeshTriangle.js.map