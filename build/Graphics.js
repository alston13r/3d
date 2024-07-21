"use strict";
const graphics = {
    createCanvas() {
        return document.createElement('canvas');
    },
    setSize(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        return canvas;
    },
    getWebGL(canvas) {
        let gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
        if (gl === null) {
            throw 'Unable to initialize WebGL. Your browser or machine may not support it.';
        }
        return gl;
    },
    initGL(gl) {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        return gl;
    },
    startRecording(canvas, time) {
        const chunks = []; // here we will store our recorded media chunks (Blobs)
        const stream = canvas.captureStream(); // grab our canvas MediaStream
        const rec = new MediaRecorder(stream); // init the recorder
        // every time the recorder has new data, we will store it in our array
        rec.ondataavailable = e => chunks.push(e.data);
        // only when the recorder stops, we construct a complete Blob from all the chunks
        rec.onstop = () => this.exportVid(new Blob(chunks, { type: 'video/webm' }));
        rec.start();
        setTimeout(() => rec.stop(), time); // stop recording in 3s
    },
    exportVid(blob) {
        const vid = document.createElement('video');
        vid.src = URL.createObjectURL(blob);
        vid.controls = true;
        document.body.appendChild(vid);
        const a = document.createElement('a');
        a.download = 'myvid.webm';
        a.href = vid.src;
        a.textContent = 'download the video';
        document.body.appendChild(a);
    }
};
// class Graphics {
//   canvas: HTMLCanvasElement
//   context: CanvasRenderingContext2D
//   // zBuffer: number[]
//   // colorBuffer: number[]
//   constructor() {
//     this.canvas = document.createElement('canvas')
//     this.canvas.width = 800
//     this.canvas.height = 600
//     this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
//     // this.zBuffer = new Array(480000).fill(1)
//     // this.colorBuffer = new Array(1440000).fill(0)
//   }
//   appendTo(element: HTMLElement): Graphics {
//     element.appendChild(this.canvas)
//     return this
//   }
//   setSize(width: number, height: number): Graphics {
//     this.canvas.width = width
//     this.canvas.height = height
//     // this.zBuffer = new Array(width * height).fill(1)
//     // this.colorBuffer = new Array(width * height * 4).fill(0)
//     return this
//   }
//   get width(): number {
//     return this.canvas.width
//   }
//   get height(): number {
//     return this.canvas.height
//   }
//   get aspHW(): number {
//     return this.height / this.width
//   }
//   get aspWH(): number {
//     return this.width / this.height
//   }
//   bg(c: string = '#000'): void {
//     this.context.fillStyle = c
//     this.context.fillRect(0, 0, this.width, this.height)
//   }
//   clear(): void {
//     this.context.clearRect(0, 0, this.width, this.height)
//   }
//   beginPath(): Graphics {
//     this.context.beginPath()
//     return this
//   }
//   moveTo(x: number, y: number): Graphics {
//     this.context.moveTo(x, y)
//     return this
//   }
//   lineTo(x: number, y: number): Graphics {
//     this.context.lineTo(x, y)
//     return this
//   }
//   closePath(): Graphics {
//     this.context.closePath()
//     return this
//   }
//   stroke(c?: string): Graphics {
//     if (c) this.context.strokeStyle = c
//     this.context.stroke()
//     return this
//   }
//   fill(c?: string): Graphics {
//     if (c) this.context.fillStyle = c
//     this.context.fill()
//     return this
//   }
//   get fillStyle(): string {
//     return this.context.fillStyle as string
//   }
//   set fillStyle(c: string) {
//     this.context.fillStyle = c
//   }
//   get strokeStyle(): string {
//     return this.context.strokeStyle as string
//   }
//   set strokeStyle(c: string) {
//     this.context.strokeStyle = c
//   }
//   // createFrame(): Graphics {
//   //   this.zBuffer.fill(0)
//   //   this.colorBuffer.fill(0)
//   //   return this
//   // }
//   // disposeFrame(): Graphics {
//   //   const imageData: ImageData = this.context.getImageData(0, 0, this.width, this.height)
//   //   const data: Uint8ClampedArray = imageData.data
//   //   this.colorBuffer.forEach((x, i) => {
//   //     if (i != 0 && (i + 1) % 4 == 0) return
//   //     data[i] = x
//   //   })
//   //   for (let i = 3; i < data.length; i += 4) {
//   //     data[i] = 255
//   //   }
//   //   // this.context.putImageData(new ImageData(data, width), 0, 0)
//   //   return this
//   // }
//   text(text: string, x: number, y: number): void {
//     this.context.fillText(text, x, y)
//   }
//   rect(x: number, y: number, w: number, h: number) {
//     this.context.fillRect(x, y, w, h)
//   }
//   triangle(
//     x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
//     stroke: boolean = true, fill: boolean = true
//   ): void {
//     // if (!stroke && !fill) return
//     this.beginPath()
//       .moveTo(x1, y1)
//       .lineTo(x2, y2)
//       .lineTo(x3, y3)
//       .closePath()
//       .stroke()
//     // if (stroke) this.stroke()
//     // if (fill) this.fill()
//   }
//   triangleFromInstance(triangle: Triangle): void {
//     this.triangle(triangle.p1.x, triangle.p1.y, triangle.p2.x, triangle.p2.y, triangle.p3.x, triangle.p3.y)
//   }
//   triangleToScreenSpace(triangle: Triangle): Triangle {
//     const width: number = this.width
//     const height: number = this.height
//     return new Triangle(
//       new Vec3(
//         (triangle.p1.x + 1) * 0.5 * width,
//         height - (triangle.p1.y + 1) * 0.5 * height,
//         triangle.p1.z
//       ),
//       new Vec3(
//         (triangle.p2.x + 1) * 0.5 * width,
//         height - (triangle.p2.y + 1) * 0.5 * height,
//         triangle.p2.z
//       ),
//       new Vec3(
//         (triangle.p3.x + 1) * 0.5 * width,
//         height - (triangle.p3.y + 1) * 0.5 * height,
//         triangle.p3.z
//       )
//     )
//   }
//   createProjectionMatrix(fov: number = 90, zNear: number = 0.1, zFar: number = 1000): Matrix {
//     const asp: number = this.aspHW
//     fov = lerp(fov, 0, 360, 0, 2 * Math.PI)
//     const f: number = 1 / Math.tan(fov / 2)
//     const q: number = zFar / (zFar - zNear)
//     return Matrix.FromArr([
//       [asp * f, 0, 0, 0],
//       [0, f, 0, 0],
//       [0, 0, q, 1],
//       [0, 0, -q * zNear, 0]
//     ])
//   }
// }
//# sourceMappingURL=graphics.js.map