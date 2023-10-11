import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { getAdsById } from "../../../redux/advertRedux";
import MountData from "../../../utils/MountData";
import { isLogged } from "../../../redux/userRedux";
import { IMAGES_URL } from "../../../config";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";


const SingleAddPage = () => {

    const {id} = useParams();
    const data = useSelector(state => getAdsById(state, id));
    const user = useSelector(isLogged);
    const navigate = useNavigate();

    const { loading } = MountData();
   
    if (loading) {
        return (
          <Spinner animation="border" role="status" className="d-block mx-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )
    }
    
    const advertImg = `${IMAGES_URL}${data.photo}`;
   
    const handleEditNavigate = () => {
        navigate(`/ads/edit/${id}`);
    };

    const handleDeleteNavigate = () => {
        navigate(`/ads/delete/${id}`);
    };
  
    return (
        <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Img src={advertImg} alt={data.title} />
              <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>Location: {data.location}</Card.Text>
                <Card.Text>Price: {data.price}</Card.Text>
                <Card.Text>Content: {data.content}</Card.Text>
                <Card.Text>Published: {data.publish_date}</Card.Text>
                <Card.Text>Seller: {data.seller}</Card.Text>
                {user && (
                  <div>
                      <Button variant="primary" onClick={handleEditNavigate}>Edit</Button>
                    <Button variant="danger" onClick={handleDeleteNavigate}>Delete</Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
};

export default SingleAddPage;