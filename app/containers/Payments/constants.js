/*
 *
 * Payments constants
 *
 */

import { asyncActionType } from "utils/helperFunctions";

// Action Types
export const PAYMENTS_MODAL = asyncActionType("PAYMENTS_MODAL");
export const PAYMENTS_FORM = asyncActionType("PAYMENTS_FORM");
export const TICKET_CATEGORY = asyncActionType("TICKET_CATEGORY");


/*
 * Form validation
 */
const nameRegex = /^[a-zA-Z ]*$/;
const alphanumerical = /^[A-Za-z0-9,\. ]{1,100}$/;
const numerical = /^\d+$/;
const phoneNoRegex = /^\d{12}$/;
const emailRegex = /\S+@\S+\.\S+/;
export const InputConstants = {
  email: { regex: emailRegex, error: "This email address is invalid." },
  confirmEmail: { regex: emailRegex, error: "Emails don't match." },
  name: {
    regex: alphanumerical,
    error: "Please use only letters (a-z), numbers, periods etc."
  },
  phone_number: {
    regex: phoneNoRegex,
    error: "The allowed phone number format is 2547012345678"
  },
  location: {
    regex: alphanumerical,
    error: "The location name format is invalid."
  },
  streetAddress: {
    regex: alphanumerical,
    error: "The street address name format is invalid"
  },
  apartment: {
    regex: alphanumerical,
    error: "The apartment name format is invalid"
  },
  deliveryCost: { regex: numerical, error: "Please use only numbers." }
};
