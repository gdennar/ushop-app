import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./ProductDetails.css";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const ProductDetails = () => {
	const [productDetails, setProductDetails] = useState();

	const { id } = useParams();
	console.log(id);

	const getProduct = async () => {
		console.log("getting");
		const docRef = doc(db, "products", id);
		console.log("getting pr");
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const obj = {
				id: id,
				...docSnap.data(),
			};
			setProductDetails(obj);
		} else {
			setProductDetails("");
			toast.error("No product found");
		}
	};

	useEffect(() => {
		getProduct();
	}, []);

	return <div>Hi</div>;
};

export default ProductDetails;
