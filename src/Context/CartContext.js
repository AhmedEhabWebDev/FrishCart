import axios from "axios";
import { createContext, useState } from "react";


export let cartContext = createContext()

export default function CartContextProvider(props) {

  let headers = {
    token: localStorage.getItem('userToken')
  }

  function chickOutSession(cartId , shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://ahmedehabwebdev.github.io/FrishCart/#`, {
      shippingAddress
    }, {
      headers
    })
    .then((response) => response)
    .catch((err) => err)
    
  }

  function addToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
      productId
    }, {
      headers
    })
    .then((response) => response)
    .catch((err) => err)
    
  }

  function getCartItems() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers
    })
    .then((response) => response)
    .catch((err) => err)
  }

  function deleteAllItems() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers
    })
    .then((response) => response)
    .catch((err) => err)
  }

  function deleteCartItems(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers
    })
    .then((response) => response)
    .catch((err) => err)
  }

  function updateCartItems(id , count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
      count
    } , {
      headers
    })
    .then((response) => response)
    .catch((err) => err)
  }

  return <cartContext.Provider value={{addToCart , getCartItems , deleteCartItems , updateCartItems , deleteAllItems , chickOutSession}}>
    {props.children}
  </cartContext.Provider>
}