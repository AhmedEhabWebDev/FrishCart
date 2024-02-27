import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  let { addToCart } = useContext(cartContext);

  async function postToCart(id) {
    let { data } = await addToCart(id);
    toast.success(data.message, {
      duration: 6000,
      icon: "👏",
    });
  }

  async function getProductDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProductDetails(id);
  }, []);

  return (
    <>
      {loading ? (
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
        <div className="row align-items-center py-5">
          <div className="col-md-4">
            <div className="details">
              <img
                src={details.imageCover}
                className="w-100"
                alt={details.title}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="details">
              <h3 className="h5">{details.title}</h3>
              <p className="py-3">{details.description}</p>
              <span className="font-sm text-main">{details.category.name}</span>
              <div className="d-flex py-2 justify-content-between align-items-center">
                <span className="font-sm">{details.price} EGP</span>
                <span className="font-sm">
                  <i className="fas fa-star rating-color me-1"></i>
                  {details.ratingsAverage}
                </span>
              </div>
              <button onClick={() => postToCart(details.id)} className="btn bg-main text-light w-100">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
