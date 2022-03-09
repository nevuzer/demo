import { ApiService } from "./api.service";

export const CustomerService = {
  fetchCustomers() {
    return ApiService.get("users");
  },

  fetchPurchases() {
    return ApiService.get("purchases");
  },

  fetchPurchasesWithWrongEndpoint() {
    return ApiService.get("purchasessss");
  },

  fetchPurchasesByCustomerId(customerId) {
    // filter should be done on the server side
    return ApiService.get("purchases").then((response) =>
      response.filter((purchase) => purchase.userId === customerId)
    );
  },
};
