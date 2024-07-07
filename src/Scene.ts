class Scene {
  graphics: Graphics

  nearPlaneDistance: number
  farPlaneDistance: number

  nearPlane: Plane
  farPlane: Plane
  distancePlanes: Plane[]

  leftPlane: Plane
  topPlane: Plane
  rightPlane: Plane
  bottomPlane: Plane
  borderPlanes: Plane[]

  projectionMatrix!: Matrix

  objects: MutableObject[] = []
  camera!: Camera

  constructor(fov: number = 90, nearPlaneDistance: number = 0.1, farPlaneDistance: number = 1000) {
    this.graphics = new Graphics().appendTo(document.body)
    this.nearPlaneDistance = nearPlaneDistance
    this.farPlaneDistance = farPlaneDistance
    this.createCamera(fov, nearPlaneDistance, farPlaneDistance)
    this.nearPlane = new Plane(new Vec3(0, 0, nearPlaneDistance), new Vec3(0, 0, 1))
    this.farPlane = new Plane(new Vec3(0, 0, farPlaneDistance), new Vec3(0, 0, -1))
    this.distancePlanes = [this.nearPlane, this.farPlane]
    this.leftPlane = new Plane(new Vec3(0, 0, 0), new Vec3(1, 0, 0))
    this.topPlane = new Plane(new Vec3(0, 0, 0), new Vec3(0, 1, 0))
    this.rightPlane = new Plane(new Vec3(this.width, 0, 0), new Vec3(-1, 0, 0))
    this.bottomPlane = new Plane(new Vec3(0, this.height, 0), new Vec3(0, -1, 0))
    this.borderPlanes = [this.leftPlane, this.topPlane, this.rightPlane, this.bottomPlane]
  }

  get width(): number {
    return this.graphics.width
  }

  get height(): number {
    return this.graphics.height
  }

  createCamera(fov: number = 90, nearPlane: number = 0.1, farPlane: number = 1000): Scene {
    if (this.camera) {
      const oldCamera: Camera = this.camera
      this.camera = new Camera().translate(oldCamera.position)
      this.camera.orientation = oldCamera.orientation.copy()
    }

    else this.camera = new Camera()

    this.projectionMatrix = this.graphics.createProjectionMatrix(fov, nearPlane, farPlane)
    return this
  }

  clipTriangleAgainstNearFarPlanes(triangle: Triangle): Triangle[] {
    return Plane.ClipTriangle(triangle, this.distancePlanes)
  }

  clipTriangleAgainstBorderPlanes(triangle: Triangle): Triangle[] {
    return Plane.ClipTriangle(triangle, this.borderPlanes)
  }
}