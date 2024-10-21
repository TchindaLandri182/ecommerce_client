// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const apiUrl = 'http://localhost:4000/api/category';

// export const getCategory = createAsyncThunk('category/get', async ({search}) => {
//     try{
//         let params = ''
//         if(search) params += `search=${search}`
//         const response = await axios.get(`${apiUrl}?${params}`)
//         return response?.data?.categories
//     }catch(error){
//         toast.dismiss()
//         if(error?.response?.data?.message) toast.error(error.response.data.message)
//         else toast.error(error?.message)
//   }
// })

// export const postCategory = createAsyncThunk('category/post', async ({nameCategory}) => {
//   try{

//   }catch(error){
//     toast.dismiss()
//     if(error?.response?.data?.message) toast.error(error.response.data.message)
//     else toast.error(error?.message)
//   }
// })

// export const deleteCategory = createAsyncThunk('category/del', async () => {
//   try{

//   }catch(error){
//     toast.dismiss()
//     if(error?.response?.data?.message) toast.error(error.response.data.message)
//     else toast.error(error?.message)
//   }
// })

// export const updateCategory = createAsyncThunk('category/update', async () => {
//   try{

//   }catch(error){
//     toast.dismiss()
//     if(error?.response?.data?.message) toast.error(error.response.data.message)
//     else toast.error(error?.message)
//   }
// })

// const categorySlice = createSlice({
//   name: 'category',
//   initialState: [],
//   extraReducers: (builder) => {
//     builder
    
//       // .addCase(getProducts.pending, setLoading)
//       // .addCase(postProduct.pending, setLoading)
//       .addCase(getCategory.fulfilled, (state, action) => {
//         return  action.payload
//       })
//     //   .addCase(postProduct.fulfilled, (state, action) => {
//     //     state.products.unshift(action.payload.product)
//     //   })
//   },
// });

// export default categorySlice.reducer
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApiSlice = createApi({
  reducerPath: 'category',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000'}),
  endpoints: (builder) => ({
    fetchCategory: builder.query({
      query: (param) => ({
        url: '/api/category',
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

    
    createCategory: builder.mutation({
      query: (formData) => ({
        url: '/api/category',
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,  
        },
      }),
    }),
  }),
});

export const { useFetchCategoryQuery, useCreateCategoryMutation } = categoryApiSlice;