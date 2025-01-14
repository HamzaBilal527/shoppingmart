import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetBrandDetailsQuery,
  useUpdateBrandMutation,
} from '../../slices/brandApiSlice';

const BrandEditScreen = () => {
  const { id: brandId } = useParams();

  const [name, setName] = useState('');

  const {
    data: brand,
    isLoading,
    refetch,
    error,
  } = useGetBrandDetailsQuery(brandId);

  const [updateBrand, { isLoading: loadingUpdate }] = useUpdateBrandMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateBrand({
        brandId,
        name,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Brand updated');
      refetch();
      navigate('/admin/brandlist', { replace: true });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (brand) {
      setName(brand.name);
    }
  }, [brand]);

  return (
    <>
      <Link to='/admin/brandlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Brand</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BrandEditScreen;
