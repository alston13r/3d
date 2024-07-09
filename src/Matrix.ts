class Matrix {
  rows: number
  cols: number
  mat: number[][]

  constructor(rows: number = 4, cols: number = 4) {
    this.rows = rows
    this.cols = cols
    this.mat = new Array(rows).fill(0).map(() => new Array(cols).fill(0))
  }

  static Map(matrix: Matrix, fn: (element?: number, i?: number, j?: number, mat?: Matrix) => number): Matrix {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        matrix.mat[i][j] = fn(matrix.mat[i][j], i, j, matrix)
      }
    }
    return matrix
  }

  static Copy(matrix: Matrix): Matrix {
    return Matrix.Map(new Matrix(matrix.rows, matrix.cols), (e, i, j) => matrix.mat[i as number][j as number])
  }

  copy(): Matrix {
    return Matrix.Copy(this)
  }

  map(fn: (element?: number, i?: number, j?: number, mat?: Matrix) => number): Matrix {
    return Matrix.Map(this.copy(), fn)
  }

  static Dot(matrixA: Matrix, matrixB: Matrix): Matrix {
    return Matrix.Map(new Matrix(matrixA.rows, matrixB.cols), (e, i, j) => {
      let s: number = 0
      for (let k = 0; k < matrixA.cols; k++) s += matrixA.mat[i as number][k] * matrixB.mat[k][j as number]
      return s
    })
  }
  dot(matrix: Matrix): Matrix {
    return Matrix.Dot(this, matrix)
  }

  static Add(matrixA: Matrix, matrixB: Matrix): Matrix
  static Add(matrix: Matrix, x: number): Matrix
  static Add(matrix: Matrix, other: Matrix | number): Matrix {
    if (other instanceof Matrix) return Matrix.Map(matrix, (e, i, j) => (e as number) + other.mat[i as number][j as number])
    return Matrix.Map(matrix, e => (e as number) + other)
  }

  add(matrix: Matrix): Matrix
  add(x: number): Matrix
  add(other: Matrix | number): Matrix {
    // @ts-ignore
    return Matrix.Add(this.copy(), other)
  }

  static Scale(matrix: Matrix, x: number): Matrix {
    return Matrix.Map(matrix, e => (e as number) * x)
  }
  scale(x: number): Matrix {
    return Matrix.Scale(this.copy(), x)
  }

  static Mul(matrixA: Matrix, matrixB: Matrix): Matrix {
    return Matrix.Map(matrixA, (e, i, j) => (e as number) * matrixB.mat[i as number][j as number])
  }
  mul(matrix: Matrix): Matrix {
    return Matrix.Mul(this.copy(), matrix)
  }

  static Sub(matrixA: Matrix, matrixB: Matrix): Matrix
  static Sub(matrix: Matrix, x: number): Matrix
  static Sub(matrix: Matrix, other: Matrix | number): Matrix {
    if (other instanceof Matrix) return Matrix.Add(matrix, other.scale(-1))
    return Matrix.Add(matrix, -other)
  }
  sub(matrix: Matrix): Matrix

  sub(x: number): Matrix
  sub(other: Matrix | number): Matrix {
    // @ts-ignore
    return Matrix.Sub(this.copy(), other)
  }

  static Div(matrixA: Matrix, matrixB: Matrix): Matrix
  static Div(matrix: Matrix, x: number): Matrix
  static Div(matrix: Matrix, other: Matrix | number): Matrix {
    if (other instanceof Matrix) return Matrix.Map(matrix, (e, i, j) => (e as number) / other.mat[i as number][j as number])
    return Matrix.Scale(matrix, 1 / other)
  }
  div(a: Matrix | number): Matrix {
    // @ts-ignore
    return Matrix.Div(this.copy(), a)
  }

  static FromArr(arr: number[][]): Matrix
  static FromArr(arr: number[]): Matrix
  static FromArr(arr: number[][] | number[]): Matrix {
    let matrix: Matrix
    if (arr[0] instanceof Array) {
      matrix = new Matrix(arr.length, arr[0].length)
      matrix.mat = arr as number[][]
    } else {
      matrix = new Matrix(1, arr.length)
      matrix.mat = [arr] as number[][]
    }
    return matrix


    // if (arr[0] instanceof Array) return Matrix.Map(new Matrix(arr.length, arr[0].length), (e, i, j) => (arr as number[][])[i as number][j as number])
    // return Matrix.Map(new Matrix(1, arr.length), (e, i, j) => (arr as number[])[j as number])
  }

  static ToArray(matrix: Matrix): number[] {
    const res: number[] = []
    matrix.map(e => res.push(e as number))
    return res
  }
  toArray(): number[] {
    return Matrix.ToArray(this)
  }

  static To2DArray(matrix: Matrix): number[][] {
    return [...matrix.mat].map(row => [...row])
  }
  to2DArray(): number[][] {
    return Matrix.To2DArray(this)
  }

  static MakeIdentity(size?: number): Matrix
  static MakeIdentity(matrix: Matrix): Matrix
  static MakeIdentity(param: number | Matrix = 4): Matrix {
    if (param instanceof Matrix) return Matrix.Map(param, (e, i, j) => i == j ? 1 : 0)
    return Matrix.MakeIdentity(new Matrix(param, param))
  }

  static Print(matrix: Matrix, text?: string): Matrix {
    if (text != undefined) console.log(`Matrix {${text}}: ${matrix.rows}-${matrix.cols}`)
    console.table(matrix.mat)
    return matrix
  }
  print(text?: string): Matrix {
    return Matrix.Print(this, text)
  }

  static Summate(matrix: Matrix): number {
    let s: number = 0
    matrix.map(e => s += (e as number))
    return s
  }
  summate(): number {
    return Matrix.Summate(this)
  }

  static Randomize(matrix: Matrix, lowerLimit: number = -1, upperLimit: number = 1): Matrix {
    return Matrix.Map(matrix, () => Math.random() * (upperLimit - lowerLimit) + lowerLimit)
  }
  randomize(): Matrix {
    return Matrix.Randomize(new Matrix(this.rows, this.cols))
  }

  static Numerize(matrix: Matrix): Matrix {
    return Matrix.Map(matrix, (e, i, j) => (i as number) * matrix.cols + (j as number))
  }
  numerize(): Matrix {
    return Matrix.Numerize(new Matrix(this.rows, this.cols))
  }

  static Transpose(matrix: Matrix): Matrix {
    const matTemp: number[][] = new Array(matrix.cols).fill(0).map(() => new Array(matrix.rows).fill(0))
    matrix.map((e, i, j) => matTemp[j as number][i as number] = (e as number))
    const rowsTemp: number = matrix.rows
    matrix.rows = matrix.cols
    matrix.cols = rowsTemp
    matrix.mat = matTemp
    return matrix
  }
  transpose(): Matrix {
    return Matrix.Transpose(this.copy())
  }
}