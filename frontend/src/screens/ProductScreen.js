import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
    listProductDetails,
    createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(
        (state) => state.productReviewCreate
    );
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment("");
        }
        if (!product._id || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id));
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
    }, [dispatch, match, successProductReview, product]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        );
    };

    return (
        <div>
            <Link to="/" className="btn btn-outline-primary my-3">
                Go Home
            </Link>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="warning">{error}</Message>
            ) : (
                <>
                    <Row className="my-5" gap={2}>
                        <Col md={9} className="mb-4">
                            <Row className="bg-light mx-2" variant="flush">
                                <Col md={7} style={{ padding: 0 }}>
                                    <Image src={product.image} fluid />
                                </Col>

                                <Col md={5}>
                                    <ListGroup
                                        variant="flush"
                                        className="rounded m-2"
                                    >
                                        <ListGroup.Item className="py-3">
                                            <h5>{product.name}</h5>
                                        </ListGroup.Item>

                                        <ListGroup.Item className="py-3">
                                            <Rating
                                                value={product.rating}
                                                text={`${product.numReviews} reviews`}
                                            />
                                        </ListGroup.Item>   

                                        <ListGroup.Item className="py-3">
                                            ${product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item className="py-3">
                                            {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={3}>
                            <ListGroup
                                variant="flush"
                                className="mx-2 bg-light"
                            >
                                <ListGroup.Item className="py-3">
                                    <Row className="mx-1">
                                        <Col>Price:</Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item className="py-3">
                                    <Row className="mx-1">
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item className="py-3">
                                        <Row className="mx-1 align-items-center">
                                            <Col>Quantity:</Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(e.target.value)
                                                    }
                                                    style={{ outline: "none" }}
                                                >
                                                    {[
                                                        ...Array(
                                                            product.countInStock
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
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item className="py-3">
                                    <Button
                                        variant="primary"
                                        className="mx-1"
                                        disabled={!product.countInStock}
                                        onClick={addToCartHandler}
                                    >
                                        {product.countInStock
                                            ? "Add to Cart"
                                            : "Out of Stock"}
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && (
                                <Message>No Reviews</Message>
                            )}
                            <ListGroup className="my-4" variant="flush">
                                {product.reviews.map((review) => (
                                    <ListGroup.Item
                                        key={review._id}
                                        className="my-2"
                                    >
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                            <br />
                                            {review.comment}
                                        </p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h3 className="my-3">
                                        Write a Customer Review
                                    </h3>
                                    {successProductReview && (
                                        <Message variant="success">
                                            Review submitted successfully
                                        </Message>
                                    )}
                                    {loadingProductReview && <Loader />}
                                    {errorProductReview && (
                                        <Message variant="danger">
                                            {errorProductReview}
                                        </Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group
                                                controlId="rating"
                                                className="my-2"
                                            >
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select...
                                                    </option>
                                                    <option value="1">
                                                        1 - Poor
                                                    </option>
                                                    <option value="2">
                                                        2 - Fair
                                                    </option>
                                                    <option value="3">
                                                        3 - Good
                                                    </option>
                                                    <option value="4">
                                                        4 - Very Good
                                                    </option>
                                                    <option value="5">
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group
                                                controlId="comment"
                                                className="my-2"
                                            >
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    row="3"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingProductReview}
                                                type="submit"
                                                variant="primary"
                                                className="my-3"
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please{" "}
                                            <Link to="/login">sign in</Link> to
                                            write a review{" "}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default ProductScreen;
