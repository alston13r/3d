"use strict";
class Graphics {
    canvas;
    context;
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext('2d');
    }
    appendTo(element) {
        element.appendChild(this.canvas);
        return this;
    }
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        return this;
    }
    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
    get aspHW() {
        return this.height / this.width;
    }
    get aspWH() {
        return this.width / this.height;
    }
    bg(c = '#000') {
        this.context.fillStyle = c;
        this.context.fillRect(0, 0, this.width, this.height);
    }
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    beginPath() {
        this.context.beginPath();
        return this;
    }
    moveTo(x, y) {
        this.context.moveTo(x, y);
        return this;
    }
    lineTo(x, y) {
        this.context.lineTo(x, y);
        return this;
    }
    closePath() {
        this.context.closePath();
        return this;
    }
    stroke(c) {
        if (c)
            this.context.strokeStyle = c;
        this.context.stroke();
        return this;
    }
    fill(c) {
        if (c)
            this.context.fillStyle = c;
        this.context.fill();
        return this;
    }
    get fillStyle() {
        return this.context.fillStyle;
    }
    set fillStyle(c) {
        this.context.fillStyle = c;
    }
    get strokeStyle() {
        return this.context.strokeStyle;
    }
    set strokeStyle(c) {
        this.context.strokeStyle = c;
    }
    triangle(x1, y1, x2, y2, x3, y3) {
        // triangle inflation, this is to try to reduce the gaps between touching
        // triangles, doesn't really look that great since corners get pointy
        // const xc: number = (x1 + x2 + x3) / 3
        // const yc: number = (y1 + y2 + y3) / 3
        // x1 = xc + (x1 - xc) * 1.02
        // x2 = xc + (x2 - xc) * 1.02
        // x3 = xc + (x3 - xc) * 1.02
        // y1 = yc + (y1 - yc) * 1.02
        // y2 = yc + (y2 - yc) * 1.02
        // y3 = yc + (y3 - yc) * 1.02
        this.beginPath()
            .moveTo(x1, y1)
            .lineTo(x2, y2)
            .lineTo(x3, y3)
            .closePath()
            .fill();
    }
    triangleFromVec3(p1, p2, p3) {
        this.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    }
    triangleToScreenSpace(triangle) {
        const width = this.width;
        const height = this.height;
        this.triangle((triangle.p1.x + 1) * 0.5 * width, height - (triangle.p1.y + 1) * 0.5 * height, (triangle.p2.x + 1) * 0.5 * width, height - (triangle.p2.y + 1) * 0.5 * height, (triangle.p3.x + 1) * 0.5 * width, height - (triangle.p3.y + 1) * 0.5 * height);
    }
    createProjectionMatrix(fov = 90, zFar = 1000, zNear = 0.1) {
        const asp = this.aspHW;
        fov = lerp(fov, 0, 360, 0, 2 * Math.PI);
        const f = 1 / Math.tan(fov / 2);
        const q = zFar / (zFar - zNear);
        return Matrix.FromArr([
            [asp * f, 0, 0, 0],
            [0, f, 0, 0],
            [0, 0, q, 1],
            [0, 0, -q * zNear, 0]
        ]);
    }
}
//# sourceMappingURL=Graphics.js.map