/**
 * The Product function is a React component that renders a Card with product information, including an
 * image, name, rating, and price.
 * @returns The `Product` component is being returned, which renders a `Card` from `react-bootstrap`
 * with an image, product name, rating, and price. The `Link` component from `react-router-dom` is used
 * to link to the product details page. The `Rating` component is a custom component that displays a
 * star rating based on the `value` prop and the number of reviews based
 */
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product({ product }) {
    return (
        <Card className="my-3" style={{ width: "18rem" }}>
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>

            <Card.Body>
                <Card.Text as="div">
                    <Link
                        to={`/product/${product._id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <strong>{product.name}</strong>
                    </Link>
                </Card.Text>

                <Card.Text as="div" className="my-3">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} Reviews`}
                    />
                </Card.Text>

                <Card.Text as="h4">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
