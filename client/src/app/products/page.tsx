'use client'

import Rating from "@/components/dashboard/Rating";
import SharedHeader from "@/components/shared/SharedHeader";
import { useCreateProductMutation, useGetProductsQuery } from "@/redux/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import ProductCard from '@/components/products/ProductCard'
import { Product, ProductFormData } from "@/types";
import CreateProductModal from "@/components/products/CreateProductModal";
const Products = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
      data: products,
      isLoading,
      isError,
    } = useGetProductsQuery(searchTerm);
    const [createProduct] = useCreateProductMutation();
    const handleCreateProduct = async(productData:ProductFormData)=>{
      try {
        await createProduct(productData);
      } catch (error) {
        console.log(error);
      }
        
    }
    if (isLoading) {
        return <div className="py-4">Loading...</div>
    }
    if (isError || !products) {
        return (
          <div className="text-center text-red-500 py-4">
            Failed to Fetch Products
          </div>
        );
    }
  return (
    <div className="mx-auto pb-5 w-full">
      {/**Search Bar */}

      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 bg-white rounded"
          />
        </div>
      </div>
      {/**Header */}
      <div className="flex justify-between items-center mb-6">
        <SharedHeader name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" />
        </button>
      </div>
      {/**Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products.map((product: Product) => (
            <ProductCard key={product.productId} {...product} />
          ))
        )}
      </div>
      {/**Modal */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};
export default Products;