"use strict";
class Triangle {
    p1;
    p2;
    p3;
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    getNormal() {
        const L1 = this.p2.sub(this.p1);
        const L2 = this.p3.sub(this.p1);
        return L1.cross(L2).normal();
    }
    draw(graphics) {
        graphics.triangleFromVec3(this.p1, this.p2, this.p3);
    }
}
//# sourceMappingURL=Triangle.js.map