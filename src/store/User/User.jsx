import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import status from '../../constant/status';


const apiUrl = 'https://ecommerce-server-ht4t.onrender.com/api/auth';

export const activateEmail = createAsyncThunk('user/activate', async ({token, emailToken, formData}) => {
  try{
    
    const response = await axios.get(apiUrl+`/emailactivator/${emailToken}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.token}`,
      },
    });
    return response.data
  }catch(error){
    console.error(error)
  }
})

export const logoutUser = createAsyncThunk('user/signout', async () => {
  try{
    const response = await axios.post(apiUrl+'/signout')
    sessionStorage.clear()
    return response.data;
  }catch(error){
    console.error(error)
  }
})


export const signinUser = createAsyncThunk('user/signin', async (data) => {
  try{
 
    const response = await axios.post(apiUrl+'/signin', data);
  
    toast.success(response.data.message)

    return response.data;
  }catch(error){
    toast.error(error.response.data.message)
  }
})

export const signupUser = createAsyncThunk('user/signup', async (data) => {
    try{
        const response = await axios.post(apiUrl+'/signup', data, {withCredentials: true});
        return response.data;
    }catch(error){
        console.error(error)
    }
});

const setLoading = (state, payload) => {
  state.status = status.loading
}

const initialState = {
    message: "",
    status: status.idle,
    userName: "",
    email: "",
    role: "",
    profileImage: "",
    createdAt: "",
    updatedAt: "",
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateData: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, setLoading)
      .addCase(signupUser.pending, setLoading)
      .addCase(logoutUser.pending, setLoading)
      .addCase(signupUser.fulfilled, (state, action) => {
        return {status: status.success, ...action.payload}
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        return {status: status.success, ...action.payload}
      })
  },
});

export const { updateData } = userSlice.actions;
export default userSlice.reducer;
