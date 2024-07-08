class Vec3 {
  static iHat: Vec3 = new Vec3(1, 0, 0)
  static jHat: Vec3 = new Vec3(0, 1, 0)
  static kHat: Vec3 = new Vec3(0, 0, 1)

  x: number
  y: number
  z: number

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  static Add(a: Vec3, b: Vec3): Vec3 {
    a.x += b.x
    a.y += b.y
    a.z += b.z
    return a
  }

  add(v: Vec3): Vec3 {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z)
  }

  static Sub(a: Vec3, b: Vec3): Vec3 {
    a.x -= b.x
    a.y -= b.y
    a.z -= b.z
    return a
  }

  sub(v: Vec3): Vec3 {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z)
  }

  static Scale(v: Vec3, scalar: number): Vec3 {
    v.x *= scalar
    v.y *= scalar
    v.z *= scalar
    return v
  }

  scale(scalar: number): Vec3 {
    return new Vec3(scalar * this.x, scalar * this.y, scalar * this.z)
  }

  tuple(): [number, number, number] {
    return [this.x, this.y, this.z]
  }

  *[Symbol.iterator]() {
    yield this.x
    yield this.y
    yield this.z
  }

  mag(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
  }

  static Normal(v: Vec3): Vec3 {
    return Vec3.Scale(v, 1 / v.mag())
  }

  normal(): Vec3 {
    return this.scale(1 / this.mag())
  }

  distanceTo(v: Vec3): number {
    return v.sub(this).mag()
  }

  copy(): Vec3 {
    return new Vec3(this.x, this.y, this.z)
  }

  static CopyFrom(vector: Vec3, target: Vec3): Vec3 {
    vector.x = target.x
    vector.y = target.y
    vector.z = target.z
    return vector
  }

  static Dot(a: Vec3, b: Vec3): number {
    return a.x * b.x + a.y * b.y + a.z * b.z
  }

  dot(v: Vec3): number {
    return Vec3.Dot(this, v)
  }

  static Cross(a: Vec3, b: Vec3): Vec3 {
    return new Vec3(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    )
  }

  cross(v: Vec3): Vec3 {
    return Vec3.Cross(this, v)
  }

  project(matrix: Matrix): Vec3 {
    const mat: Matrix = Matrix.FromArr([...this, 1])
    const projectedMat: Matrix = mat.dot(matrix)
    const projectedArr: number[] = projectedMat.toArray()
    const projected: Vec3 = new Vec3(...projectedArr)
    const w: number = projectedArr[3]
    if (w != 0) Vec3.Scale(projected, 1 / w)
    return projected
  }

  static Cast(a: Vec3, b: Vec3): Vec3 {
    return b.normal().scale(a.dot(b))
  }

  castOnto(v: Vec3): Vec3 {
    return Vec3.Cast(this, v)
  }

  static RotateAround(v: Vec3, axis: Vec3, theta: number): Vec3 {
    const cos: number = Math.cos(-theta / 2)
    const sin: number = Math.sin(-theta / 2)

    const q: Quaternion = new Quaternion(cos, axis.normal().scale(sin))
    const qi: Quaternion = q.inverse()

    const p: Quaternion = new Quaternion(0, v)
    const pRot: Quaternion = q.mul(p).mul(qi)
    return Vec3.CopyFrom(v, pRot.imaginary)
  }

  rotateAround(axis: Vec3, theta: number): Vec3 {
    return Vec3.RotateAround(this.copy(), axis, theta)
  }

  static Midpoint(a: Vec3, b: Vec3): Vec3 {
    return a.add(b).scale(0.5)
  }

  midpoint(v: Vec3): Vec3 {
    return Vec3.Midpoint(this, v)
  }
}