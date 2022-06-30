import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductItem {
  productId: string; title: string; price: number
}
export interface CartState {
  totalProducts: number;
  totalPrice: number;
  products: ProductItem[]
}

const initialState: CartState = {
  totalProducts: 0,
  totalPrice: 0,
  products: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductItem>) => {
      state.products.push(action.payload)
      state.totalPrice += action.payload.price;
      state.totalProducts += 1;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addProduct } = cartSlice.actions

export default cartSlice.reducer
