import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import 'react-tabs/style/react-tabs.css';
import "!!!style-loader!css-loader!./payment-tabs.css";

export default class PaymentTabs extends React.PureComponent {
  render() {
    return(
      <Tabs>
        <TabList>
          <Tab>Information</Tab>
          <Tab>Payment</Tab>
          <Tab>Confirmation</Tab>
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
