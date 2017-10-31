import React from "react";
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
          <div>
            <PaymentButtons
              id="store"
              bsKlass="secondary shadow"
              label="RETURN TO STORE"
            />
           <PaymentButtons
              id="nextOne"
              bsKlass="primary shadow"
              label="CONTINUE"
           />
          </div>
        </form>
      </ReactModal>
    );
  }
}