/*
 *
 * BuyTickets
 *
 */

import React from "react";
import MenuTabsLargeScreen from "components/MenuTabsLargeScreen";
import { Button, Form, Menu } from "semantic-ui-react";
import "!!style-loader!css-loader!./buy-tickets.css";
import productImage from "./product-banner.jpg";

export class BuyTickets extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <div className="mobile ticket-image-wrap grid-33">
          <div>
            <img src={productImage} alt="product" />
          </div>

          <div className="ticket-title">
            <h4>TEDx LAVINGTON WOMEN: INDEPENDENT EVENT</h4>
          </div>
        </div>

        <div className="buy-ticket-information lg-screen">
          <h5>FRIDAY 28 OCT 17:00-23:00 // 15 DAYS TO GO</h5>
          <h5>
            BRAEBURN THEATER OFF GITANGA // <a href="">GET DIRECTIONS</a>
          </h5>
        </div>

        <Menu className="mobile" pointing secondary fluid widths={3}>
          <Menu.Item
            name="BUY TICKETS"
            active={activeItem === "BUY TICKETS"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="EVENT INFO"
            active={activeItem === "EVENT INFO"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="GALLERY"
            active={activeItem === "GALLERY"}
            onClick={this.handleItemClick}
          />
        </Menu>

        <MenuTabsLargeScreen />

        <div className="ticket-description-wrap">
          <div className="desktop grid-33">
            <div>
              <img src={productImage} alt="product" />
            </div>
          </div>

          <div className="grid-66 price-table">
            <table className="mobile">
              <tbody>
                <tr>
                  <th>TYPE</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                </tr>
                <tr>
                  <td>EARLY BIRD</td>
                  <td>KES. 800</td>
                  <td>
                    <input type="number" defaultValue={0} min="0" />
                  </td>
                </tr>
                <tr>
                  <td>Sub-total</td>
                  <td />
                  <td>KES. 0.00</td>
                </tr>
                <tr>
                  <td>EARLY BIRD EARLY BIRD</td>
                  <td>KES. 800</td>
                  <td>
                    <input type="number" defaultValue={0} min="0" />
                  </td>
                </tr>
                <tr>
                  <td>Sub-total</td>
                  <td />
                  <td>KES. 0.00</td>
                </tr>
                <tr>
                  <td>EARLY BIRD EARLY BIRD</td>
                  <td>KES. 800</td>
                  <td>
                    <input type="number" defaultValue={0} min="0" />
                  </td>
                </tr>
                <tr>
                  <td>Sub-total</td>
                  <td />
                  <td>KES. 0.00</td>
                </tr>
                <tr>
                  <td>TOTAL</td>
                  <td />
                  <td className="ticket-total">KES. 0.00</td>
                </tr>
              </tbody>
            </table>

            <table className="desktop-tablet">
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
                  <td className="ticket-total">Total KES. 0.00</td>
                </tr>
              </tbody>
            </table>

            <Form className="pay-tickets">
              <label>SEND TICKECTS TO:</label>
              <Form.Group widths={2}>
                <Form.Input placeholder="name" />
                <Form.Input placeholder="email" />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input placeholder="phone number" />
                <Form.Input placeholder="cornfirm email" />
              </Form.Group>
            </Form>

            <Form className="pay-tickets">
              <label>PROMO CODE (optional)</label>
              <Form.Group widths={2}>
                <Form.Input placeholder="promo code" />
                <div className="payment-btn-wrap">
                  <div>
                    <Button className="btn-payment" fluid>
                      MOBILE PAYMENT
                    </Button>
                  </div>
                  <div>
                    <Button className="btn-payment" fluid>
                      CARD PAYMENT
                    </Button>
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
