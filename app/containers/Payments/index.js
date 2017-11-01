/*
 *
 * Payments
 *
 */

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactModal from "react-modal";
import PaymentInformationForm from "components/Forms/PaymentInformationForm";
import { PaymentButtons } from "components/Buttons";
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
          <div className="information-form">
          <TabPanel>
              <PaymentInformationForm />
          </TabPanel>
          <TabPanel>
            <PaymentInformationForm />
          </TabPanel>
          <TabPanel>
            <PaymentInformationForm />
          </TabPanel>
          </div>
        </Tabs>
        <div className="mookh-btn-wrap">
          <div>
            <PaymentButtons
              id="store"
              bsKlass="secondary shadow"
              label="RETURN TO STORE"
            />
          </div>
          <div>
            <PaymentButtons
              id="nextOne"
              bsKlass="primary shadow"
              label="CONTINUE"
            />
          </div>
        </div>
      </ReactModal>
    );
  }
}

Payments.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(Payments);