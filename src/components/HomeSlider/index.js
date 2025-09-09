import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';

// Images from public folder
import opinion from './opinion.png';
import image from './image.jpg';
import prostheticArm from './prosthetic_arm.jpg';

const HomeSlider = () => {
  const slides = [opinion, image, prostheticArm];

  return (
    <div className="featured-section">
      <div className="product-slider-container">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          className="product-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="product-slide">
                <img src={slide} alt={`Slide ${index + 1}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
