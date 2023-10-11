import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { IMAGES_URL } from '../../../config';
import { Link } from 'react-router-dom';

const AdvertBox = ({ advert }) => {
    return (
        <Card style={{ width: '18rem', border: '1px solid #ccc' }}>
            <Card.Img
                variant="top"
                src={`${IMAGES_URL}${advert.photo}`}
                alt={advert.title}
                style={{
                    width: '200px',
                    height: '150px',
                    margin: '10px auto',
                    marginTop: '10px'
                }}
            />
            <Card.Body className="text-center">
                <Card.Title>{advert.title}</Card.Title>
                <Card.Text>Location: {advert.location}</Card.Text>
                <Link to={'/ads/' + advert._id}>
                <Button className="btn btn-primary">Read more</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default AdvertBox;