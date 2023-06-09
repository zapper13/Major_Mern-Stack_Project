/**
 * The Header component is a React functional component that renders a navigation bar with links to
 * different pages and options for user authentication and admin privileges.
 * @returns The Header component is being returned, which contains a Navbar with links to various pages
 * such as the cart, user profile, and admin pages. It also includes a search box and a login/logout
 * button depending on whether the user is logged in or not.
 */
import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container className="px-3">
                    <LinkContainer to="/">
                        <Navbar.Brand>Online Outpost</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className="justify-content-end"
                    >
                        <Route
                            render={({ history }) => (
                                <SearchBox history={history} />
                            )}
                        />
                        <Nav>
                            <LinkContainer to="/cart">
                                <Nav.Link className="mx-3">
                                    <i
                                        className="fa fa-shopping-cart"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp; Cart
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link className="mx-3">
                                        <i
                                            className="fa fa-user"
                                            aria-hidden="true"
                                        ></i>
                                        &nbsp; Login
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
