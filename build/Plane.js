"use strict";
class Plane {
    point;
    normal;
    planeDot;
    constructor(point, normal) {
        this.point = point.copy();
        this.normal = normal.normal();
        this.planeDot = this.normal.dot(this.point);
    }
    clipLine(start, end) {
        const ad = start.dot(this.normal);
        const bd = end.dot(this.normal);
        const t = (this.planeDot - ad) / (bd - ad);
        const lineStartToEnd = end.sub(start);
        const lineToIntersect = lineStartToEnd.scale(t);
        return start.add(lineToIntersect);
    }
    clipTriangle(triangle) {
        const dist = (p) => this.normal.dot(p) - this.planeDot;
        const insidePoints = [];
        const outsidePoints = [];
        const d0 = dist(triangle.p1);
        const d1 = dist(triangle.p2);
        const d2 = dist(triangle.p3);
        if (d0 >= 0)
            insidePoints[insidePoints.length] = triangle.p1;
        else
            outsidePoints[outsidePoints.length] = triangle.p1;
        if (d1 >= 0)
            insidePoints[insidePoints.length] = triangle.p2;
        else
            outsidePoints[outsidePoints.length] = triangle.p2;
        if (d2 >= 0)
            insidePoints[insidePoints.length] = triangle.p3;
        else
            outsidePoints[outsidePoints.length] = triangle.p3;
        if (insidePoints.length == 0)
            return [];
        else if (insidePoints.length == 3)
            return [triangle];
        else if (insidePoints.length == 1) {
            const p1 = insidePoints[0];
            const p2 = this.clipLine(insidePoints[0], outsidePoints[0]);
            const p3 = this.clipLine(insidePoints[0], outsidePoints[1]);
            return [new Triangle(p1, p2, p3)];
        }
        else {
            const p1 = insidePoints[0];
            const p2 = insidePoints[1];
            const p3 = this.clipLine(insidePoints[0], outsidePoints[0]);
            const p4 = this.clipLine(insidePoints[1], outsidePoints[0]);
            return [new Triangle(p1, p2, p3), new Triangle(p2, p3, p4)];
        }
    }
    static ClipTriangle(triangle, planes) {
        const triangles = [triangle];
        for (const plane of planes) {
            const clipN = triangles.length;
            for (let i = 0; i < clipN; i++) {
                const triangleToClip = triangles.shift();
                triangles.push(...plane.clipTriangle(triangleToClip));
            }
        }
        return triangles;
    }
}
//# sourceMappingURL=Plane.js.map