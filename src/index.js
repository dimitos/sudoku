module.exports = function solveSudoku(grid) {
  const size = grid.length;
  const sector = Math.sqrt(size);

  /**
   * Determines whether the cell is 0
   * @param {array} grid the current arrangement of the numbers on the grid
   * @returns coordinates of 0 cell or null
   */
  const getEmpty = (grid) => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (grid[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null;
  };

  /**
   * Сheck the input number and its coordinates
   * @param {number} n number
   * @param {array} pos coordinates of a number
   * @param {array} grid the current arrangement of the numbers on the grid
   * @returns true or false
   */
  const validate = (n, pos, grid) => {
    const [r, c] = pos;

    //rows
    for (let i = 0; i < size; i++) {
      if (i !== r && grid[i][c] === n) {
        return false;
      }
    }

    //columns
    for (let i = 0; i < size; i++) {
      if (i !== c && grid[r][i] === n) {
        return false;
      }
    }

    //where is sector starts
    const boxRow = Math.floor(r / sector) * sector;
    const boxCol = Math.floor(c / sector) * sector;
    for (let i = boxRow; i < boxRow + sector; i++) {
      for (let j = boxCol; j < boxCol + sector; j++) {
        if (grid[i][j] === n && i !== r && j !== c) {
          return false;
        }
      }
    }
    return true;
  };

  /**
   * Recursion. Stop if grid is full
   * @returns false if grid is full
   */
  const init = () => {
    const pos = getEmpty(grid); //get zero element
    if (pos === null) return true; // the end

    for (let i = 1; i < size + 1; i++) {
      if (validate(i, pos, grid)) {
        grid[pos[0]][pos[1]] = i;
        if (init()) return true;
        grid[pos[0]][pos[1]] = 0;
      }
    }
    return false;
  };

  init();
  return grid;
};
