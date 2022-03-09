import { addMonths, format } from "date-fns";
import { calculatePoints } from "./calculatePoints";

/**
 * Get purchases by month
 * @param {array} purchases
 * @param {number} month
 * @returns {array}
 */
export const getPurchasesByMonth = (purchases, month) => {
  return purchases.filter(
    (purchase) =>
      format(addMonths(new Date(), month || 0), "yyyy-MM") ===
      format(new Date(purchase.date), "yyyy-MM")
  );
};

/**
 * Calculate customer purchases by month
 * @param {array} purchases
 * @param {number} month
 * @returns {object} sum, points and transaction
 */
export const calculateCustomerPurchasesByMonth = (purchases, month) => {
  const data = {
    sum: 0,
    points: 0,
    transactions: 0,
  };

  getPurchasesByMonth(purchases, month).map((purchase) => {
    data.sum += purchase.price;
    data.points += calculatePoints(purchase.price);
    data.transactions++;
    return purchase;
  });

  return data;
};

/**
 * Get purchases sorted by customer id
 * @param {array} customers
 * @param {array} purchases
 * @returns {array}
 */
export const getPurchasesSortedByCustomerId = (customers, purchases) => {
  const sortedByCustomerId = customers.map((customer) => ({
    customerId: customer.id,
    customer: customer.name,
    month1: {
      sum: 0,
      points: 0,
      transactions: 0,
    },
    month2: {
      sum: 0,
      points: 0,
      transactions: 0,
    },
    month3: {
      sum: 0,
      points: 0,
      transactions: 0,
    },
  }));

  purchases.map((purchase) => {
    switch (format(new Date(purchase.date), "yyyy-MM")) {
      // current month
      case format(addMonths(new Date(), 0), "yyyy-MM"):
        updateCustomerData(sortedByCustomerId, purchase, 0);
        break;
      // month -1
      case format(addMonths(new Date(), -1), "yyyy-MM"):
        updateCustomerData(sortedByCustomerId, purchase, -1);
        break;
      // month -2
      case format(addMonths(new Date(), -2), "yyyy-MM"):
        updateCustomerData(sortedByCustomerId, purchase, -2);
        break;
      default:
        break;
    }
    return purchase;
  });

  return sortedByCustomerId;
};

/**
 * Update customer data
 * @param {object} sortedByCustomerId
 * @param {array} purchases
 * @param {number} month
 */
const updateCustomerData = (sortedByCustomerId, purchase, month) => {
  const customerData = sortedByCustomerId.find(
    (item) => item.customerId === purchase.userId
  );
  if (customerData) {
    const monthLabel = "month" + (Math.abs(month) + 1);
    customerData[monthLabel].sum += purchase.price;
    customerData[monthLabel].points += calculatePoints(purchase.price);
    customerData[monthLabel].transactions++;
  }
};

/**
 * Get three months details
 * @param {object} customerData
 * @returns {object} sum, points and transactions
 */
export const getThreeMonthsDetails = (customerData) => {
  return {
    transactions:
      customerData.month1.transactions +
      customerData.month2.transactions +
      customerData.month3.transactions,
    sum:
      customerData.month1.sum +
      customerData.month2.sum +
      customerData.month3.sum,
    points:
      customerData.month1.points +
      customerData.month2.points +
      customerData.month3.points,
  };
};
