import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Select } from "app/components/Select/Select";
import { CustomerService } from "app/services/customer.service";
import { Loader } from "app/components/Loader/Loader";
import { PurchasesDetailsByCustomerTable } from "app/components/PurchasesDetailsByCustomerTable/PurchasesDetailsByCustomerTable";
import { AllTransactionOneCustomerTable } from "app/components/AllTransactionOneCustomerTable/AllTransactionOneCustomerTable";
import { calculateCustomerPurchasesByMonth } from "app/shared/functions/purchases";
import styles from "./OneCustomerContainer.module.css";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const OneCustomerContainer = () => {
  const [value, setValue] = useState("");
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingPurchases, setIsLoadingPurchases] = useState(false);
  const [isError, setIsError] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const changeCustomer = (e) => {
    const value = e.target.value;
    setValue(value);
    fetchPurchases(value);
  };

  const fetchPurchases = (customerId) => {
    setIsLoadingPurchases(true);
    CustomerService.fetchPurchasesByCustomerId(customerId)
      .then((response) => {
        setPurchases(response);
        setIsLoadingPurchases(false);
        setIsError(false);
      })
      .catch(() => {
        setIsLoadingPurchases(false);
        setIsError(true);
      });
  };

  const findCustomerNameById = (customerId) => {
    const customerObject = customers.find(
      (customer) => customer.id === customerId
    );
    return customerObject ? customerObject.name : "";
  };

  useEffect(() => {
    setIsLoadingCustomers(true);
    CustomerService.fetchCustomers()
      .then((response) => {
        setIsLoadingCustomers(false);
        setCustomers(response);
      })
      .catch(() => {
        setIsLoadingCustomers(false);
        setIsError(true);
      });
  }, []);

  return (
    <>
      {!isLoadingCustomers && (
        <Select
          label={"Customer"}
          options={customers.map((customer) => ({
            id: customer.id,
            label: customer.name,
          }))}
          onChange={changeCustomer}
          value={value}
          disabled={isLoadingPurchases}
        />
      )}
      <Box className={styles.tableContainer}>
        {(isLoadingPurchases || isLoadingCustomers) && (
          <Loader message="Please wait..." />
        )}
        {!isLoadingPurchases && purchases.length !== 0 && !isError && (
          <>
            <PurchasesDetailsByCustomerTable
              data={[
                {
                  customer: findCustomerNameById(value),
                  customerId: value,
                  month1: calculateCustomerPurchasesByMonth(purchases, 0),
                  month2: calculateCustomerPurchasesByMonth(purchases, -1),
                  month3: calculateCustomerPurchasesByMonth(purchases, -2),
                },
              ]}
            />
            <AllTransactionOneCustomerTable purchases={purchases} />
          </>
        )}
        {isError && (
          <ErrorMessage message={"Something went wrong, try again"} />
        )}
      </Box>
    </>
  );
};
