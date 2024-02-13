// imported all required data
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../ecommercedata/ecommerceStore";

// create the initialState objects
const initialState={
    cartData: []
}

// function for add the Item into data base
export const addNewDataintoCart = createAsyncThunk('add/addtocart', async (newData)=>{
    try {
        await addDoc(collection(db, "cartItem"),{
            title: newData.title,
            description: newData.description,
            imgUrl: newData.imgUrl,
            price: newData.price,
            ratings: newData.ratings,
            quantity:1
        })
        
    } catch (error) {
        console.log("Error in adding the cart data into database", error);
    }
})

// function for update the existing item into data base
export const updateExisting= createAsyncThunk('update/updateCart', async (newData)=>{
    try {
        const { price, quantity,id} = newData
        const docRef = doc(db, 'cartItem', id)
        return await updateDoc(docRef,{
        price: price,
        quantity: quantity
    })
        
    } catch (error) {
        console.log("Error in updating the cart data", error);
    }
})

// function for delete the Item from data base
export const deleteCartItem = createAsyncThunk('delete/deleteCart', async (id)=>{
    try {
        const docRef = doc(db, "cartItem", id);
        return await deleteDoc(docRef)
        
    } catch (error) {
        console.log("Error in Deleting the cart data", error);
    }
})

// function for fetch the data from data base
export const fetchDataFromCart = createAsyncThunk('get/getcartData', async ()=>{
    try {
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
            
    } catch (error) {
        console.log("Error in fething the Cartdata", error);
    }
})

// create the slice
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
            state.cartData = state.cartData.filter((item)=>item.id!==action.meta.arg);
        })
    }
    
})

// export the required data
export const cartReducer = cartItemSlice.reducer;
export const cartSelector = (state)=>state.cartReducer.cartData;