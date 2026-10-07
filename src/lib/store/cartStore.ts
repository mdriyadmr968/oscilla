import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, OrderRecord, StrapMaterial, WatchProduct } from "../types";

interface CartStoreState {
  items: CartItem[];
  isCartOpen: boolean;
  wishlistIds: string[];
  orders: OrderRecord[];
  promoCode: string | null;
  discountPercentage: number;
  
  // Cart Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (watch: WatchProduct, selectedStrap?: StrapMaterial, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateStrap: (itemId: string, strap: StrapMaterial) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  clearCart: () => void;
  
  // Wishlist Actions
  toggleWishlist: (watchId: string) => void;
  isInWishlist: (watchId: string) => boolean;

  // Order Actions
  addOrder: (order: OrderRecord) => void;
  updateOrderFulfillment: (orderId: string, status: OrderRecord["fulfillmentStatus"], tracking?: string, courier?: string) => void;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      wishlistIds: [],
      orders: [],
      promoCode: null,
      discountPercentage: 0,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: (watch: WatchProduct, selectedStrap?: StrapMaterial, quantity: number = 1) => {
        const strap = selectedStrap || watch.specs.strap.defaultMaterial;
        const itemId = `${watch.id}-${strap}`;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          const newQty = Math.min(updated[existingIndex].quantity + quantity, watch.stockCount || 10);
          updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
          set({ items: updated, isCartOpen: true });
        } else {
          set({
            items: [
              ...currentItems,
              {
                id: itemId,
                watch,
                quantity: Math.min(quantity, watch.stockCount || 10),
                selectedStrap: strap,
              },
            ],
            isCartOpen: true,
          });
        }
      },

      removeItem: (itemId: string) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) => {
            if (item.id === itemId) {
              const maxStock = item.watch.stockCount || 10;
              return { ...item, quantity: Math.min(quantity, maxStock) };
            }
            return item;
          }),
        });
      },

      updateStrap: (itemId: string, newStrap: StrapMaterial) => {
        const item = get().items.find((i) => i.id === itemId);
        if (!item) return;

        const newId = `${item.watch.id}-${newStrap}`;
        const remaining = get().items.filter((i) => i.id !== itemId);
        const existingTarget = remaining.find((i) => i.id === newId);

        if (existingTarget) {
          set({
            items: remaining.map((i) =>
              i.id === newId ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({
            items: [...remaining, { ...item, id: newId, selectedStrap: newStrap }],
          });
        }
      },

      applyPromoCode: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === "OSCILLA10" || clean === "HOROLOGY10") {
          set({ promoCode: clean, discountPercentage: 0.1 });
          return { success: true, message: "10% VIP Collector discount applied." };
        } else if (clean === "FIRSTHOROLOGY") {
          set({ promoCode: clean, discountPercentage: 0.15 });
          return { success: true, message: "15% Welcome Acquisition discount applied." };
        }
        return { success: false, message: "Invalid promotional code." };
      },

      removePromoCode: () => {
        set({ promoCode: null, discountPercentage: 0 });
      },

      clearCart: () => {
        set({ items: [], promoCode: null, discountPercentage: 0 });
      },

      toggleWishlist: (watchId: string) => {
        const current = get().wishlistIds;
        if (current.includes(watchId)) {
          set({ wishlistIds: current.filter((id) => id !== watchId) });
        } else {
          set({ wishlistIds: [...current, watchId] });
        }
      },

      isInWishlist: (watchId: string) => {
        return get().wishlistIds.includes(watchId);
      },

      addOrder: (order: OrderRecord) => {
        set((state) => ({ orders: [order, ...state.orders] }));
      },

      updateOrderFulfillment: (orderId: string, status: OrderRecord["fulfillmentStatus"], tracking?: string, courier?: string) => {
        set((state) => ({
          orders: state.orders.map((ord) => {
            if (ord.id === orderId) {
              return {
                ...ord,
                fulfillmentStatus: status,
                ...(tracking ? { trackingNumber: tracking } : {}),
                ...(courier ? { courierName: courier } : {}),
              };
            }
            return ord;
          }),
        }));
      },
    }),
    {
      name: "oscilla-vault-storage",
      partialize: (state) => ({
        items: state.items,
        wishlistIds: state.wishlistIds,
        orders: state.orders,
      }),
    }
  )
);
