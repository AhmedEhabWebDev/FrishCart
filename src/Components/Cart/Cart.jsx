import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import { Triangle } from "react-loader-spinner";
import { date } from "yup";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  let { getCartItems , deleteCartItems , updateCartItems , deleteAllItems} = useContext(cartContext);

  async function getItem() {
    setLoading(true)
    let { data } = await getCartItems();
    setCart(data);
    setLoading(false);
  }

  async function deleteItem(id) {
    setLoading(true)
    let { data } = await deleteCartItems(id);
    setCart(data);
    setLoading(false);
  }

  async function updateItem(id , count) {
    if (count < 1) {
      setLoading(true)
      let { data } = await deleteCartItems(id);
      setCart(data);
      setLoading(false);
    }else {
      setLoading(true)
      let { data } = await updateCartItems(id , count);
      setCart(data);
      setLoading(false);
    }
  }

  async function deleteAllItem() {
    setLoading(true)
    let { data } = await deleteAllItems();
    setCart(null)
    setLoading(false);
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
       <div className="bg-main-light p-2 mt-100px">
        <h2>Shop Cart</h2>
        {loading ? 
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
         : cart ?
          <>
            <p className="text-main">
              Num Of Cart Items : {cart.numOfCartItems}
            </p>
            <p className="text-main">
              Total Cart Price : {cart.data.totalCartPrice} EGP
            </p>

            {cart.data.products.map(product => 
              <div key={product.product.id} className="row align-items-center border-1 border-bottom p-2">
                <div className="col-md-1">
                  <div className="img">
                    <img src={product.product.imageCover} className="w-100" alt={product.product.title} />
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="item">
                    <h3 className="h6 fw-bold">{product.product.title.split(' ').slice(0 , 3).join(' ')}</h3>
                    <p className="mb-0">Price : {product.price} EGP</p>
                    <button onClick={()=> deleteItem(product.product.id)} className="btn p-0"> <i className="fas fa-trash-can text-danger"></i> Remove</button>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="text-center">
                  <button onClick={() => updateItem(product.product.id , product.count +1)} className="btn brdr">+</button>
                  <span className="mx-2">{product.count}</span>
                  <button onClick={() => updateItem(product.product.id , product.count -1)}  className="btn brdr">-</button>
                  </div>
                </div>
              </div>
            )}
            <button onClick={deleteAllItem} className="btn btn-outline-danger my-2">Clear Cart</button>
            <Link to={`/shippingaddress/${cart.data._id}`} className="x btn bg-main text-light mx-3">On Line Payment</Link>
          </> : <div className="m-5">
            <h2>Your Cart Is Empty .............</h2>
          </div>
        }
      </div>
    </>
  );
}
