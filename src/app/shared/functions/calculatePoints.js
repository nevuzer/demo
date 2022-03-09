/**
 * Calculate points
 * @param {number} price
 * @returns {number}
 */
export const calculatePoints = (price) => {
  let points = 0;
  if (!isNaN(price)) {
    if (price > 50) {
      const _points = Math.floor(price) - 50;
      points = _points > 50 ? 50 : _points;
    }
    if (price > 100) {
      points += (Math.floor(price) - 100) * 2;
    }
  }

  return points;
};
