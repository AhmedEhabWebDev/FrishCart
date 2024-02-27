import React, { useContext, useEffect, useState } from "react";
import styles from "./FeaturedProduct.module.css";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext.js";

export default function FeaturedProduct() {

  // const [product, setProduct] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // async function getProduct(){
  //   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //   setProduct(data.data)
  //   setIsLoading(false)
  // }

  // useEffect(() => {
  //   getProduct()
  // } ,[])



   function getProduct() {
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery("featuredProduct", getProduct);

  let { addToCart } = useContext(cartContext);
  let { addToWishList } = useContext(wishListContext);
  

  async function postToCart(id) {
    let { data } = await addToCart(id);
    toast.success(data.message, {
      duration: 4000,
      icon: "👏",
    });
  }

  async function postToWishList(id) {
    let { data } = await addToWishList(id);
    toast.success(data.message, {
      duration: 4000,
      icon: "👏",
    });
  }

  return (
    <>

      {isLoading ? (
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
      ) : (
        <div className="row py-5 gy-4">
          {data?.data.data.map((product, index) => (
            <div key={index} className="col-lg-3">
              <div className="product p-2">
                <Link to={`/productdetails/${product.id}`} className="x">
                  <img
                    src={product.imageCover}
                    className="w-100"
                    alt={product.title}
                  />
                  <span className="font-sm text-main">
                    {product.category.name}
                  </span>
                  <h3 className="h5">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex py-2 justify-content-between align-items-center">
                    <span className="font-sm">{product.price} EGP</span>
                    <span className="font-sm">
                      <i className="fas fa-star rating-color me-1"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <div className="row align-items-center">
                  <div className="col-md-9">
                    <div className="button">
                    <button onClick={() => postToCart(product.id)} className="btn bg-main text-light w-100" >
                      Add To Cart
                   </button>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="heart-icon">
                      <button onClick={() => postToWishList(product.id)} className="btn">
                      <i className="fas fa-heart fa-2x text-main"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
