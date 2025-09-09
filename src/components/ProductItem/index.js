import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const ProductItem = ({ img, name, title, price, oldPrice }) => {
  const discount = oldPrice && price ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

  return (
    <div className="productItem">
      <div className="imgWrapper">
        <img src={img} alt={name} />
        {discount > 0 && <span className="discount">{discount}%</span>}
      </div>

      <div className="info">
        <h6><Link to="/" className="link">{name}</Link></h6>
        <h3 className="title"><Link to="/" className="link">{title}</Link></h3>
        <div className="price-row">
          {oldPrice && <span className="oldPrice">${oldPrice.toFixed(2)}</span>}
          {price && <span className="price">${price.toFixed(2)}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;