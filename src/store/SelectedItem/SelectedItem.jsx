import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";





const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
        const product = action.payload
        let item = state.find((item) => item.id === product._id)
        if(item){
            if(item.quantity === product.productQuantity){
                toast.dismiss()
                toast.warn(`Cannot add ${item.name}
                Maximum number have being attain`)
            } 
            else return state.map((itemP) => (itemP.id === item.id ? {...item, quantity: (item.quantity + 1)} : itemP))
        }
        else 
            return [...state,
                {
                    id: product._id, 
                    image: product.productImage,
                    name: product.productName,
                    discount: product.percentageDiscount,
                    quantity: 1,
                    price: product.productPrice,
                    totalQuantity: product.productQuantity,
                }
            ]
    },
    removeItem: (state, action) => {
        const id = action.payload
        let items = state.map((item) => {
            if(id !== item.id) return item
            else return {
                ...item,
                quantity: item.quantity - 1
            }
        })
        return items.filter((item) => item.quantity > 0)
    },
    clearItems: () => {
        return []
    }
  }
//   extraReducers: (builder) => {
//     builder
      // .addCase(getProducts.pending, setLoading)
      // .addCase(postProduct.pending, setLoading)
//       .addCase(getProducts.fulfilled, (state, action) => {
//         return  action.payload
//       })
//       .addCase(postProduct.fulfilled, (state, action) => {
//         state.products.unshift(action.payload.product)
//       })
//   },
});

export const {addItem, removeItem, clearItems} = itemsSlice.actions
export default itemsSlice.reducer

