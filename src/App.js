import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { NavbarPage } from './Component/Navbar/Navbar';
import { AddProduct } from './Component/addProduct/AddProduct';
import { Provider } from 'react-redux';
import { ShowProductList } from './Component/showProductList/ShowProductList';
import { store } from './Redux/store';
import { Details } from './Component/Details/Details';
import { CartItem } from './Component/CartItems/CartItems';

function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <>
              <NavbarPage/>
              <ShowProductList/>
              </>
            } 
          />
          <Route
            path='addproduct'
            element={
              <>
                <NavbarPage/>
                <AddProduct/>
              </>
            }
          />
          <Route path=':id'
          element={<>
          <Details/>
          </>}/>
          <Route path='/cartitem'
          element={
            <>
            <NavbarPage/>
            <CartItem/>
            </>
          }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
