"use strict";
class Icosphere extends MutableShape {
    constructor(radius = 1, subdivisions = 0) {
        subdivisions = Math.max(subdivisions, 0);
        // points
        const points = [
            new Vec3(-1, GoldenRatio, 0),
            new Vec3(1, GoldenRatio, 0),
            new Vec3(-1, -GoldenRatio, 0),
            new Vec3(1, -GoldenRatio, 0),
            new Vec3(0, -1, GoldenRatio),
            new Vec3(0, 1, GoldenRatio),
            new Vec3(0, -1, -GoldenRatio),
            new Vec3(0, 1, -GoldenRatio),
            new Vec3(GoldenRatio, 0, -1),
            new Vec3(GoldenRatio, 0, 1),
            new Vec3(-GoldenRatio, 0, -1),
            new Vec3(-GoldenRatio, 0, 1)
        ].map(point => point.normal());
        // triangles
        const triangles = [
            [0, 11, 5],
            [0, 5, 1],
            [0, 1, 7],
            [0, 7, 10],
            [0, 10, 11],
            [1, 5, 9],
            [5, 11, 4],
            [11, 10, 2],
            [10, 7, 6],
            [7, 1, 8],
            [3, 9, 4],
            [3, 4, 2],
            [3, 2, 6],
            [3, 6, 8],
            [3, 8, 9],
            [4, 9, 5],
            [2, 4, 11],
            [6, 2, 10],
            [8, 6, 7],
            [9, 8, 1]
        ];
        super(points, triangles);
        if (subdivisions > 0) {
            for (let i = 0; i < subdivisions; i++) {
                const triangles = [...this.mesh.triangles];
                for (const triangle of triangles) {
                    MeshTriangle.Subdivide(triangle);
                }
                this.mesh.points.forEach(point => Vec3.Normal(point));
            }
        }
        this.stretch(radius, radius, radius);
    }
}
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
//# sourceMappingURL=Icosphere.js.map