import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import "./ViewProducts.css";
import { db, storage } from "../../firebase/config";
import Loader from "../Loader";
import Tables from "../Table";
import Notiflix from "notiflix";
import { deleteObject, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../store/productSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";

const ViewProducts = () => {
	const { data, isLoading } = useFetchCollection("products");
	const products = useSelector((state) => state.product.products);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			productAction.storeProducts({
				products: data,
			})
		);
	}, [dispatch, data]);

	const confirmDelete = (id, imageUrl) => {
		Notiflix.Confirm.show(
			"Delete Product?",
			"You are about to delete this product?",
			"Delete",
			"Cancel",
			function okCb() {
				deleteProduct(id, imageUrl);
			},
			function cancelCb() {
				alert("ok! If you say so...");
			},
			{
				width: "320px",
				borderRadius: "5px",
				okButtonBackground: "#ffb700",
				titleColor: "#ffb700",
				titleFontSize: "1.2rem",
				cssAnimationStyle: "zoom",
			}
		);
	};

	const deleteProduct = async (id, imageUrl) => {
		try {
			await deleteDoc(doc(db, "products", id));

			const storageRef = ref(storage, imageUrl);

			await deleteObject(storageRef);
			toast.success("Product Deleted");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<div>
				{isLoading && <Loader />}
				<ToastContainer />
				<h3>All Products</h3>
				{products.length === 0 ? (
					<>
						<p>No product found!</p>
					</>
				) : (
					<>
						<Tables
							data={products}
							onDelete={(id, imageUrl) => confirmDelete(id, imageUrl)}
						/>
					</>
				)}
			</div>
		</>
	);
};

export default ViewProducts;
