import { create } from 'zustand';

export interface CartItem {
  cartItemId: string; // Unique ID for the cart (in case they add the same shirt in two different sizes)
  productId: string;
  name: string;
  price: string;
  size: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeItem: (cartItemId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (item) => set((state) => ({ 
    items: [...state.items, { ...item, cartItemId: Math.random().toString(36).substr(2, 9) }],
    isOpen: true // Automatically open the cart when an item is added
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.cartItemId !== id)
  })),
}));