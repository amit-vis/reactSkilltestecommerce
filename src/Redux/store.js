import {configureStore} from "@reduxjs/toolkit";
import { productReducer } from "./Reducer/ShowProductReducer";
import { addProductReducer } from "./Reducer/addProductReducer";
import { cartReducer } from "./Reducer/cartItemsReducer";

export const store = configureStore({
    reducer:{
        productReducer,
        addProductReducer,
        cartReducer
    }
})