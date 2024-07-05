"use strict";
class UVSphere extends MutableShape {
    constructor(verticalDivisions = 4, horizontalDivisions = 4) {
        // top point
        // bottom point
        // everything in between
        // rotate around
        super([], []);
        // const points: Vec3[][] = []
        // for (let i = 0; i < verticalDivisions; i++) {
        //   points[i] = []
        //   const tau: number = 2 *Math.PI * i
        // }
        // super(points, [])
    }
}
class Icosphere extends MutableShape {
}
// class UVSphere extends SpatialMeshable {
//   constructor(pos: Vector = new Vector(), radius: number = 1, horizontalDivisions: number = 4, verticalDivisions: number = 4, orientation: OrientationMatrix = new OrientationMatrix()) {
//     horizontalDivisions = horizontalDivisions > 4 ? horizontalDivisions : 4
//     verticalDivisions = verticalDivisions > 4 ? verticalDivisions : 4
//     let tris: Triangle[] = []
//     let vertecies: Vector[][] = []
//     for (let i=0; i<=verticalDivisions; i++) {
//       vertecies[i] = []
//       let tau: number = 2*Math.PI*i/verticalDivisions
//       for (let j=0; j<=horizontalDivisions; j++) {
//         let theta: number = Math.PI*j/horizontalDivisions
//         let vec: Vector = new Vector(Math.sin(theta), Math.cos(theta), 0)
//         vertecies[i].push(vec.rotateAround(Vector.jHat, tau))
//       }
//     }
//     for (let slice of vertecies) {
//       for (let v of slice) {
//         Vector.Scale(Vector.Hat(v), radius)
//       }
//     }
//     for (let i=0; i<vertecies.length-1; i++) {
//       let currSector: Vector[] = vertecies[i]
//       let nextSector: Vector[] = vertecies[i+1]
//       tris.push(new Triangle(currSector[0], nextSector[1], currSector[1]))
//       for (let j=1; j<currSector.length-1; j++) {
//         tris.push(new Triangle(currSector[j], nextSector[j], currSector[j+1]))
//         if (j != currSector.length-2) tris.push(new Triangle(currSector[j+1], nextSector[j], nextSector[j+1]))
//       }
//     }
//     super(pos, orientation, new Mesh(tris.map((t: Triangle) => t.copy())))
//   }
// }
// class Icosphere extends SpatialMeshable {
//   constructor(pos: Vector = new Vector(), subdivisions: number = 0, radius: number = 1, orientation: OrientationMatrix = new OrientationMatrix()) {
//     let t: number = (1+Math.sqrt(5))/2
//     let vertecies: Vector[] = [
//       new Vector(-1,  t,  0),
//       new Vector( 1,  t,  0),
//       new Vector(-1, -t,  0),
//       new Vector( 1, -t,  0),
//       new Vector( 0, -1,  t),
//       new Vector( 0,  1,  t),
//       new Vector( 0, -1, -t),
//       new Vector( 0,  1, -t),
//       new Vector( t,  0, -1),
//       new Vector( t,  0,  1),
//       new Vector(-t,  0, -1),
//       new Vector(-t,  0,  1)
//     ].map((v: Vector) => Vector.Hat(v))
//     let tris: Triangle[] = [
//       Triangle.FromArr(0, 11, 5, vertecies),
//       Triangle.FromArr(0, 5, 1, vertecies),
//       Triangle.FromArr(0, 1, 7, vertecies),
//       Triangle.FromArr(0, 7, 10, vertecies),
//       Triangle.FromArr(0, 10, 11, vertecies),
//       Triangle.FromArr(1, 5, 9, vertecies),
//       Triangle.FromArr(5, 11, 4, vertecies),
//       Triangle.FromArr(11, 10, 2, vertecies),
//       Triangle.FromArr(10, 7, 6, vertecies),
//       Triangle.FromArr(7, 1, 8, vertecies),
//       Triangle.FromArr(3, 9, 4, vertecies),
//       Triangle.FromArr(3, 4, 2, vertecies),
//       Triangle.FromArr(3, 2, 6, vertecies),
//       Triangle.FromArr(3, 6, 8, vertecies),
//       Triangle.FromArr(3, 8, 9, vertecies),
//       Triangle.FromArr(4, 9, 5, vertecies),
//       Triangle.FromArr(2, 4, 11, vertecies),
//       Triangle.FromArr(6, 2, 10, vertecies),
//       Triangle.FromArr(8, 6, 7, vertecies),
//       Triangle.FromArr(9, 8, 1, vertecies)
//     ]
//     for (let i=0; i<subdivisions; i++) {
//       let tris2: Triangle[] = []
//       for (let tri of tris) {
//         let a = tri.p1.getMidpoint(tri.p2).hat()
//         let b = tri.p2.getMidpoint(tri.p3).hat()
//         let c = tri.p3.getMidpoint(tri.p1).hat()
//         tris2.push(new Triangle(tri.p1, a, c).copy())
//         tris2.push(new Triangle(tri.p2, b, a).copy())
//         tris2.push(new Triangle(tri.p3, c, b).copy())
//         tris2.push(new Triangle(a, b, c).copy())
//       }
//       tris = tris2
//     }
//     if (radius != 1) {
//       for (let tri of tris) {
//         tri.p1 = Vector.Scale(Vector.Hat(tri.p1), radius)
//         tri.p2 = Vector.Scale(Vector.Hat(tri.p2), radius)
//         tri.p3 = Vector.Scale(Vector.Hat(tri.p3), radius)
//       }
//     }
//     super(pos, orientation, new Mesh(tris.map((t: Triangle) => t.copy())))
//   }
// }
// class Sphere {
//   static P1: Vec3 = new Vec3(0, 0, 0)
//   static P2: Vec3 = new Vec3(0, 1, 0)
//   static P3: Vec3 = new Vec3(1, 0, 0)
//   static P4: Vec3 = new Vec3(1, 1, 0)
//   static P5: Vec3 = new Vec3(1, 0, 1)
//   static P6: Vec3 = new Vec3(1, 1, 1)
//   static P7: Vec3 = new Vec3(0, 0, 1)
//   static P8: Vec3 = new Vec3(0, 1, 1)
//   constructor() {
//   }
// }
//# sourceMappingURL=Sphere.js.map