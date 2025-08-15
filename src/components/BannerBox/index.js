import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

const BannerBox = (props) => {
    return (
        <div className="box banner-box">
            <Link to="/" className="banner-link">
                <img src={props.img} alt="Banner" className="banner-img" />
            </Link>
        </div>
    );
};

export default BannerBox;
