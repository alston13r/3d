class MutableShape {
  mesh: Mesh

  position: Vec3 = new Vec3()
  scale: Vec3 = new Vec3(1, 1, 1)
  orientation: Matrix = Matrix.MakeIdentity()

  constructor(points: Vec3[], triangles: [number, number, number][]) {
    this.mesh = new Mesh(points)
      .generateTriangles(triangles)
      .generateNormals()
  }

  centerPoints(): MutableShape {
    this.mesh.centerPoints()
    return this
  }

  translate(translation: Vec3): MutableShape {
    Vec3.Add(this.position, translation)
    return this
  }

  moveTo(position: Vec3): MutableShape {
    Vec3.CopyFrom(this.position, position)
    return this
  }

  rotate(axis: Vec3, theta: number): MutableShape {
    Matrix.Dot(this.orientation, createRotMatQuaternion(axis, theta))
    return this
  }

  stretch(x: number = 1, y: number = 1, z: number = 1): MutableShape {
    this.scale.x *= x
    this.scale.y *= y
    this.scale.z *= z
    return this
  }

  applyMatrices(matrices?: MutationMatrices): Mesh {
    return this.mesh.applyMatrices({
      camera: matrices?.camera,
      scale: Matrix.FromArr([
        [this.scale.x, 0, 0, 0],
        [0, this.scale.y, 0, 0],
        [0, 0, this.scale.z, 0],
        [0, 0, 0, 1]
      ]),
      translation: createTranslationMat(this.position),
      rotation: this.orientation
    })
  }
}