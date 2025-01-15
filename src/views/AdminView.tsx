import React, { useState, useEffect } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import { ShoppingCartOutlined } from '@ant-design/icons';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  isDisabled: boolean;
};

const AdminView = () => {
  const { products, loading, error, updateProduct } = useFetchProducts();

  if (!products) {
    return;
  }

  const handleDelete = (id: string) => {
    console.log(
      products.filter((product) => product.id !== id),
      id
    );
    updateProduct(products.filter((product) => product.id !== id));
  };

  const handleDisable = (id: string) => {
    updateProduct(
      products.map((product) =>
        product.id === id
          ? { ...product, isDisabled: !product.isDisabled }
          : product
      )
    );
  };

  const totalProducts = products.length;
  const totalStoreValue = products.reduce(
    (acc, product) =>
      acc +
      parseFloat(product.price.replace("$", "")) * Number(product.quantity),
    0
  );
  const outOfStock = products.filter(
    (product) => product.quantity === 0
  ).length;
  const uniqueCategories = new Set(products.map((product) => product.category))
    .size;

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4 text-white">Inventory stats</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-green-900 text-white p-4 shadow rounded ">
          <div className="flex gap-2">
            <ShoppingCartOutlined className="text-xl text-white" />
            <p className="text-sm">Total Products</p>
          </div>
          
          <p className="text-2xl mt-2 font-bold">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <p className="text-lg font-semibold">Total Store Value</p>
          <p className="text-2xl font-bold">${totalStoreValue}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <p className="text-lg font-semibold">Out of Stock</p>
          <p className="text-2xl font-bold">{outOfStock}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <p className="text-lg font-semibold">Categories</p>
          <p className="text-2xl font-bold">{uniqueCategories}</p>
        </div>
      </div>

      <table className="table-auto w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
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
                  Edit
                </button>
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

export default AdminView;
