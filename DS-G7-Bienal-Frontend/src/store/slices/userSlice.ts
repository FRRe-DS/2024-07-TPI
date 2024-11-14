import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AbsUser {
    id:number;
    email:string;
    name:string;
    lastname:string;
    phoneNumber:string;
    dni: string;
    role: string
}

export interface Usuario extends AbsUser{
    role: 'VISITANTE'
}

export interface Escultor extends AbsUser {
    biografia:string;
    role: 'ESCULTOR'
}

export interface Admin extends AbsUser {
    
    role: 'ADMIN'
}

export interface UserState{
    user: Usuario | Escultor | Admin | null;
    error:string | null;
    msg:string|null;
    loading: boolean;
    isAuth: boolean;
}

const initialState: UserState = {
    user:null,
    error:null,
    msg:null,
    loading:false,
    isAuth:false,
}



export const fetchUserByToken = createAsyncThunk(
    'user/me',
    async(_, thunkAPI) => {
        try {
            let accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                return thunkAPI.rejectWithValue('No se encontró un token de acceso');
            }

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                }
            });
            
            
            return response.data;
        } catch (error: any) {
             
            return thunkAPI.rejectWithValue('Error al Registrarse');
        }
    }
)

export const registerDefaultUser = createAsyncThunk(
    'user/register',
    async(credentials : {email:string; name:string, dni:string, phoneNumber:string, password:string, lastname:string}, thunkAPI) => {
        try {
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register`, credentials)
            
            return response.data.payload.message
        } catch (error: any) {
             
            return thunkAPI.rejectWithValue('Error al Registrarse');
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async(credentials : {email:string; password:string}, thunkAPI) => {
         
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`, credentials)
            console.log(response)        
            localStorage.setItem('accessToken', response.data.payload.access_token);
    
            return response.data.payload.user            
        } catch (error: any) {
            
            return thunkAPI.rejectWithValue('Error al iniciar sesion');
        }
    }
)

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        removeError: (state) => {
            state.error = null;
        },
        removeMsg: (state) => {
            state.error = null;
        },
        logout: (state) => {
            localStorage.removeItem('accessToken');
            state.user = null;
            state.error = null;
            state.loading = false;
            state.isAuth = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.error = null;
            state.loading = true
        })
        .addCase(loginUser.fulfilled, (state, action:PayloadAction<Usuario|Escultor|Admin>) => {
            state.user = action.payload;
            state.error = null;
            state.loading = false
            state.isAuth = true
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; 
        })

        .addCase(registerDefaultUser.pending, (state) => {
            state.error = null;
            state.loading = true
        })
        .addCase(registerDefaultUser.fulfilled, (state, action:PayloadAction<string>) => {
            state.msg = action.payload;
            state.error = null;
            state.loading = false
        })
        .addCase(registerDefaultUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; 
            state.user = null
        })

        .addCase(fetchUserByToken.pending, (state) => {
            state.error = null;
            state.loading = true
            state.isAuth = false
        })
        .addCase(fetchUserByToken.fulfilled, (state, action:PayloadAction<Usuario|Admin|Escultor>) => {
            state.user = action.payload;
            state.error = null;
            state.loading = false;
            state.isAuth = true
        })
        .addCase(fetchUserByToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; 
            state.user = null;
            state.isAuth = false;
        });
    }
})

export const {removeError, logout, removeMsg} = userSlice.actions;

export default userSlice.reducer;