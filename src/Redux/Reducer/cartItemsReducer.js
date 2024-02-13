import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../ecommercedata/ecommerceStore";

const initialState={
    cartData: []
}

export const addNewDataintoCart = createAsyncThunk('add/addtocart', async (newData)=>{
    await addDoc(collection(db, "cartItem"),{
        title: newData.title,
        description: newData.description,
        imgUrl: newData.imgUrl,
        price: newData.price,
        ratings: newData.ratings,
        quantity:1
    })
})

export const updateExisting= createAsyncThunk('update/updateCart', async (newData)=>{
    const { price, quantity,id} = newData
    const docRef = doc(db, 'cartItem', id)
    return await updateDoc(docRef,{
        price: price,
        quantity: quantity
    })
})

export const deleteCartItem = createAsyncThunk('delete/deleteCart', async (id)=>{
    const docRef = doc(db, "cartItem", id);
    return await deleteDoc(docRef)
})

export const fetchDataFromCart = createAsyncThunk('get/getcartData', async ()=>{
    const cartCollection = collection(db, 'cartItem');
    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(cartCollection, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
})

const cartItemSlice= createSlice({
    name: 'CartItem',
    initialState:initialState,
    extraReducers:(builter)=>{
        builter.addCase(fetchDataFromCart.fulfilled, (state, action)=>{
            state.cartData = action.payload
        })
        .addCase(updateExisting.fulfilled,(state, action)=>{
            const { id, quantity, price } = action.meta.arg;
      
            state.cartData = state.cartData.map((item)=>
            item.id === id? {...item, quantity, price}:item)
      
        })
        .addCase(deleteCartItem.fulfilled, (state, action)=>{
            state.cartData = state.cartData.filter((item)=>item.id!==action.meta.arg)
        })
    }
    
})

export const cartReducer = cartItemSlice.reducer;
export const cartSelector = (state)=>state.cartReducer.cartData;