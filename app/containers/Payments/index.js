/*
 *
 * Payments
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactModal from "react-modal";
import PaymentInformationForm from "components/Forms/PaymentInformationForm";
import "!!style-loader!css-loader!./payments.css";


export class Payments extends React.Component {
  state = {
    showModal: true
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={this.handleCloseModal}
        className="Modal"
        overlayClassName="Overlay"
      >
     <Tabs>
        <TabList>
          <Tab>Information</Tab>
          <Tab>Payment</Tab>
          <Tab>Confirmation</Tab>
        </TabList>
        <TabPanel>
          <PaymentInformationForm />
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
      </Tabs>
      </ReactModal>
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
