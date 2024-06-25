import React from 'react'
import Home from './screens/Home'
import Login from './screens/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// import bootstrap from node modules css
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
// normal bootstraap js,css
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer.js';
import Cart from './screens/Cart.js';
import MyOrder from './screens/MyOrder.js';



function App() {
  return (
    // comes from contextReducer
    <CartProvider>

      <Router>
            <div>

              <Routes>
                <Route exact path='/' element = {<Home/>}></Route>
                <Route exact path='/login' element = {<Login/>}></Route>
                <Route exact path='/createuser' element = {<Signup/>}></Route>
                {/* <Route exact path='/cart' element = {<Cart/>}></Route> */}
                <Route exact path='/myOrder' element = {<MyOrder/>}></Route>

              </Routes>


            </div>
        </Router>

    </CartProvider>
    
  )
}

export default App
