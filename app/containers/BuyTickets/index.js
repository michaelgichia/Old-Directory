/*
 *
 * BuyTickets
 *
 */

import React from "react";
import EventNavBar from "containers/EventNavBar";
import MenuTabsLargeScreen from "components/MenuTabsLargeScreen";
import EventInfoMenu from "components/EventInfoMenu";
import { Form } from "semantic-ui-react";
import "!!style-loader!css-loader!./buy-tickets.css";
import productImage from "./product-banner.jpg";

export class BuyTickets extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <EventNavBar />
        <div className="mobile ticket-image-wrap grid-33">
          <div>
            <img src={productImage} alt="product" />
          </div>
        </div>

        <EventInfoMenu />

        <MenuTabsLargeScreen />

        <div className="ticket-description-wrap">
          <div className="desktop grid-33">
            <div>
              <img src={productImage} alt="product" />
            </div>
          </div>

          <div className="grid-66 price-table">
            <table>
              <tbody>
                <tr>
                  <th>TYPE</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>SUBTOTAL</th>
                </tr>
                <tr>
                  <td>EARLY BIRD</td>
                  <td>KES. 800</td>
                  <td>
                    <input type="number" defaultValue={0} min="0" />
                  </td>
                  <td>KES. 0.00</td>
                </tr>
                <tr>
                  <td>ADVANCE</td>
                  <td>KES. 1500</td>
                  <td>
                    <input type="number" defaultValue={0} min="0" />
                  </td>
                  <td>KES. 0.00</td>
                </tr>
                <tr>
                  <td>GATE</td>
                  <td>KES. 2000</td>
                  <td>
                    <input type="number" defaultValue={0} min="0" />
                  </td>
                  <td>KES. 0.00</td>
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td className="ticket-total">KES. 0.00</td>
                </tr>
              </tbody>
            </table>

            <Form className="pay-tickets">
              <label>SEND TICKETS TO:</label>
              <Form.Group widths={2}>
                <Form.Input placeholder="name" />
                <Form.Input placeholder="phone number" />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input placeholder="email" />
                <Form.Input placeholder="confirm email" />
              </Form.Group>
            </Form>

            <hr className="buy-ticket-optional" />

            <span className="buy-ticket-optional-info">
              OPTIONAL INFORMATION:
            </span>

            <Form className="pay-tickets">
              <label>PROMO CODE (optional)</label>
              <Form.Group widths={2}>
                <Form.Input placeholder="promo code" />
                <div className="payment-btn-wrap">
                  <div>
                    <button className="payment-button">MOBILE PAYMENT</button>
                  </div>
                  <div>
                    <button className="payment-button">CARD PAYMENT</button>
                  </div>
                </div>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyTickets;