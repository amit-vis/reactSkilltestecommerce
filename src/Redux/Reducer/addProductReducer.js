import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialState } from "./ShowProductReducer";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../ecommercedata/ecommerceStore";

export const addProductDataThunk = createAsyncThunk('add/addData', async (itemData)=>{
    const {title, description, price, ratings, imgUrl} = itemData;
    const docRef = await addDoc(collection(db, 'data'),{
        title, description,price,ratings,imgUrl
    })
    return docRef
})

const addProductSlice = createSlice({
    name: "addProduct",
    initialState: initialState,
    extraReducers:(builder)=>{
        builder.addCase(addProductDataThunk.fulfilled, (state, action)=>{
            console.log("add", action)
            state.productData = [...state.productData, action.meta.arg]
        })
    }
})

export const addProductReducer = addProductSlice.reducer;
export const actions = addProductSlice.actions;
export const addProductSelector = (state)=>state.addProductReducer.productData

