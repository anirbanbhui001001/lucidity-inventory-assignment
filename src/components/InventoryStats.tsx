import Card from "../components/Cards";
import useFetchProducts from "../hooks/useFetchProducts";
import { useMemo } from "react";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  StopOutlined,
  GroupOutlined,
} from "@ant-design/icons";
import { Product } from "../lib/types";

export default function InventoryStats() {
  const { products } = useFetchProducts();

  if (!products) return <></>;

  // Filter out disabled products once and use for other calculations
  const activeProducts = products.filter((product) => !product.isDisabled);

  // Use useMemo for performance optimization to prevent recalculating on every render
  const totalProducts = useMemo(() => activeProducts.length, [activeProducts]);

  const totalStoreValue = useMemo(() => {
    return activeProducts.reduce((acc, product) => {
      return (
        acc + parseFloat(product.price.replace("$", "")) * product.quantity
      );
    }, 0);
  }, [activeProducts]);

  const outOfStock = useMemo(
    () =>
      products.filter((product) => product.quantity === 0 || product.isDisabled)
        .length,
    [products]
  );

  const uniqueCategories = useMemo(() => {
    return new Set(activeProducts.map((product) => product.category)).size;
  }, [activeProducts]);

  return (
    <>
      <h1 className="text-3xl mb-4 text-white">Inventory stats</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
        <Card
          Icon={ShoppingCartOutlined}
          text="Total products"
          value={totalProducts}
        />
        <Card
          Icon={DollarOutlined}
          text="Total store value"
          value={`$ ${totalStoreValue.toFixed(2)}`}
        />
        <Card Icon={StopOutlined} text="Out of stocks" value={outOfStock} />
        <Card
          Icon={GroupOutlined}
          text="No of categories"
          value={uniqueCategories}
        />
      </div>
    </>
  );
}
