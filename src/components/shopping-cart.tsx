import { useCartStore } from "@/lib/stores/cart";
import { formatPrice } from "@/lib/utils";
import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";

export default function ShoppingCart() {
  const { items, removeItem, increaseQuantity, decreaseQuantity, clearCart } =
    useCartStore();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCartIcon className="h-5 w-5" />
          {items.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {items.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-120 p-4" align="end">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Sepetim</h3>
          <ScrollArea className="h-64">
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.pid}
                  className="flex items-center justify-between border-b pb-4 gap-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                  <div className="flex-1 flex flex-col gap-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                    <p className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="flex self-stretch justify-center flex-col gap-1">
                    <Button
                      onClick={() => removeItem(item.pid)}
                      size="icon"
                      variant="outline"
                      className="flex-1 min-h-9"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => decreaseQuantity(item.pid)}
                      disabled={item.quantity === 1}
                      size="icon"
                      variant="outline"
                      className="flex-1 min-h-9"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => increaseQuantity(item.pid)}
                      size="icon"
                      variant="outline"
                      className="flex-1 min-h-9"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold">
              <span>Toplam:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <Button className="w-full mt-4">Siparişi Tamamla</Button>
            <Button
              onClick={clearCart}
              variant="outline"
              className="w-full mt-4"
            >
              Sepeti Temizle
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
