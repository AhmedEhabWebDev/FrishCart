import React from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx';

export default function Layout() {
  return <>
  <Navbar/>

  <div className="container"><Outlet></Outlet></div>

  <Footer/>
  </>
}
