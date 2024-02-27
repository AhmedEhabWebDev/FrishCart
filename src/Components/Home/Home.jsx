import React from "react";
import styles from "./Home.module.css";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct.jsx";
import MainSlider from "../MainSlider/MainSlider.jsx";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider.jsx";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategoriesSlider/>
      <FeaturedProduct />
    </>
  );
}
