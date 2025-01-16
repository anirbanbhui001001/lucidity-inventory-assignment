import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import { Product } from "../lib/types";

interface EditModalProps {
  id: string;
  onCancel: () => void;
}

export default function EditProductModal({ id, onCancel }: EditModalProps) {
  const { products, updateProductList } = useFetchProducts();
  const [form] = Form.useForm<Product>();

  // Find the selected product directly
  const selectedProduct = products.find((product) => product.id === id);

  // Reset and dismiss the modal
  const resetAndDismiss = () => {
    onCancel();
    form.resetFields();
  };

  // Set form values when the selected product changes
  useEffect(() => {
    if (selectedProduct) {
      form.setFieldsValue({
        category: selectedProduct.category,
        price: selectedProduct.price?.replace("$", ""),
        quantity: selectedProduct.quantity,
        value: selectedProduct.value?.replace("$", ""),
      });
    }
  }, [selectedProduct, form]);

  // Handle form submission
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (selectedProduct) {
        updateProductList(
          products.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...values,
                  price: "$" + values.price,
                  value: "$" + values.value,
                }
              : item
          )
        );
        resetAndDismiss();
      }
    });
  };

  // Handle value calculation based on price and quantity
  const handleValuesChange = (_: Product, allValues: Product) => {
    const { price, quantity } = allValues;

    if (price && quantity) {
      const newValue = Number(price) * Number(quantity);
      form.setFieldsValue({ value: newValue ? newValue.toString() : "" });
    }
  };

  return (
    <Modal
      title="Edit Product"
      width={400}
      open={!!id}
      onCancel={resetAndDismiss}
      onClose={resetAndDismiss}
      footer={[
        <Button key="back" onClick={resetAndDismiss}>
          Cancel
        </Button>,
        <Button
          key="submit"
          className="bg-customGreen text-white"
          type="primary"
          onClick={handleSubmit}
        >
          Save
        </Button>,
      ]}
    >
      {selectedProduct && (
        <Form
          form={form}
          layout="vertical"
          name="editProduct"
          onValuesChange={handleValuesChange}
        >
          <div className="mb-4">{selectedProduct.name}</div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item<Product>
              name="category"
              label="Category"
              rules={[{ required: true, message: "Category is required." }]}
            >
              <Input placeholder="Electronics" />
            </Form.Item>

            <Form.Item<Product>
              name="price"
              label="Price"
              rules={[
                { required: true, message: "Price is required." },
                {
                  pattern: /^[0-9]*(\.[0-9]+)?$/,
                  message: "Price must be a valid number.",
                },
              ]}
            >
              <Input placeholder="20" />
            </Form.Item>

            <Form.Item<Product>
              name="quantity"
              label="Quantity"
              rules={[
                { required: true, message: "Quantity is required." },
                {
                  pattern: /^[0-9]*(\.[0-9]+)?$/,
                  message: "Quantity must be a valid number.",
                },
              ]}
            >
              <Input placeholder="5" />
            </Form.Item>

            <Form.Item<Product>
              name="value"
              label="Value"
              rules={[
                { required: true, message: "Value is required." },
                {
                  pattern: /^[0-9]*(\.[0-9]+)?$/,
                  message: "Value must be a valid number.",
                },
              ]}
            >
              <Input readOnly placeholder="50" />
            </Form.Item>
          </div>
        </Form>
      )}
    </Modal>
  );
}
