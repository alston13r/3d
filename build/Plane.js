"use strict";
// class Plane {
//   point: Vec3
//   normal: Vec3
//   planeDot: number
//   constructor(point: Vec3, normal: Vec3) {
//     this.point = point.copy()
//     this.normal = normal.normal()
//     this.planeDot = this.normal.dot(this.point)
//   }
//   clipLine(start: Vec3, end: Vec3): Vec3 {
//     const ad: number = start.dot(this.normal)
//     const bd: number = end.dot(this.normal)
//     const t: number = (this.planeDot - ad) / (bd - ad)
//     const lineStartToEnd: Vec3 = end.sub(start)
//     const lineToIntersect: Vec3 = lineStartToEnd.scale(t)
//     return start.add(lineToIntersect)
//   }
//   clipTriangle(triangle: Triangle): Triangle[] {
//     const dist = (p: Vec3) => this.normal.dot(p) - this.planeDot
//     const insidePoints: Vec3[] = []
//     const outsidePoints: Vec3[] = []
//     const d0: number = dist(triangle.p1)
//     const d1: number = dist(triangle.p2)
//     const d2: number = dist(triangle.p3)
//     if (d0 >= 0) insidePoints[insidePoints.length] = triangle.p1
//     else outsidePoints[outsidePoints.length] = triangle.p1
//     if (d1 >= 0) insidePoints[insidePoints.length] = triangle.p2
//     else outsidePoints[outsidePoints.length] = triangle.p2
//     if (d2 >= 0) insidePoints[insidePoints.length] = triangle.p3
//     else outsidePoints[outsidePoints.length] = triangle.p3
//     if (insidePoints.length == 0) return []
//     else if (insidePoints.length == 3) return [triangle]
//     else if (insidePoints.length == 1) {
//       const p1: Vec3 = insidePoints[0]
//       const p2: Vec3 = this.clipLine(insidePoints[0], outsidePoints[0])
//       const p3: Vec3 = this.clipLine(insidePoints[0], outsidePoints[1])
//       return [new Triangle(p1, p2, p3)]
//     }
//     else {
//       const p1: Vec3 = insidePoints[0]
//       const p2: Vec3 = insidePoints[1]
//       const p3: Vec3 = this.clipLine(insidePoints[0], outsidePoints[0])
//       const p4: Vec3 = this.clipLine(insidePoints[1], outsidePoints[0])
//       return [new Triangle(p1, p2, p3), new Triangle(p2, p3, p4)]
//     }
//   }
//   static ClipTriangle(triangle: Triangle, planes: Plane[]): Triangle[] {
//     const triangles: Triangle[] = [triangle]
//     for (const plane of planes) {
//       const clipN: number = triangles.length
//       for (let i = 0; i < clipN; i++) {
//         const triangleToClip: Triangle = triangles.shift() as Triangle
//         triangles.push(...plane.clipTriangle(triangleToClip))
//       }
//     }
//     return triangles
//   }
// }
//# sourceMappingURL=Plane.js.map