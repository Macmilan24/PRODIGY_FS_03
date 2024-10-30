import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  color?: string;
  size?: string;
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (_idToRemove: string) => void;
  increaseQuantity: (_idToIncrease: string) => void;
  decreaseQuantity: (_idToIncrease: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItem = get().cartItems;
        const existingItem = currentItem.find(
          (cartItem) => cartItem.item._id === item._id
        );

        if (existingItem) {
          return toast.error("Item already in cart");
        }

        set({ cartItems: [...currentItem, { item, quantity, color, size }] });
        toast.success("Item added to cart");
      },
      removeItem: (_idToRemove: string) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== _idToRemove
        );

        set({ cartItems: newCartItems });

        toast.success("Item removed from cart");
      },
      increaseQuantity: (_idToIncrease: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _idToIncrease
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );

        set({ cartItems: newCartItems });
      },
      decreaseQuantity: (_idToDecrease: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _idToDecrease && cartItem.quantity > 1
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );

        set({ cartItems: newCartItems });
      },

      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
