interface Camera {
  translate(translation: Vec3): Camera
  moveTo(position: Vec3): Camera
  rotate(axis: Vec3, theta: number): Camera
}

class Camera extends MutableObject {
  pointTo(target: Vec3, roll?: number): Camera {
    this.orientation = Matrix.MakeIdentity()

    const diff: Vec3 = target.sub(this.position)
    const yaw: number = Math.atan2(diff.z, diff.x)
    const pitch: number = Math.atan2(diff.y, diff.z)

    this.rotate(Vec3.jHat, yaw)
      .rotate(this.getRight(), pitch)

    if (roll) this.rotate(this.getFront(), roll)

    return this
  }

  createLookAtMatrix(): Matrix {
    return createLookAtMatrix(this.position, this.position.add(this.getFront()), this.getUp())
  }

  createViewMatrix(): Matrix {
    return invertLookAtMatrix(this.createLookAtMatrix())
  }
}