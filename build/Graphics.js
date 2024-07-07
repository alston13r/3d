"use strict";
class Graphics {
    canvas;
    context;
    zBuffer;
    colorBuffer;
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext('2d');
        this.zBuffer = new Array(800).fill(0).map(() => new Array(600).fill(farPlane));
        this.colorBuffer = new Array(800).fill(0).map(() => new Array(600).fill(Color.Black));
    }
    appendTo(element) {
        element.appendChild(this.canvas);
        return this;
    }
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.zBuffer = new Array(width).fill(0).map(() => new Array(height).fill(farPlane));
        this.colorBuffer = new Array(width).fill(0).map(() => new Array(height).fill(Color.Black));
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
    createFrame() {
        const width = this.width;
        const height = this.height;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                this.zBuffer[x][y] = farPlane;
                this.colorBuffer[x][y] = Color.Black;
            }
        }
        return this;
    }
    disposeFrame() {
        const width = this.width;
        const height = this.height;
        const data = new Uint8ClampedArray(width * height * 4);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const color = this.colorBuffer[x][y];
                const i = (x + y * width) * 4;
                data[i] = color.r;
                data[i + 1] = color.g;
                data[i + 2] = color.b;
                data[i + 3] = 255;
            }
        }
        this.context.putImageData(new ImageData(data, width), 0, 0);
        return this;
    }
    triangle(x1, y1, x2, y2, x3, y3) {
        this.beginPath()
            .moveTo(x1, y1)
            .lineTo(x2, y2)
            .lineTo(x3, y3)
            .closePath()
            .stroke()
            .fill();
    }
    triangleFromInstance(triangle) {
        this.triangle(triangle.p1.x, triangle.p1.y, triangle.p2.x, triangle.p2.y, triangle.p3.x, triangle.p3.y);
    }
    triangleToScreenSpace(triangle) {
        const width = this.width;
        const height = this.height;
        return new Triangle(new Vec3((triangle.p1.x + 1) * 0.5 * width, height - (triangle.p1.y + 1) * 0.5 * height, triangle.p1.z), new Vec3((triangle.p2.x + 1) * 0.5 * width, height - (triangle.p2.y + 1) * 0.5 * height, triangle.p2.z), new Vec3((triangle.p3.x + 1) * 0.5 * width, height - (triangle.p3.y + 1) * 0.5 * height, triangle.p3.z));
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