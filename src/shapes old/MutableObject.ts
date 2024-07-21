class MutableObject {
  position: Vec3 = vec3.create()
  orientation: Mat4 = mat4.create()

  translate(translation: Vec3): MutableObject {
    vec3.add(this.position, this.position, translation)
    return this
  }

  moveTo(position: Vec3): MutableObject {
    vec3.copy(this.position, position)
    return this
  }

  rotate(axis: Vec3, theta: number): MutableObject {
    mat4.rotate(this.orientation, this.orientation, theta, axis)
    return this
  }

  getRight(): Vec3 {
    return vec3.fromValues(this.orientation[0], this.orientation[1], this.orientation[2])
  }

  getUp(): Vec3 {
    return vec3.fromValues(this.orientation[4], this.orientation[5], this.orientation[6])
  }

  getFront(): Vec3 {
    return vec3.fromValues(this.orientation[8], this.orientation[9], this.orientation[10])
  }

  getWorldMatrix(): Mat4 {
    return mat4.multiply(
      mat4.create(),
      this.orientation,
      mat4.fromTranslation(mat4.create(), this.position)
    )
  }
}