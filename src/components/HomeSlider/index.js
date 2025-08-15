import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';

// Import your images
import opinion from './opinion.png';
import image from './image.jpg';
import prostheticArm from './prosthetic_arm.jpg';

const HomeSlider = () => {
  const slides = [opinion, image, prostheticArm];

  return (
    <div className="image-slider-container">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000, // 3 seconds
          disableOnInteraction: false, // keeps autoplay even after user interaction
        }}
        className="image-swiper"
      >
        {slides.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="slide-image-container">
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
