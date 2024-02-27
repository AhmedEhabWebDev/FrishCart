import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();
  let { setUserToken } = useContext(UserContext);

  async function loginSubmit(values) {
    setLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    if (data.message == "success") {
      setLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][\w @]{5,8}$/,
        "You must start with a capital letter, and there are special character and numbers ex(Ahmed123@)"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-4 mt-100px">
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

          <label htmlFor="password">password : </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="password"
            name="password"
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-2">
              {formik.errors.password}
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
              login
            </button>
          )}
          <Link to={"/forgetpassword"} className="x mx-3">
            Forget Password?
          </Link>
        </form>
      </div>
    </>
  );
}
