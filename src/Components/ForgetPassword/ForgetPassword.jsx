import React, { useContext, useState } from "react";
import styles from "./ForgetPassword.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Triangle } from "react-loader-spinner";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();

  async function loginSubmit(values) {
    setLoading(true);
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    if (data.statusMsg == "success") {
      console.log(data);
      setLoading(false);
      navigate("/verifycode");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("invalid email"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-4 mt-100px">
        <h2 className="fw-bold">please enter your verification code</h2>

        {apiError ? <div className="alert alert-danger">{apiError}</div> : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">email : </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            id="email"
            name="email"
            className="form-control mb-3"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger py-2">{formik.errors.email}</div>
          ) : null}

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
