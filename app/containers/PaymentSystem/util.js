import { orderStatus } from "./constants";

export const paymentButtonRipplesState = state => {
  let initialState = {
    name: "PAY NOW",
    state: false
  };
  let newState;
  switch (state) {
    case orderStatus.inProgress:
      newState = {
        name: "IN PROGESS...",
        state: true
      };
      break;
    case orderStatus.pending:
    case orderStatus.created:
      newState = {
        name: "ORDER PLACED...",
        state: true
      };
      break;
    case orderStatus.cardFailure:
    case orderStatus.failure:
      newState = {
        name: "FAILED",
        state: false
      };
      break;
    case orderStatus.paid:
    case orderStatus.notCreated:
      newState = initialState;
      break;
    default:
      newState = initialState;
      break;
  }

  return newState;
};

export const mpesaPushStatus = state => {
  let initialState = {
    name: "PAY NOW",
    state: false
  };
  let newState;
  switch (state) {
    case orderStatus.inProgress:
      newState = {
        name: "IN PROGESS...",
        state: true
      };
      break;
    case orderStatus.created:
      newState = {
        name: "ORDER PLACED...",
        state: true
      };
      break;
    case orderStatus.pending:
      newState = {
        name: "ORDER PLACED...",
        state: true
      };
      break;
    case orderStatus.failure:
      newState = {
        name: "FAILED",
        state: false
      };
      break;
    case orderStatus.paid:
    case orderStatus.notCreated:
      newState = initialState;
      break;
    default:
      newState = initialState;
      break;
  }

  return newState;
};
