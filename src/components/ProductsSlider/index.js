import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from '../ProductItem';

// Product data
const products = [
  { name: "Soylent Green", title: "Siril Georgette Pink Saree", price: 45, oldPrice: 58 },
  { name: "Crimson Lotus", title: "Red Silk Saree with Blouse", price: 60, oldPrice: 80 },
  { name: "Ocean Mist", title: "Blue Cotton Saree", price: 30, oldPrice: 50 },
  { name: "Golden Thread", title: "Yellow Designer Saree", price: 75, oldPrice: 90 },
  { name: "Emerald Glow", title: "Green Banarasi Saree", price: 95, oldPrice: 120 },
  { name: "Twilight Charm", title: "Purple Silk Saree", price: 85, oldPrice: 110 },
  { name: "Rose Petal", title: "Pink Handloom Saree", price: 55, oldPrice: 70 },
];

const ProductsSlider = (props) => {
  return (
    <div className='productsSlider'>
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {products.map((product, idx) => (
          <SwiperSlide key={idx}>
            <ProductItem
              index={idx} // image selection
              name={product.name}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
