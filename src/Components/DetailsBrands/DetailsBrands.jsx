import React, { useEffect, useState } from 'react';
import styles from './DetailsBrands.module.css';
import { Triangle } from 'react-loader-spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function DetailsBrands() {

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  let {id} = useParams()

  async function getSpecificBrand(id) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    setDetails(data.data)
    setLoading(false)
  }

  useEffect(()=>{
    getSpecificBrand(id)
  } , [])

  return <>
  {loading ? 
    <div className='loading'>
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
   : <div className="row py-5">
    <div className="col-md-4 offset-md-4">
      <div>
        <img src={details.image} className='w-100' alt={details.name} />
        <p className='text-main fw-bold text-center py-2'>{details.name}</p>
      </div>
    </div>
   </div> }

  </>
}
