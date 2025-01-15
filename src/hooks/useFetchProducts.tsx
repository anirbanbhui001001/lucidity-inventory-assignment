import { useState, useEffect } from "react";
import axios from "axios";
import { generateUniqueId } from "../utils"; // Import the helper function

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the products initially
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
        );

        // Add unique id to each product
        const productsWithIds = response.data.map((product) => ({
          ...product,
          id: generateUniqueId(),
        }));

        setProducts(productsWithIds);
      } catch (error) {
        setError(error);
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Method to update a specific product in the list
  const updateProduct = (updatedProduct) => {
    setProducts(updatedProduct);
  };

  return { products, loading, error, updateProduct };
};

export default useFetchProducts;
