import React, { useEffect } from 'react';
import styles from './Categories.module.css';
import { getCategories } from '../../Redux/categorySlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Triangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Categories() {
  
  let {categories, isLoading} = useSelector(({category}) => category)

  let dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCategories())
  } , [])

  return <>
  <div className="mt-100px">
    
  {isLoading ? 
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
        </div> : 
        <div className="row py-5">
          {categories.map(category =>
             <div key={category._id} className="col-md-3">
              <div className="product p-2">
              <Link className='x' to={`/detailscategory/${category._id}`}>
                <img src={category.image} height={250} className='w-100' alt={category.name} />
                <p>{category.name}</p>
                </Link>
              </div>
             </div> )}
          </div> 
        }
  </div>
  </>
}
