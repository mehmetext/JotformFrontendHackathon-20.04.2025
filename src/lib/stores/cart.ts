import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartState {
  items: CartItem[];
}

interface CartActions {
  addItem: (item: CartItem, quantity: number) => void;
  removeItem: (pid: string) => void;
  increaseQuantity: (pid: string) => void;
  decreaseQuantity: (pid: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.pid === item.pid);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.pid === item.pid
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      removeItem: (pid) =>
        set((state) => ({
          items: state.items.filter((item) => item.pid !== pid),
        })),
      increaseQuantity: (pid) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.pid === pid ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseQuantity: (pid) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.pid === pid ? { ...item, quantity: item.quantity - 1 } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
