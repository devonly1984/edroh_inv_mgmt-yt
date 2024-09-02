"use client";
import { CreateProductModalProps } from "@/types"
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import SharedHeader from "../shared/SharedHeader";
import { inputCSS, labelCSS } from "@/contants";

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
const [formData, setFormData] = useState({
  productId: v4(),
  name: "",
  price: 0,
  stockQuantity: 0,
  rating: 0,
});
if (!isOpen) {
    return null;
}
const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    onCreate(formData);
    onClose();
}
const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name,value}  = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });

};
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <SharedHeader name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="productName" className={labelCSS}>
            Product Name{" "}
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCSS}
            required
          />
          <label htmlFor="productPrice" className={labelCSS}>
            Price{" "}
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputCSS}
            required
          />
          <label htmlFor="stockQuantity" className={labelCSS}>
            Stock Quantity{" "}
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCSS}
            required
          />
          <label htmlFor="rating" className={labelCSS}>
            Rating{" "}
          </label>
          <input
            type="text"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputCSS}
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-whtie rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal