class SudokuChecker {

  getNumsList (length) {
    const nums = {}
    for (let i=1; i<=length; i++) nums[i] = 0
    return nums 
  }

  isCorrect (list) {
    const checkList = this.getNumsList(list.length)
    list.forEach(num => checkList[num]++)
    return Object.values(checkList).every(x => x == 1)
  }

  getRow (matrix, row) {
    return matrix[row]
  }

  getColumn (matrix, col) {
    return matrix.map(row => row[col])
  }

  getBox (matrix, box) {
    const procNum = Math.sqrt(matrix.length)
    const topRow = Math.floor(box/procNum) * procNum
    const sliceFrom = (box % procNum) * procNum
    let boxNums = []
    for (let i=0; i<procNum; i++) {
      boxNums = boxNums.concat(matrix[topRow + i].slice(sliceFrom, sliceFrom + procNum))
    }
    return boxNums
  }

  checkLists (matrix, type, unit=0) {
    const pass = this.isCorrect(this[`get${type}`](matrix, unit))
    if (!pass) return false
    if (unit == matrix.length-1) return pass
    return this.checkLists(matrix, type, ++unit)
  }

  checkAll (matrix) {
    const types = ['Row', 'Column', 'Box']
    return types.map(t => this.checkLists(matrix, t)).every(x => x === true)
  }

}
