import React, { useContext, useState } from 'react';
import styles from './ResetPassword.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();
  let { setUserToken } = useContext(UserContext);


  async function loginSubmit(values) {
    setLoading(true);
    let { data } = await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    if (data.token) {
      setLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("invalid email"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][\w @]{5,8}$/,
        "You must start with a capital letter, and there are special character and numbers ex(Ahmed123@)"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h2>login Now</h2>

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

          <label htmlFor="newPassword">newPassword : </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="newPassword"
            name="newPassword"
            className="form-control mb-3"
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger py-2">
              {formik.errors.newPassword}
            </div>
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
              Reset Password
            </button>
          )}
        </form>
      </div>
    </>
  );
}
