/*
 *
 * Payments
 *
 */

import React, { PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import "!!style-loader!css-loader!./payments.css";

export class Payments extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
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

Payments.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// const mapStateToProps = createStructuredSelector({
//   Payments: makeSelectPayments(),
// });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Payments);
