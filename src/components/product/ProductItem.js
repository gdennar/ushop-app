import React from "react";
import "./ProductItem.css";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ProductItem = ({ grid, product, id, name, price, imageUrl, desc }) => {
	const shortenText = (text, num) => {
		if (text.length > num) {
			const shortText = text.substring(0, num).concat("...");
			return shortText;
		}
		return text;
	};

	return (
		<Card className={grid ? "grid" : "list"}>
			<Link to={`/product-details/${id}`} className="prod-link">
				<div className="img">
					<img src={imageUrl} alt={name} />
				</div>
			</Link>
			<div className="prd-content">
				<div className="details">
					<p>{`₦${price.toLocaleString()}`}</p>
					<p>{shortenText(name, 18)}</p>
				</div>
				{!grid && <p className="desc">{shortenText(desc, 200)}</p>}
				<Button className="button-prd">Add to cart</Button>
			</div>
		</Card>
	);
};

export default ProductItem;
