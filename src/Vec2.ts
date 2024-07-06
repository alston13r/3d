class Vec2 {
  static iHat: Vec2 = new Vec2(1, 0)
  static jHat: Vec2 = new Vec2(0, 1)

  x: number
  y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  static Add(a: Vec2, b: Vec2): Vec2 {
    a.x += b.x
    a.y += b.y
    return a
  }

  add(v: Vec2): Vec2 {
    return new Vec2(this.x + v.x, this.y + v.y)
  }

  static Sub(a: Vec2, b: Vec2): Vec2 {
    a.x -= b.x
    a.y -= b.y
    return a
  }

  sub(v: Vec2): Vec2 {
    return new Vec2(this.x - v.x, this.y - v.y)
  }

  static Scale(v: Vec2, s: number): Vec2 {
    v.x *= s
    v.y *= s
    return v
  }

  scale(a: number): Vec2 {
    return new Vec2(a * this.x, a * this.y)
  }

  *[Symbol.iterator]() {
    yield this.x
    yield this.y
  }

  mag(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  static Normal(v: Vec2): Vec2 {
    return Vec2.Scale(v, 1 / v.mag())
  }

  normal(): Vec2 {
    return this.scale(1 / this.mag())
  }

  angle(): number {
    return Math.atan2(this.y, this.x)
  }

  static FromAngle(theta: number): Vec2 {
    return new Vec2(Math.cos(theta), Math.sin(theta))
  }

  static Sign(p1: Vec2, p2: Vec2, p3: Vec2): number {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)
  }

  insideTriangle(p1: Vec2, p2: Vec2, p3: Vec2): boolean {
    let d1 = Vec2.Sign(this, p1, p2)
    let d2 = Vec2.Sign(this, p2, p3)
    let d3 = Vec2.Sign(this, p3, p1)
    let hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0)
    let hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0)
    return !(hasNeg && hasPos)
  }

  distanceTo(v: Vec2): number {
    return v.sub(this).mag()
  }

  copy(): Vec2 {
    return new Vec2(this.x, this.y)
  }

  toXY(): [number, number] {
    return [this.x, this.y]
  }

  static CopyFrom(vector: Vec2, target: Vec2): Vec2 {
    vector.x = target.x
    vector.y = target.y
    return vector
  }

  static Dot(a: Vec2, b: Vec2): number {
    return a.x * b.x + a.y * b.y
  }

  dot(v: Vec2): number {
    return Vec2.Dot(this, v)
  }

  static Cross(a: Vec2, b: Vec2): number {
    return a.x * b.y - a.y * b.x
  }

  cross(v: Vec2): number {
    return Vec2.Cross(this, v)
  }

  static Cast(a: Vec2, b: Vec2): Vec2 {
    return b.normal().scale(a.dot(b))
  }

  castOnto(v: Vec2): Vec2 {
    return Vec2.Cast(this, v)
  }
}