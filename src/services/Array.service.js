// @flow
const getLowestEmptyCellIndex = (column: Array<number>): ?number => {
  if (column[0] > 0) return null;
  let lowestCellIndex;
  for (let index = column.length - 1; index >= 0; index--) {
    if (column[index] <= 0) {
      lowestCellIndex = index;
      break;
    }
  }
  return lowestCellIndex;
};

export default getLowestEmptyCellIndex;
