

import { Product } from "@/types";
import Rating from "../dashboard/Rating";

const ProductCard = (product:Product) => {
  return (
    <div className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
      <div className="flex flex-col items-center">
        img
        <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
        <p className="text-gray-800">{product.price.toFixed(2)}</p>
        <div className="text-sm text-gray-600 mt-1">
          Stock: {product.stockQuantity}
        </div>
        {product.rating && (
          <div className="flex items-center mt-2">
            <Rating rating={product.rating} />
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductCard;
