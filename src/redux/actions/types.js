import { asyncAction } from "../utils";

export const SIGNUP = asyncAction("signup");
export const LOGIN = asyncAction("login");
export const FORGET_PASSWORD = asyncAction("forget_password");
export const CHANGE_PASSWORD = asyncAction("change_password");

export const GET_USER_DETAILS = asyncAction("get_user_details");
export const ADD_CARD_DETAILS = asyncAction("add_card_details");
export const GET_CARD_DETAILS = asyncAction("get_card_details");
export const DELETE_CARD_DETAILS = asyncAction("delete_card_details");

export const GET_ADDRESS_DETAILS = asyncAction("get_address_details");
export const ADD_ADDRESS_DETAILS = asyncAction("add_address_details");
export const EDIT_ADDRESS_DETAILS = asyncAction("edit_address_details");
export const DELETE_ADDRESS_DETAILS = asyncAction("delete_address_details");

export const GET_CATEGORY = asyncAction("get_category");
export const GET_PROMOTIONS = asyncAction("get_promotions");

export const ADD_REVIEW = asyncAction("add_review");
export const EDIT_REVIEW = asyncAction("edit_review");
export const GET_REVIEW = asyncAction("get_review");

export const GET_NEW_SHOP = asyncAction("get_new_shop");
export const GET_ALL_SHOP = asyncAction("get_all_shop");

export const GET_SHOP_PRODUCTS = asyncAction("get_shop_products");
