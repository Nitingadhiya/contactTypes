import {
  GET_USER_DETAILS,
  ADD_CARD_DETAILS,
  GET_CARD_DETAILS,
  DELETE_CARD_DETAILS,
  ADD_ADDRESS_DETAILS,
  EDIT_ADDRESS_DETAILS,
  GET_ADDRESS_DETAILS,
  DELETE_ADDRESS_DETAILS
} from "./types";
//import Api from '../../api';

export const getUserDetailsRequest = params => {
  return {
    type: GET_USER_DETAILS.REQ,
    params,
    constant: GET_USER_DETAILS,
    api: Api.getUserDetails
  };
};

export const addCardDetailsRequest = params => {
  return {
    type: ADD_CARD_DETAILS.REQ,
    params,
    constant: ADD_CARD_DETAILS,
    api: Api.addCardsDetails
  };
};

export const getCardDetailsRequest = params => {
  return {
    type: GET_CARD_DETAILS.REQ,
    params,
    constant: GET_CARD_DETAILS,
    api: Api.getCardDetails
  };
};

export const deleteCardDetailsRequest = params => {
  return {
    type: DELETE_CARD_DETAILS.REQ,
    params,
    constant: DELETE_CARD_DETAILS,
    api: Api.deleteCardDetails
  };
};

export const addAddressDetailsRequest = params => {
  return {
    type: ADD_ADDRESS_DETAILS.REQ,
    params,
    constant: ADD_ADDRESS_DETAILS,
    api: Api.addAddressDetails
  };
};

export const editAddressDetailsRequest = params => {
  return {
    type: EDIT_ADDRESS_DETAILS.REQ,
    params,
    constant: EDIT_ADDRESS_DETAILS,
    api: Api.editAddressDetails
  };
};

export const deleteAddressDetailsRequest = params => {
  return {
    type: DELETE_ADDRESS_DETAILS.REQ,
    params,
    constant: DELETE_ADDRESS_DETAILS,
    api: Api.deleteAddressDetails
  };
};

export const getAddressDetailsRequest = params => {
  return {
    type: GET_ADDRESS_DETAILS.REQ,
    params,
    constant: GET_ADDRESS_DETAILS,
    api: Api.getAddressDetails
  };
};
