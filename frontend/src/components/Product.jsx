import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          style={{
            filter: product.countInStock === 0 ? 'grayscale(100%)' : 'none',
            opacity: product.countInStock === 0 ? 0.7 : 1,
          }}
        />
      </Link>
      {product.countInStock === 0 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 'inherit', // Matches the Card.Img border radius
            fontSize: '1.2rem',
            textAlign: 'center',
          }}
        >
          Sold Out
        </div>
      )}

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating value={product.rating} />
          <div>{`${product.numReviews} reviews`}</div>
        </Card.Text>

        <Card.Text as='h5' className='mt-3'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
