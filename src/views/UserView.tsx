import React, { useState, useEffect } from "react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  isDisabled: boolean;
};

const UserView = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">User View</h1>

      <table className="table-auto w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className={product.isDisabled ? "bg-gray-100" : ""}
            >
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-red-600 hover:underline mr-2"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleDisable(product.id)}
                  disabled={product.isDisabled}
                >
                  {product.isDisabled ? "Enable" : "Disable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserView;
