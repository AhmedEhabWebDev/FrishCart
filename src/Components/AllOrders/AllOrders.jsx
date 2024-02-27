import React, { useEffect, useState } from 'react';
import styles from './AllOrders.module.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Triangle } from 'react-loader-spinner';

export default function AllOrders() {

  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(true)

  let token = localStorage.getItem('userToken');
  let {id} = jwtDecode(token);


  async function getUserOrders(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    data.map(data=> setOrder(data))
    
    setLoading(false)
  }

  

  useEffect(()=> {
    getUserOrders(id)
  } ,[])
  
  console.log(order.cartItems)
  return <>
      <div className="bg-main-light p-2 mt-100px">
        <h2>Orders</h2>
        <h4 className='text-main my-3'>Total Order Price : {order.totalOrderPrice} EGP</h4>

        {loading? <div className="loading">
            <Triangle
              visible={true}
              height="100"
              width="100"
              color="#0aad0a"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass="d-flex justify-content-center mt-5"
            />
          </div> :<> 
          {order.cartItems.map( (product , index) => <div key={product._id} className="row align-items-center border-1 border-bottom p-2 m-0">
          <div className="col-md-2">
              <div className="item">
                <img src={product.product.imageCover} className='w-100' alt={product.title} />
              </div>
          </div>
          <div className="col-md-5">
            <div>
            <h3 className='h5 fw-bold'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
            <p className='fw-bold text-main'>price : {product.price} EGP</p>
            <p className='fw-bold text-main'>Quantity : {product.count}</p>
            </div>
          </div>
          <div className="col-md-5">
            <div>
              <h4 className='h6 fw-bold'>Category Of Item : {product.product.category.name}</h4>
              <h4 className='h6 fw-bold'>Brand Of Item : {product.product.brand.name}</h4>
              <img src={product.product.brand.image} className='w-25' alt="" />
            </div>
          </div>
          </div> )}
          </>
           }
      </div>
  </>
}
