import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactModal from "react-modal";
import MookhInput from "components/Forms/MookhInput";
import { PaymentButtons } from "components/Buttons";
import "!!!style-loader!css-loader!./payment-modal.css";

export default class PaymentModal extends React.PureComponent {
  state = {
    showModal: true
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.showModal !== this.state.showModal) {
  //     this.setState(() => ({showModal: nextProps.showModal}))
  //   }
  // }

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
        <form action="/action_page.php" onSubmit={e => e.preventDefault()}>
          <header className="pm-header">Personal information</header>
          <div className="pm-row">
            <MookhInput
              labelName="Full name"
              id="fullName"
              placeholder=""
              wrapClass="payment-input"
              inputError=""
              type="text"
            />
            <MookhInput
              labelName="Phone number"
              id="phoneNumber"
              placeholder=""
              wrapClass="payment-input"
              inputError=""
              type="tel"
            />
          </div>
          <div className="pm-row">
            <MookhInput
              labelName="E-mail address"
              id="fullName"
              placeholder=""
              wrapClass="payment-input"
              inputError=""
              type="email"
            />
            <MookhInput
              labelName="Confirm E-mail address"
              id="phoneNumber"
              placeholder=""
              wrapClass="payment-input"
              inputError=""
              type="email"
            />
          </div>
          <header className="pm-header">Delivery information</header>
          <div className="pm-row">
            <MookhInput
              labelName="Region/location"
              id="location"
              placeholder=""
              wrapClass="payment-input"
              inputError=""
              type="text"
            />
            <MookhInput
              labelName="Street address"
              id="streetAddress"
              placeholder=""
              wrapClass="payment-input"
              inputError=""
              type="text"
            />
          </div>
          <div className="pm-row">
            <MookhInput
              labelName="Apartment/building number"
              id="apartment"
              placeholder=""
              wrapClass="payment-input"
              inputError=""
              type="text"
            />
            <MookhInput
              labelName="Delivery cost estimate"
              id="deliveryCost"
              placeholder=""
              wrapClass="payment-input"
              inputError=""
              type="text"
            />
          </div>
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
        </form>
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