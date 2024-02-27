import React from 'react';
import styles from './CategoriesSlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function CategoriesSlider() {

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false
  };

 function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let {data} = useQuery('Categories' , getCategories , {
    refetchOnMount:false,
    refetchOnWindowFocus:false
  })

  return <>
    <div className="row my-4">
      <Slider {...settings}>
        {data?.data.data.map(category => 
        
        <div key={category._id} className="col-md-2">
          <Link className='x' to={`detailscategory/${category._id}`}>
          <div className="img">
            <img src={category.image} height={200} className='w-100' alt={category.name} />
            <p>{category.name}</p>
          </div>
          </Link>
        </div>
         )}
      </Slider>
    </div>
  </>
}
