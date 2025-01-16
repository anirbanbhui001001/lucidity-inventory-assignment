import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  updateProduct,
} from "../actions/productActions";
import { RootState } from "../store";
import { Product } from "../lib/types";
import { generateUniqueId } from "../utils";

// Shared variable to store data and track fetch status
let fetchedProducts: Product[] | null = null;
let isFetching = false;

const useFetchProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.product.products);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  useEffect(() => {
    if (products.length > 0) {
      return; // No need to fetch again
    }

    if (fetchedProducts) {
      // If products are already fetched, directly dispatch success
      dispatch(fetchProductsSuccess(fetchedProducts));
      return;
    }

    if (!isFetching) {
      isFetching = true; // Mark as fetching to prevent duplicate requests
      dispatch(fetchProductsStart());

      axios
        .get("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
        .then((response) => {
          const productsWithIds = response.data.map((product: Product) => ({
            ...product,
            id: generateUniqueId(),
          }));

          fetchedProducts = productsWithIds; // Cache the result
          dispatch(fetchProductsSuccess(productsWithIds));
        })
        .catch((err) => {
          dispatch(fetchProductsFailure(err));
        })
        .finally(() => {
          isFetching = false; // Reset fetching status
        });
    }
  }, [dispatch]);

  const updateProductList = (updatedProduct: Product[]) => {
    dispatch(updateProduct(updatedProduct));
  };

  return { products, loading, error, updateProductList };
};

export default useFetchProducts;
