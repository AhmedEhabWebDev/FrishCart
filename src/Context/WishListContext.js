import axios from "axios";
import { createContext } from "react";


export let wishListContext = createContext()

export default function WishListContextProvider(props){

  let headers = {
    token: localStorage.getItem('userToken')
  }

  function addToWishList(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      productId
    } ,  {
      headers
    })
    .then((response) => response)
    .catch((err)=> err)
  }

  function deleteWishListItem(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,  {
      headers
    })
    .then((response) => response)
    .catch((err)=> err)
  }

  function getWishList(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` ,  {
      headers
    })
    .then((response) => response)
    .catch((err)=> err)
  }



  return <wishListContext.Provider value={{addToWishList , getWishList , deleteWishListItem}}>
    {props.children}
  </wishListContext.Provider>
}