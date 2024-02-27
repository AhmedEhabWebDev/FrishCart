import React, { useEffect } from "react";
import styles from "./Brands.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../Redux/brandsSlice.js";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Brands() {
  let { brands, isLoading } = useSelector(({ brand }) => brand);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  return (
    <>
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
          </div> : <div className="row py-5 mt-100px">
            {brands.map(brand => 
            <div key={brand._id} className="col-md-3">
              <Link className="x" to={`/detailsbrands/${brand._id}`}>
                <div className="product p-2">
                  <img src={brand.image} className='w-100' alt={brand.name} />
                  <p>{brand.name}</p>
                </div>
              </Link>
            </div>)}
          </div> }
    </div>
    </>
  );
}
