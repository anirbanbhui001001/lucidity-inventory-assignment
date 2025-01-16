// actions/productActions.ts
import { Product } from "../lib/types";
export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const fetchProductsStart = () => ({
  type: FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = (products: Product[]) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error: unknown) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const updateProduct = (updatedProduct: Product[]) => ({
  type: UPDATE_PRODUCT,
  payload: updatedProduct,
});
