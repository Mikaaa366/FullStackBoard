import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { format } from 'date-fns';

const AdvertForm = ({ action, actionText, ...props }) => {

    const [title, setTitle] = useState(props.title || '');
    const [content, setContent] = useState(props.content || '');
    const [publish_date, setPublish_date] = useState(props.publish_date ? format(new Date(props.publish_date), 'dd.MM.yyyy') : format(new Date(), 'dd.MM.yyyy'));
    const [photo, setPhoto] = useState(props.photo || null);
    const [price, setPrice] = useState(props.price || '');
    const [location, setLocation] = useState(props.location || '');
   
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if(content && publish_date) {
            action({ title, content, publish_date, photo, price, location});
        }
    };

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} />
            </Form.Group>

            <Form.Group>
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" onChange={e => setPhoto(e.target.files[0])} />
            </Form.Group>

            <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" value={content} onChange={e => setContent(e.target.value)} />
            </Form.Group>

            <Button variant="success" type="submit">
                {actionText}
            </Button>
        </Form>
    )
};

export default AdvertForm;