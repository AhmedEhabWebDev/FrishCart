import React, { useContext, useEffect } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home.jsx'
import Products from './Components/Products/Products.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Layout from './Components/Layout/Layout.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx';
import VerifyCode from './Components/VerifyCode/VerifyCode.jsx';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';
import { UserContext } from './Context/UserContext.js';
import DetailsBrands from './Components/DetailsBrands/DetailsBrands.jsx';
import DetailsCategory from './Components/DetailsCategory/DetailsCategory.jsx';
import WishList from './Components/WishList/WishList.jsx';
import ShippingAddress from './Components/ShippingAddress/ShippingAddress.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import Notfound from './Components/Notfound/Notfound.jsx';


function App() {

  let routes = createBrowserRouter([
    { path: '', element: <Layout />, children: [
      {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'productdetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'allorders' , element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:'detailscategory/:id' , element:<ProtectedRoute><DetailsCategory/></ProtectedRoute>},
      {path:'shippingaddress/:cartId' , element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'detailsbrands/:id' , element:<ProtectedRoute><DetailsBrands/></ProtectedRoute>},
      {path:'wishlist' , element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'login' , element:<Login/>},
      {path:'register' , element:<Register/>},
      {path:'forgetpassword' , element:<ForgetPassword/>},
      {path:'verifycode' , element:<VerifyCode/>},
      {path:'resetpassword' , element:<ResetPassword/>},
      {path:'*' , element:<Notfound/>},
    ] }
  ])
  
let {setUserToken} = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
    setUserToken(localStorage.getItem('userToken'))
}

  } , [])

  return <RouterProvider router={routes}></RouterProvider>
}

export default App;