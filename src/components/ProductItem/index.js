import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

import item1 from './item1.jpg';
import item2 from './item2.jpg';
import item3 from './item3.jpg';
import item4 from './item4.jpg';
import item5 from './item5.jpg';
import item6 from './item6.jpg';
import item7 from './item7.jpg';

const images = [item1, item2, item3, item4, item5, item6, item7];

const ProductItem = ({ index = 0, name, title, price, oldPrice }) => {
  const productImage = images[index % images.length];
  const discount = oldPrice && price ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

  return (
    <div className="productItem">
      <div className="imgWrapper">
        <img src={productImage} alt={name} />
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
