import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <Container fluid className="footer fixed-bottom bg-light text-center py-2">
            <p className="text-muted">Copyright &copy; 2023</p>
        </Container>
    );
};

export default Footer;
