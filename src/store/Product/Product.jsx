// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { toast } from 'react-toastify';


// const apiUrl = 'http://localhost:4000/api/product';

// export const getProducts = createAsyncThunk('product/get', async ({search, sortBy, order, category, page, limit}) => {
//   try{
//     let params = ''
//     if(search) params += `search=${search}`
//     if(sortBy) params += `sortBy=${sortBy}`
//     if(order) params += `order=${order}`
//     if(category) params += `category=${category}`
//     if(page) params += `page=${page}`
//     if(limit) params += `limit=${limit}`

//     const response = await axios.get(`${apiUrl}?${params}`);
//     toast.dismiss()
    
//     const {message, ...data} = response.data
//     toast.success(message)
//     return data
//   }catch(error){
//     toast.dismiss()
//     if(error?.response?.data?.message) toast.error(error.response.data.message)
//     else toast.error(error?.message)
//   }
// })

// export const postProduct = createAsyncThunk('product/post', async ({formData}) => {
//   try{
//     const response = await axios.post(apiUrl, formData, {
//       headers: {
//         'Authorization': `Bearer ${sessionStorage.token}`
//       }
//     })
    
//     return response?.data;
//   }catch(error){
//     toast.dismiss()
//     if(error?.response?.data?.message) toast.error(error.response.data.message)
//     else toast.error(error?.message)
//   }
// })

// export const deleteProduct = createAsyncThunk('product/del', async ({id}) => {
//   try{

//   }catch(error){
//     toast.dismiss()
//     if(error?.response?.data?.message) toast.error(error.response.data.message)
//     else toast.error(error?.message)
//   }
// })

// export const updateProduct = createAsyncThunk('product/update', async ({formData, id}) => {
//   try{

//   }catch(error){
//     toast.dismiss()
//     if(error?.response?.data?.message) toast.error(error.response.data.message)
//     else toast.error(error?.message)
//   }
// })


// // const setLoading = (state, payload) => {
// //   state.status = status.loading
// // }

// const initialState = {
//     products: [],
//     // page: 0,
//     // limit: 0,
//     totalProducts: 0,
//     totalPages: 0,
// }


// const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       // .addCase(getProducts.pending, setLoading)
//       // .addCase(postProduct.pending, setLoading)
//       .addCase(getProducts.fulfilled, (state, action) => {
//         return  action.payload
//       })
//       .addCase(postProduct.fulfilled, (state, action) => {
//         state.products.unshift(action.payload.product)
//       })
//   },
// });

// export default productSlice.reducer;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApiSlice = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000'}),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (param) => ({
        url: '/api/product',
        method: 'GET',
        params: param
        // params: () => {
        //   let params = ''
        //   if(search) params += `search=${search}`
        //   if(sortBy) params += `sortBy=${sortBy}`
        //   if(order) params += `order=${order}`
        //   if(category) params += `category=${category}`
        //   if(page) params += `page=${page}`
        //   if(limit) params += `limit=${limit}`
        //   return params
        // },  
      }),
    }),

    fetchProduct: builder.query({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: 'GET', 
      }),
    }),

    
    createProduct: builder.mutation({
      query: (formData) => ({
        url: '/api/product',
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,  
        },
      }),
    }),
  }),
});

export const { 
  useFetchProductsQuery, 
  useFetchProductQuery,
  useCreateProductMutation 
} = productApiSlice;

