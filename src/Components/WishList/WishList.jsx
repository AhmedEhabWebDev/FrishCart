import React, { useContext, useEffect, useState } from 'react';
import styles from './WishList.module.css';
import { wishListContext } from '../../Context/WishListContext';
import { cartContext } from '../../Context/CartContext';
import { Triangle } from 'react-loader-spinner';
import toast from 'react-hot-toast';

export default function WishList() {

  const [wishList, setWishList] = useState(null);
  const [loading, setLoading] = useState(true);

  let { addToCart } = useContext(cartContext);

  async function postToCart(id) {
    let { data } = await addToCart(id);
    toast.success(data.message, {
      duration: 6000,
      icon: "👏",
    });
  }

  let {getWishList , deleteWishListItem} = useContext(wishListContext);

  async function getList(){
    setLoading(true);
    let {data} = await getWishList();
    setWishList(data);
    setLoading(false);
  }
  
  async function deleteItem(id){
    setLoading(true);
    let {data} = await deleteWishListItem(id);
    getList()
    setLoading(false);
  }

  useEffect(()=> {
    getList()
  } , [])

  return <>
<div className="bg-main-light p-2 mt-100px">
      <h2>My Wish List</h2>
      {loading ? (
          <div className="loading">
            <Triangle
              visible={true}
              height="100"
              width="100"
              color="#0aad0a"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass="d-flex justify-content-center mt-5"
            />
          </div>
        ) :
         <>
          {wishList.data.map(wishList => 
          <div key={wishList._id} className="row p-2 align-items-center border-1 border-bottom m-0">
            <div className="col-md-2">
            <div className="image">
              <img src={wishList.imageCover} className='w-100' alt={wishList.title} />
            </div>
          </div>
          <div className="col-md-8">
            <div className="item">
              <h3 className='h5 fw-bold'>{wishList.title.split(' ').slice(0,2).join(' ')}</h3>
              <p className='text-main'>Price : {wishList.price} EGP</p>
              <button onClick={() => deleteItem(wishList._id)} className="btn p-0"> <i className="fas fa-trash-can text-danger"></i> Remove</button>
            </div>
          </div>
          <div className="col-md-2">
            <div className="button">
              <button onClick={() => postToCart(wishList._id)} className='btn brdr'>Add To Cart</button>
            </div>
          </div>
          </div>
          )}
          </>
         }
        </div>
  </>
}
