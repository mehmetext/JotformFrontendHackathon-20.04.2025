"use client";

import { formatPrice } from "@/lib/utils";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function ProductItem({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 pt-0 gap-2">
      {/* Product Image */}
      <Link href={`/product/${product.pid}`}>
        <div className="relative h-48 w-full">
          {product.images && JSON.parse(product.images).length > 0 && (
            <Image
              src={JSON.parse(product.images)[0]}
              alt={product.name}
              fill
              className="object-cover rounded-t-xl"
            />
          )}
        </div>
      </Link>

      {/* Product Info */}
      <CardHeader className="mt-2">
        <h3 className="text-lg font-semibold">
          <Link href={`/product/${product.pid}`}>{product.name}</Link>
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-end gap-2">
        <span className="text-lg font-bold">{formatPrice(product.price)}</span>
        <div className="flex flex-col  gap-2">
          {/* Quantity */}
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecrement}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center flex-1">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncrement}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="default" className="cursor-pointer">
            Add to Cart
            <ShoppingCartIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
