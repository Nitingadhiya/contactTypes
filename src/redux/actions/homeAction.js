import {
  GET_CATEGORY,
  ADD_REVIEW,
  GET_NEW_SHOP,
  GET_ALL_SHOP,
  GET_SHOP_PRODUCTS
} from "./types";
//import Api from '../../api';

export const getCategoryRequest = () => {
  return {
    type: GET_CATEGORY.REQ,
    constant: GET_CATEGORY,
    api: Api.getCategory
  };
};

export const addReviewRequest = params => {
  return {
    type: ADD_REVIEW.REQ,
    params,
    constant: ADD_REVIEW,
    api: Api.addReview
  };
};

export const getNewShopRequest = params => {
  return {
    type: GET_NEW_SHOP.REQ,
    params,
    constant: GET_NEW_SHOP,
    api: Api.getNewShop
  };
};

export const getAllShopRequest = params => {
  return {
    type: GET_ALL_SHOP.REQ,
    params,
    constant: GET_ALL_SHOP,
    api: Api.getAllShop
  };
};

export const getShopProductsRequest = params => {
  return {
    type: GET_SHOP_PRODUCTS.REQ,
    params,
    constant: GET_SHOP_PRODUCTS,
    api: Api.getShopProducts
  };
};
