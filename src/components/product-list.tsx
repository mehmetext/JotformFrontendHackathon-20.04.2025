import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <Link
          href={`/product/${product.pid}`}
          key={product.pid}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* Product Image */}
          <div className="relative h-48 w-full">
            {product.images && JSON.parse(product.images).length > 0 && (
              <Image
                src={JSON.parse(product.images)[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.hasQuantity === "true" && (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
