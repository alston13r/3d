class Cube {
  static FrontBottomLeft = vec3.fromValues(-1, -1, 1)
  static FrontTopLeft = vec3.fromValues(-1, 1, 1)
  static FrontTopRight = vec3.fromValues(1, 1, 1)
  static FrontBottomRight = vec3.fromValues(1, -1, 1)

  static BackBottomLeft = vec3.fromValues(-1, -1, -1)
  static BackTopLeft = vec3.fromValues(-1, 1, -1)
  static BackTopRight = vec3.fromValues(1, 1, -1)
  static BackBottomRight = vec3.fromValues(1, -1, -1)

  static FrontFace = [
    ...this.FrontBottomLeft, ...this.FrontBottomRight,
    ...this.FrontTopRight, ...this.FrontTopLeft]
  static BackFace = [
    ...this.BackBottomLeft, ...this.BackTopLeft,
    ...this.BackTopRight, ...this.BackBottomRight]
  static TopFace = [
    ...this.BackTopLeft, ...this.FrontTopLeft,
    ...this.FrontTopRight, ...this.BackTopRight]
  static BottomFace = [
    ...this.BackBottomLeft, ...this.BackBottomRight,
    ...this.FrontBottomRight, ...this.FrontBottomLeft]
  static RightFace = [
    ...this.BackBottomRight, ...this.BackTopRight,
    ...this.FrontTopRight, ...this.FrontBottomRight]
  static LeftFace = [
    ...this.BackBottomLeft, ...this.FrontBottomLeft,
    ...this.FrontTopLeft, ...this.BackTopLeft]

  static Positions = [
    ...this.FrontFace,
    ...this.BackFace,
    ...this.TopFace,
    ...this.BottomFace,
    ...this.RightFace,
    ...this.LeftFace
  ]

  static Indices = [
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23
  ]

  static VertexCount = this.Indices.length

  positionMat = mat4.create()
  orientationMat = mat4.create()
  scaleMat = mat4.create()

  constructor(position: Vec3 = [0, 0, 0]) {
    this.positionMat = mat4.fromTranslation(this.positionMat, position)
  }

  getModelView(): Mat4 {
    const modelView = mat4.create()
    mat4.multiply(
      modelView,
      modelView,
      this.positionMat
    )
    mat4.multiply(
      modelView,
      modelView,
      this.orientationMat
    )
    return modelView
  }

  translate(translation: Vec3): Cube {
    mat4.translate(this.positionMat, this.positionMat, translation)
    return this
  }

  rotate(rad: number, axis: Vec3): Cube {
    mat4.rotate(this.orientationMat, this.orientationMat, rad, axis)
    return this
  }
}