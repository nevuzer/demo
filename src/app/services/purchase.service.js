import { ApiService } from "./api.service";

export const PurchaseService = {
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
