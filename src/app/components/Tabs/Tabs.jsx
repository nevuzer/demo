import { useState } from "react";
import { Tabs as MUITabs, Tab } from "@mui/material";
import { TabPanel } from "app/components/TabPanel/TabPanel";
import { AllCustomersContainer } from "app/components/AllCustomersContainer/AllCustomersContainer";
import { OneCustomerContainer } from "../OneCustomerContainer/OneCustomerContainer";

export const Tabs = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => setValue(newValue);

  return (
    <>
      <MUITabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="One customer" id="simple-tab-0" />
        <Tab label="All customers" id="simple-tab-1" />
        <Tab label="With error" id="simple-tab-2" />
      </MUITabs>
      <TabPanel value={value} index={0}>
        <OneCustomerContainer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AllCustomersContainer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AllCustomersContainer withError />
      </TabPanel>
    </>
  );
};
