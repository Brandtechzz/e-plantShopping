import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // Reducer to add an item to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++; // Increment quantity if item already exists
      } else {
        state.items.push({ name, image, cost, quantity: 1 }); // Add new item with quantity 1
      }
    },
    
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload); // Remove item by name
    },
    
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Extract name and quantity
      const itemToUpdate = state.items.find(item => item.name === name); // Find the item
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Update item's quantity
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
