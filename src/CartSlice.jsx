import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
    
      const productToAdd = action.payload; // product is passed in action.payload
      const existingItem = state.items.find(item => item.name === productToAdd.name);
      if (existingItem) {
        existingItem.quantity += 1; // if item already exists then increase quantity by 1
      } else {
        state.items.push({ ...productToAdd, quantity: 1 }); // if item doesn't exist then add new item with quantity 1
      }
    },
    removeItem: (state, action) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(item => item.name !== productIdToRemove.name);
    },
    updateQuantity: (state, action) => {
      const { productName, quantity } = action.payload;
      const itemToUpdate = state.items.find( item => item.name === productName);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      if (itemToUpdate.quantity <= 0) {
        state.items = state.items.filter(item => item.name !== productName);

      }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
