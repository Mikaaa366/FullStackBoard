import { useSelector } from 'react-redux';
import { getAllAds } from '../../../redux/advertRedux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import AdvertBox from '../../features/AdvertBox/AdvertBox';
import MountData from '../../../utils/MountData';

const HomePage = () => {
    const { loading } = MountData();

    const advertsData = useSelector(state => getAllAds(state).data);

    if (loading) {
        return (
            <Spinner animation="border" role="status" className="d-block mx-auto">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    } else
    return (
        <Container>
            <Row xs={1} md={2} lg={3} xl={5} className="g-4">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    advertsData.map((advert) => (
                        <Col key={advert._id}>
                            <AdvertBox advert={advert} />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default HomePage;