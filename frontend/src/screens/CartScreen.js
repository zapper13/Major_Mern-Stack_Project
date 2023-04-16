import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    };

    return (
        <Row>
            <h3 className="my-4">Shopping Cart</h3>
            <Col md={8}>
                {cartItems.length === 0 ? (
                    <Message variant="info">
                        Your cart is empty,{" "}
                        <Link to="/" style={{ textDecoration: "none" }}>
                            Go Shopping
                        </Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row className="align-items-center">
                                    <Col md={2} className="my-2">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                        ></Image>
                                    </Col>
                                    <Col md={4}>
                                        <Link
                                            to={`/product/${item.product}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        Number(e.target.value)
                                                    )
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.product
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="d-flex flex-column">
                            <div className="d-flex align-items-center my-1">
                                <h4>Subtotal:</h4>
                                <h4 className="ms-auto">
                                    {cartItems.reduce(
                                        (acc, item) => acc + item.qty,
                                        0
                                    )}{" "}
                                    items
                                </h4>
                            </div>
                            <div className="d-flex align-items-center my-1">
                                <h4>Total:</h4>
                                <h4 className="ms-auto">
                                    {" "}
                                    $
                                    {cartItems
                                        .reduce(
                                            (acc, item) =>
                                                acc + item.qty * item.price,
                                            0
                                        )
                                        .toFixed(2)}
                                </h4>
                            </div>
                            <button
                                className="btn btn-block btn-primary mt-3 mb-2"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Checkout
                            </button>
                            <button
                                className="btn btn-block btn-light mb-1"
                                disabled={cartItems.length === 0}
                            >
                                <Link to="/" style={{ textDecoration: "none" }}>
                                    Continue Shopping
                                </Link>
                            </button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;
