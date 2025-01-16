import { useState, useMemo } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import {
  EditOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Product } from "../lib/types";
import EditProductModal from "./EditProductModal";

interface Table {
  adminView?: boolean;
  userView?: boolean;
}

export default function Table({ adminView, userView }: Table) {
  const { products, updateProductList } = useFetchProducts();
  const [editProductId, setEditProductId] = useState("");

  if (!products) return null;

  // Disable action buttons if user view is enabled and admin view is disabled
  const disableAllActionBtn = useMemo(
    () => userView && !adminView,
    [userView, adminView]
  );

  const handleDelete = (id: string) => {
    updateProductList(products.filter((product: Product) => product.id !== id));
  };

  const handleDisable = (id: string) => {
    updateProductList(
      products.map((product: Product) =>
        product.id === id
          ? { ...product, isDisabled: !product.isDisabled }
          : product
      )
    );
  };

  const handleEditProduct = (id: string) => {
    setEditProductId(id);
  };

  const onCancel = () => {
    setEditProductId("");
  };

  return (
    <>
      <table className="table-auto w-full bg-tableBgColor shadow rounded-xl">
        <thead>
          <tr className="bg-tableColor text-customTextColor text-left border-b border-customGreen">
            <th className="px-4 py-4">
              <span className="bg-tableHeaderTextBgColor p-2 text-xs  rounded-xl">
                Name
              </span>
            </th>
            <th className="px-4 py-2">
              <span className="bg-tableHeaderTextBgColor p-2 text-xs  rounded-xl">
                Price
              </span>
            </th>
            <th className="px-4 py-2">
              <span className="bg-tableHeaderTextBgColor p-2 text-xs  rounded-xl">
                Quantity
              </span>
            </th>
            <th className="px-4 py-2">
              <span className="bg-tableHeaderTextBgColor p-2 text-xs  rounded-xl">
                Category
              </span>
            </th>
            <th className="px-4 py-2">
              <span className="bg-tableHeaderTextBgColor p-2 text-xs  rounded-xl">
                Value
              </span>
            </th>
            <th className="px-4 py-2">
              <span className="bg-tableHeaderTextBgColor p-2 text-xs  rounded-xl">
                Actions
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: Product) => (
            <tr
              key={product.id}
              className={
                product.isDisabled
                  ? "text-disableTextColor text-xs border-b border-customGreen"
                  : "text-white text-xs border-b border-customGreen"
              }
            >
              <td className="px-4 py-4">{product.name}</td>
              <td className="px-4 py-4">{product.price}</td>
              <td className="px-4 py-4">{product.quantity}</td>
              <td className="px-4 py-4">{product.category}</td>
              <td className="px-4 py-4">{product.value}</td>
              <td className="px-4 py-4">
                <button
                  className="text-green-600 mr-2"
                  onClick={() => handleEditProduct(product.id)}
                  disabled={product.isDisabled || disableAllActionBtn}
                >
                  <EditOutlined />
                </button>
                <button
                  className="text-blue-600 mr-2"
                  onClick={() => handleDisable(product.id)}
                  disabled={disableAllActionBtn}
                >
                  {product.isDisabled ? (
                    <EyeInvisibleOutlined />
                  ) : (
                    <EyeOutlined />
                  )}
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(product.id)}
                  disabled={product.isDisabled || disableAllActionBtn}
                >
                  <DeleteOutlined />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditProductModal id={editProductId} onCancel={onCancel} />
    </>
  );
}
