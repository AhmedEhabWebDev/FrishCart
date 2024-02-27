import React, { useContext } from 'react';
import styles from './Products.module.css';
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  function getProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery("featuredProduct", getProduct);

  let { addToCart } = useContext(cartContext);

  async function postToCart(id) {
    let { data } = await addToCart(id);
    toast.success(data.message, {
      duration: 6000,
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
        <div className="row py-5 mt-5 gy-4">
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
                <button
                  onClick={() => postToCart(product.id)}
                  className="btn bg-main text-light w-100"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
