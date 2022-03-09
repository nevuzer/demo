import { ApiService } from "./api.service";

export const CustomerService = {
  fetchCustomers() {
    return ApiService.get("users");
  },
};
