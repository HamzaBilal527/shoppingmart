import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
  useCreateBrandMutation,
} from '../../slices/brandApiSlice';
import { toast } from 'react-toastify';

const BrandListScreen = () => {
  const { data, isLoading, error, refetch } = useGetBrandsQuery({});

  const [deleteBrand, { isLoading: loadingBrand }] = useDeleteBrandMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteBrand(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createBrand, { isLoading: loadingCreate }] = useCreateBrandMutation();

  const createBrandHandler = async () => {
    if (window.confirm('Are you sure you want to create a new category?')) {
      try {
        await createBrand();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Brands</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createBrandHandler}>
            <FaPlus /> Create Brand
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingBrand && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((brand) => (
                <tr key={brand._id}>
                  <td>{brand._id}</td>
                  <td>{brand.name}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/brand/${brand._id}/edit`}
                      variant='light'
                      className='btn-sm mx-2'
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(brand._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default BrandListScreen;
