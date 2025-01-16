// reducers/productReducer.ts
import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  UPDATE_PRODUCT,
} from "../actions/productActions";
import { Product } from "../lib/types";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: unknown | null;
}

const initialState: ProductState = {
  products: [],
  loading: true,
  error: null,
};

const productReducer = (state = initialState, action: any): ProductState => {
  switch (action.type) {
    case FETCH_PRODUCTS_START:
      return { ...state, loading: true };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_PRODUCT:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export default productReducer;
