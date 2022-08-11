import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='card my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          className='product-img'
          src={product.image}
          alt={product.name}
          variant='top'
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className='link'>
          <Card.Title as='div'>
            <strong className='theme-color'>{product.name}</strong>
          </Card.Title>
        </Link>
        <div className='rating-price-container'>
          <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as='h3'>${product.price}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
