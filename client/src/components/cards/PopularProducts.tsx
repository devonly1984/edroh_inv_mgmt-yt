"use client"

import { useGetDashboardMetricsQuery } from "@/redux/state/api"
import { ShoppingBag } from "lucide-react";
import Rating from "../dashboard/Rating";
import CardHeader from "../shared/Header";

const PopularProducts = () => {
    const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white rounded-2xl pb-16 shadow-md">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <CardHeader title="Popular Products"/>
          <div className="overflow-auto h-full">
            {dashboardMetrics &&
              dashboardMetrics?.popularProducts?.map((product) => (
                <div
                  key={product.productId}
                  className="flex items-center justify-between gap-3 px-5 py-7 border-b"
                >
                  <div className="flex items-center gap-3">
                    <div className="">img</div>
                    <div className="flex flex-col justify-between gap-1">
                      <div className="font-bold text-gray-700">
                        {product.name}
                      </div>
                      <div className="flex text-sm items-center">
                        <span className="font-bold text-blue-500 text-xs">
                          ${product.price}
                        </span>
                        <span className="mx-2">|</span>
                        <Rating rating={product.rating || 0} />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs flex items-center">
                    <button className="rounded-full bg-blue-100 text-blue-600 mr-2 p-2">
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                    {Math.round(product.stockQuantity / 1000)}k Sold
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
export default PopularProducts