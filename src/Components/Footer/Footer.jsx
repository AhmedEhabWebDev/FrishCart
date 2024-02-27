import React, { useContext } from 'react';
import styles from './Footer.module.css';
import logo1 from '../../Assets/images/Amazon_Pay-Logo.wine.png'
import logo2 from '../../Assets/images/Visa_Inc.-Logo.wine.png'
import logo3 from '../../Assets/images/Mastercard-Logo.wine.png'
import logo4 from '../../Assets/images/PayPal-Logo.wine.png'
import logo5 from '../../Assets/images/App_Store_(iOS)-Badge-Logo.wine.png'
import logo6 from '../../Assets/images/Google_Play-Badge-Logo.wine.png'
import { UserContext } from '../../Context/UserContext';

export default function Footer() {

  
  let {userToken , setUserToken} = useContext(UserContext)

  let token = localStorage.getItem('userToken')

  setUserToken(token)

  return <>
  {userToken? <footer className='bg-main-light p-5 mt-5'>
    <div className=' py-3 border-bottom'>
      <h4 className='fw-bold'>Get The FrishCart App</h4>
      <p className='text-muted'>We will send you a link, open it on your phone to download tha app</p>
      <div className="row w-100 mx-auto gy-3">
        <div className="col-md-10">
          <input placeholder='Email..' type="text" className='form-control' />
        </div>
        <div className="col-md-2">
          <button className='btn bg-main text-light'>Share App Link</button>
        </div>
      </div>
    </div>
    <div className="row g-0 py-1 border-bottom">
      <div className="col-md-2">
        <div>
          <h4 className='h6 fw-bold mt-4'>Payment Partners</h4>
        </div>
      </div>
      <div className="col-md-5">
        <div className='mt-3'>
          <img src={logo1} className='w-50px' alt="amazon pay" />
          <img src={logo2} className='w-50px' alt="amazon pay" />
          <img src={logo3} className='w-50px' alt="amazon pay" />
          <img src={logo4} className='w-50px' alt="amazon pay" />
        </div>
      </div>
      <div className="col-md-3">
        <div className='mt-4'>
          <h4 className="h6 fw-bold mt-1">Get deliveries with FreshCart</h4>
        </div>
      </div>
      <div className="col-md-1">
        <div>
          <img src={logo5} className='w-100 top-0' alt="amazon pay" />
        </div>
      </div>
      <div className="col-md-1">
        <div>
          <img src={logo6} className='w-100' alt="amazon pay" />
        </div>
      </div>
    </div>
  </footer> : ''}
  </>
}
