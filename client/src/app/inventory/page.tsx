"use client";


import SharedHeader from "@/components/shared/SharedHeader";
import { invColumns } from "@/contants";
import { useGetProductsQuery } from "@/redux/state/api";
import { DataGrid } from "@mui/x-data-grid";


const Inventory = () => {
    const { data: products, isError, isLoading } = useGetProductsQuery();
if(isLoading) {
    return <div className="py-4">Loading...</div>;
}
if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
}
  return (
    <div className="flex flex-col">
      <SharedHeader name="Inventory" />
      <DataGrid
        rows={products}
        columns={invColumns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};
export default Inventory;
