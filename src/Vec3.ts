class Vec3 {
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
      a.z * b.x * a.x * b.z,
      a.x * b.y - a.y * b.x
    )
  }

  cross(v: Vec3): Vec3 {
    return Vec3.Cross(this, v)
  }

  applyMatrices(matrices: MutationMatrices): Vec3 {
    matrices.identity ||= Matrix.MakeIdentity()
    matrices.scale ||= Matrix.MakeIdentity()
    matrices.rotation ||= Matrix.MakeIdentity()
    matrices.orbital ||= Matrix.MakeIdentity()
    matrices.translation ||= Matrix.MakeIdentity()

    const vecMat: Matrix = Matrix.FromArr([this.x, this.y, this.z, 1])

    const mutated: Matrix = vecMat
      .dot(matrices.identity)
      .dot(matrices.scale)
      .dot(matrices.rotation)
      .dot(matrices.orbital)
      .dot(matrices.translation)

    return new Vec3(...mutated.toArray())
  }
}