import { Row, Col, ListGroup, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { useGetBrandsQuery } from '../slices/brandApiSlice';
import { useGetCategoriesQuery } from '../slices/categoryApiSlice';
import { useState } from 'react';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { isAdmin = false } = userInfo || {};
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const {
    data: brands,
    isLoading: brandLoading,
    error: brandError,
  } = useGetBrandsQuery({});

  const {
    data: categories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetCategoriesQuery({});

  const handleFilterReset = () => {
    setSelectedBrand('');
    setSelectedCategory('');
  };

  return (
    <>
      {' '}
      {!isAdmin ? (
        <>
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to='/' className='btn btn-light mb-4'>
              Go Back
            </Link>
          )}

          {/* Accordion for Filters (Visible in Mobile View) */}
          <Accordion defaultActiveKey='0' className='d-md-none mb-3'>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Filter Products</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item variant='light' className='fw-bold'>
                    Filter by Brand
                  </ListGroup.Item>
                  {brandLoading ? (
                    <Loader />
                  ) : brandError ? (
                    <Message variant='danger'>
                      {brandError?.data?.message || brandError.error}
                    </Message>
                  ) : (
                    <>
                      {brands.map((brand) => (
                        <ListGroup.Item
                          key={brand._id}
                          action
                          active={selectedBrand === brand.name}
                          onClick={() => setSelectedBrand(brand.name)}
                          style={{ cursor: 'pointer' }}
                        >
                          {brand.name}
                        </ListGroup.Item>
                      ))}
                    </>
                  )}
                  <ListGroup.Item
                    variant='light'
                    className='fw-bold mt-4'
                    style={{
                      borderTop: '1px solid #c1d3df',
                      borderRadius: selectedCategory ? '0' : '0.25rem',
                    }}
                  >
                    Filter by Category
                  </ListGroup.Item>
                  {categoryLoading ? (
                    <Loader />
                  ) : categoryError ? (
                    <Message variant='danger'>
                      {categoryError?.data?.message || categoryError.error}
                    </Message>
                  ) : (
                    <>
                      {categories.map((category) => (
                        <ListGroup.Item
                          key={category._id}
                          action
                          active={selectedCategory === category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          style={{ cursor: 'pointer' }}
                        >
                          {category.name}
                        </ListGroup.Item>
                      ))}
                    </>
                  )}
                  <ListGroup.Item
                    variant='secondary'
                    action
                    className='text-center mt-4'
                    onClick={handleFilterReset}
                    style={{
                      cursor: 'pointer',
                      borderTop: '1px solid #c1d3df',
                      borderRadius: selectedCategory ? '0' : '0.25rem',
                    }}
                  >
                    Reset Filters
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Row>
            {/* Sidebar for Larger Screens */}
            <Col md={3} className='d-none d-md-block'>
              <ListGroup>
                <ListGroup.Item
                  variant='light'
                  className='fw-bold'
                  style={{
                    borderTop: '1px solid #bdcecf',
                    borderRadius: selectedCategory ? '0' : '0.25rem',
                  }}
                >
                  Filter by Brand
                </ListGroup.Item>
                {brandLoading ? (
                  <Loader />
                ) : brandError ? (
                  <Message variant='danger'>
                    {brandError?.data?.message || brandError.error}
                  </Message>
                ) : (
                  <>
                    {brands.map((brand) => (
                      <ListGroup.Item
                        key={brand._id}
                        action
                        active={selectedBrand === brand.name}
                        onClick={() => setSelectedBrand(brand.name)}
                        style={{ cursor: 'pointer' }}
                      >
                        {brand.name}
                      </ListGroup.Item>
                    ))}
                  </>
                )}
                <ListGroup.Item
                  variant='light'
                  className='fw-bold mt-4'
                  style={{
                    borderTop: '1px solid #bdcecf',
                    borderRadius: selectedCategory ? '0' : '0.25rem',
                  }}
                >
                  Filter by Category
                </ListGroup.Item>
                {categoryLoading ? (
                  <Loader />
                ) : categoryError ? (
                  <Message variant='danger'>
                    {categoryError?.data?.message || categoryError.error}
                  </Message>
                ) : (
                  <>
                    {categories.map((category) => (
                      <ListGroup.Item
                        key={category._id}
                        action
                        active={selectedCategory === category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        {category.name}
                      </ListGroup.Item>
                    ))}
                  </>
                )}
                <ListGroup.Item
                  variant='secondary'
                  action
                  className='text-center mt-4'
                  onClick={handleFilterReset}
                  style={{
                    cursor: 'pointer',
                    borderTop: '1px solid #bdcecf',
                    borderRadius: '0.25rem 0.25rem 0.25rem 0.25rem',
                  }}
                >
                  Reset Filters
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Product Display */}
            <Col md={9}>
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>
                  {error?.data?.message || error.error}
                </Message>
              ) : (
                <>
                  <Meta />
                  <h1>Latest Products</h1>
                  <Row>
                    {data?.products
                      .filter((product) => {
                        if (!selectedBrand && !selectedCategory) {
                          return true;
                        }
                        const matchesBrand =
                          !selectedBrand || product.brand === selectedBrand;
                        const matchesCategory =
                          !selectedCategory ||
                          product.category === selectedCategory;
                        return matchesBrand && matchesCategory;
                      })
                      .map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                          <Product product={product} />
                        </Col>
                      ))}
                  </Row>
                  <Paginate
                    pages={data.pages}
                    page={data.page}
                    keyword={keyword ? keyword : ''}
                  />
                </>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <>
          {' '}
          <ListGroup
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <ListGroup.Item
              style={{
                width: '50%',
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <Link
                to='/admin/productlist'
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <h4>Products</h4>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item
              style={{
                width: '50%',
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <Link
                to='/admin/orderlist'
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <h4>Orders</h4>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item
              style={{
                width: '50%',
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <Link
                to='/admin/userlist'
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <h4>Users</h4>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item
              style={{
                width: '50%',
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <Link
                to='/admin/brandlist'
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <h4>Brands</h4>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item
              style={{
                width: '50%',
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <Link
                to='/admin/categorylist'
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <h4>Categories</h4>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
    </>
  );
};

export default HomeScreen;
