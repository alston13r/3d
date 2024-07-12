interface IndexedCollection extends Iterable<number> {
  readonly length: number;
  [index: number]: number;
}

declare type Mat2 = IndexedCollection
  | [number, number,
  number, number]
declare type Mat2d = IndexedCollection
  | [number, number,
  number, number,
  number, number]
declare type Mat3 = IndexedCollection
  | [number, number, number,
  number, number, number,
  number, number, number]
declare type Mat4 = IndexedCollection
  | [number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number]

declare type Quat = IndexedCollection
  | [number, number, number, number]
declare type Quat2 = IndexedCollection
  | [number, number, number, number,
  number, number, number, number]

declare type Vec2 = IndexedCollection | [number, number]
declare type Vec3 = IndexedCollection | [number, number, number]
declare type Vec4 = IndexedCollection | [number, number, number, number]




// // prettier-ignore
// declare type ReadonlyMat2 =
//   | readonly [
//     number, number,
//     number, number
//   ]
//   | IndexedCollection;

// // prettier-ignore
// declare type ReadonlyMat2d =
//   | readonly [
//     number, number,
//     number, number,
//     number, number
//   ]
//   | IndexedCollection;

// // prettier-ignore
// declare type ReadonlyMat3 =
//   | readonly [
//     number, number, number,
//     number, number, number,
//     number, number, number
//   ]
//   | IndexedCollection;

// // prettier-ignore
// declare type ReadonlyMat4 =
//   | readonly [
//     number, number, number, number,
//     number, number, number, number,
//     number, number, number, number,
//     number, number, number, number
//   ]
//   | IndexedCollection;

// declare type ReadonlyQuat =
//   | readonly [number, number, number, number]
//   | IndexedCollection;

// declare type ReadonlyQuat2 =
//   | readonly [number, number, number, number, number, number, number, number]
//   | IndexedCollection;

// declare type ReadonlyVec2 = readonly [number, number] | IndexedCollection;
// declare type ReadonlyVec3 = readonly [number, number, number] | IndexedCollection;
// declare type ReadonlyVec4 =
//   | readonly [number, number, number, number]
//   | IndexedCollection;


const matrix = {
  EPSILON: 0.000001,
  ANGLE_ORDER: 'zyx',
  ArrayType: (typeof Float32Array !== undefined) ? Float32Array : Array<number>,
  setMatrixArrayType(type: Float32ArrayConstructor | ArrayConstructor) {
    this.ArrayType = type
  },
  random: Math.random,
  degree: Math.PI / 180,
  radian: 180 / Math.PI,
  toRadian(a: number): number {
    return a * this.degree
  },
  toDegree(a: number) {
    return a * this.radian
  },
  equals(a: number, b: number): boolean {
    return Math.abs(a - b) <= this.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
  }
}