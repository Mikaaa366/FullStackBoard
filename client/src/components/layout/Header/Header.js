import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { isLogged } from '../../../redux/userRedux';

const Header = () => {
    const loggedUser = useSelector(isLogged);

    return (
        <Navbar bg="info" data-bs-theme="primary" className="rounded my-4 px-4">
            <Navbar.Brand as={Link} to="/" className="me-auto text-white">ADS App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/" exact className="text-white mx-3" activeClassName="fw-bold">
                        Home
                    </Nav.Link>
                </Nav>
                <Nav>
                    {!loggedUser ? (
                        <>
                            <Nav.Link as={NavLink} to="/login" className="text-white" activeClassName="fw-bold">
                                Sign In
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/register" className="text-white" activeClassName="fw-bold">
                                Sign Up
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                        <Nav.Link as={NavLink} to="/ads/add" className="text-white" activeClassName="fw-bold">
                            New Add
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/logout" className="text-white" activeClassName="fw-bold">
                            Logout
                        </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;