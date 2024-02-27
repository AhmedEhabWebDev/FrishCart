import React, { useContext } from 'react';
import styles from './ShippingAddress.module.css';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';

export default function ShippingAddress() {

  let {cartId} = useParams()

  let {chickOutSession} = useContext(cartContext)

  async function chickOut(values){
    let {data} = await chickOutSession(cartId , values)
    console.log(data);
    if(data.status == 'success') {
      window.location.href = data.session.url
    }
  }

  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },onSubmit:chickOut
  })

  return <>
    <h2 className='mt-100px'>ShippingAddress :</h2>
    <div className="w-75 mx-auto">
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="details">details</label>
        <input onChange={formik.handleChange} type="text" id='details' name='details' className='form-control mb-3' />

        <label htmlFor="phone">phone</label>
        <input onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3' />

        <label htmlFor="city">city</label>
        <input onChange={formik.handleChange} type="text" id='city' name='city' className='form-control mb-3' />

        <button type='submit' className='btn bg-main text-light'>Chick Out</button>
      </form>
    </div>
  </>
}
