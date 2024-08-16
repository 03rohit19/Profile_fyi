import { createSlice } from "@reduxjs/toolkit";

// Helper function to generate unique IDs
const generateUniqueId = () => "_" + Math.random().toString(36).substr(2, 9);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = { ...action.payload, uniqueId: generateUniqueId() };
      state.items.push(newItem);
    },
    removeItem: (state, action) => {
      const { id, uniqueId } = action.payload;
      state.items = state.items.filter(
        (item) => item.id !== id || item.uniqueId !== uniqueId
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (state, action) => {
      const { id, uniqueId, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.uniqueId === uniqueId
      );
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
