// imported all required data
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialState } from "./ShowProductReducer";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../ecommercedata/ecommerceStore";

// adding  new data into database
export const addProductDataThunk = createAsyncThunk('add/addData', async (itemData)=>{
    try {
        const {title, description, price, ratings, imgUrl} = itemData;
        const docRef = await addDoc(collection(db, 'data'),{
            title, description,price,ratings,imgUrl
        })
        return docRef
        
    } catch (error) {
        console.log("Error in Adding the new data", error);
    }
})

// create slice
const addProductSlice = createSlice({
    name: "addProduct",
    initialState: initialState,
    extraReducers:(builder)=>{
        builder.addCase(addProductDataThunk.fulfilled, (state, action)=>{
            state.productData = [...state.productData, action.meta.arg]
        })
    }
})

// export the required data
export const addProductReducer = addProductSlice.reducer;
export const actions = addProductSlice.actions;
export const addProductSelector = (state)=>state.addProductReducer.productData

