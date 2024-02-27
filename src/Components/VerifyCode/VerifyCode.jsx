import React, { useState } from 'react';
import styles from './VerifyCode.module.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { Triangle } from "react-loader-spinner";

export default function VerifyCode() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();

  async function codeSubmit(values) {
    setLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    if (data.status == "Success") {
      console.log(data);
      setLoading(false);
      navigate("/resetpassword");
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },onSubmit: codeSubmit
  });

  return (
    <>
      <div className="w-75 mx-auto py-4 mt-100px">
        <h2 className="fw-bold">reset your account password</h2>

        {apiError ? <div className="alert alert-danger">{apiError}</div> : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="resetCode">resetCode : </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id="resetCode" name="resetCode" className="form-control mb-3"/>
          {formik.errors.resetCode && formik.touched.resetCode ? (<div className="alert alert-danger py-2">{formik.errors.resetCode}</div>) : null}
          {loading ? (
            <button type="button" className="btn bg-main text-light">
              <Triangle
                visible={true}
                height="25"
                width="25"
                color="#fff"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-light"
            >
              verify
            </button>
          )}
        </form>
      </div>
    </>
  );
}
