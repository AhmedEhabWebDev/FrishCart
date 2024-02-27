import React from 'react';
import styles from './Notfound.module.css';
import error from '../../Assets/images/error.svg'

export default function Notfound() {
  return <>
  <div className="image text-center mt-100px">
    <img src={error} className='w-50' alt="" />
  </div>
  </>
}
