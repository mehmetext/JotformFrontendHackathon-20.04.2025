import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";

// Sepet öğesi tipi
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function ShoppingCart() {
  // Örnek sepet verisi
  const cartItems: CartItem[] = [
    { id: "1", name: "Ürün 1", price: 100, quantity: 2 },
    { id: "2", name: "Ürün 2", price: 200, quantity: 1 },
  ];

  // Toplam fiyat hesaplama
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCartIcon className="h-5 w-5" />
          {cartItems.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {cartItems.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Sepetim</h3>
          <ScrollArea className="h-64">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x {item.price} TL
                    </p>
                  </div>
                  <p className="font-medium">{item.price * item.quantity} TL</p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold">
              <span>Toplam:</span>
              <span>{totalPrice} TL</span>
            </div>
            <Button className="w-full mt-4">Siparişi Tamamla</Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
