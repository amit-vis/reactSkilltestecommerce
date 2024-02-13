import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '../../ecommercedata/ecommerceStore';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";


export const initialState = {
    productData: []
};

export const getProductData = createAsyncThunk('get/getItem', async () => {
    const response = await fetch('https://my-json-server.typicode.com/amit-vis/products/ProductsItem');
    const jsonData = await response.json();
    const promises = jsonData.map(async (ite)=>{
        await addDoc(collection(db, 'data'),{
            title: ite.title,
            description: ite.description,
            price: ite.price,
            ratings: ite.ratings,
            imgUrl: ite.imgUrl
        })
        await Promise.all(promises)
    })

})


export const fetchDataFromFirebase = createAsyncThunk('fetch/fetchItem', async () => {
    const productCollection = collection(db, "data");

    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(productCollection, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            resolve(data); // Unsubscribe after the initial data is fetched
        }, (error) => {
            reject(error);
        });
    });
});


export const deleteProduct = createAsyncThunk('delete/deleteProduct', async (id) => {
    const docRef = doc(db, 'data', id)
    return await deleteDoc(docRef)

})

export const editProduct = createAsyncThunk('edit/editItem', async (editData)=>{
    const {id,title, price, description, ratings} = editData
    const docRef = doc(db, 'data',id)
    return await updateDoc(docRef,{
        title:title,
        price:price,
        description:description,
        ratings:ratings
    })
})


const productSlice = createSlice({
    name: 'showproduct',
    initialState: initialState,
    reducers: {
        sortPrice:(state,action)=>{
            if (action.payload) {
                // Sort in ascending order
                state.productData = state.productData.sort((a, b) => a.price - b.price);
            }else {
                // Sort in descending order
                state.productData = state.productData.sort((a, b) => b.price - a.price);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataFromFirebase.fulfilled, (state, action) => {
            const storedData = action.payload
            state.productData = [...storedData]
        })
        
        .addCase(deleteProduct.fulfilled, (state, action) => {
            
            state.productData = state.productData.filter((item) => item.id !== action.meta.arg)
                // Handle state changes after successful deletion
        })
        .addCase(editProduct.fulfilled, (state,action)=>{
            const {id, title,price,description,ratings} = action.meta.arg;
            state.productData = state.productData.map((item)=>
            item.id===id?{...item, title, price, description,ratings}:item)
        })

    }

});

export const productReducer = productSlice.reducer;
export const actions = productSlice.actions;
export const productSelector = (state) => state.productReducer.productData;
export const countSelector = (state)=>state.productReducer.count;
