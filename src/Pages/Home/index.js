import React from 'react';
import HomeSlider from '../../components/HomeSlider';
import { LiaShippingFastSolid } from "react-icons/lia";
import './style.css';
import AdsBannerSlider from '../../components/AdsBannerSlider';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductsSlider from '../../components/ProductsSlider';
import Footer from '../../components/Footer';


import { Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper/modules";
const Home = () => {
  return (
    <div>
      <HomeSlider />

      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <div className="left-sec">
              <h2 className="featured-title">Featured Products</h2>
              <p className="featured-subtitle">
                Do not miss the current offers until the end of August.
              </p>
            </div>

            <div className="rightSec">


            </div>



          </div>

          <ProductsSlider items={7}/>

        </div>
      </section>

      <section className="shipping-section">
        <div className="container">
          <div className="free-shipping">
            <div className="shipping-col1">
              <LiaShippingFastSolid className="shipping-icon" />
              <span className="shipping-title">Free Shipping</span>
            </div>
            <div className="shipping-col2">
              <p className="shipping-text">Free Delivery Now On Your First Order</p>
            </div>
            <p className="shipping-price">-Only $200*</p>
          </div>

          <AdsBannerSlider items={4} />
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;
