import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import 'react-tabs/style/react-tabs.css';
import "!!!style-loader!css-loader!./payment-tabs.css";

export default class PaymentTabs extends React.PureComponent {
  render() {
    return(
      <Tabs>
        <TabList>
          <Tab>1. Information</Tab>
          <Tab>2. Payment</Tab>
          <Tab>3. Confirmation</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
      </Tabs>
    );
  }
}
