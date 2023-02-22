import { Card } from "@mui/material";
import React, { useState } from "react";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddProducts.css";
import {
	addDoc,
	collection,
	doc,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const categories = [
	{
		id: 1,
		name: "Laptop",
	},
	{
		id: 2,
		name: "Phone",
	},
	{
		id: 3,
		name: "Fashion",
	},
	{
		id: 4,
		name: "Electronics",
	},
];

const initialState = {
	name: "",
	image: "",
	imageUrl: "",
	price: 0,
	category: "",
	brand: "",
	desc: "",
};

const detectForm = (id, f1, f2) => {
	if (id === "ADD") {
		return f1;
	}
	return f2;
};

const AddProducts = () => {
	const { id } = useParams();

	const selectProduct = useSelector((state) => state.product.products);

	const productEdit = selectProduct.find((prod) => prod.id === id);

	const [product, setProduct] = useState(() => {
		const newState = detectForm(id, { ...initialState }, productEdit);
		return newState;
	});

	const [uploadProgress, setUploadProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const storageRef = ref(storage, `uShop/${file}${Date.now()}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadProgress(progress);
			},
			(error) => {
				toast.error(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setProduct({ ...product, imageUrl: downloadURL });
					toast.success("Image uploaded successfully");
				});
			}
		);
	};

	const addProduct = (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const docRef = addDoc(collection(db, "products"), {
				name: product.name,
				imageUrl: product.imageUrl,
				price: +product.price,
				category: product.category,
				brand: product.brand,
				desc: product.desc,
				createdAT: Timestamp.now().toDate(),
			});
			setIsLoading(false);
			toast.success("Product added successfully");
			setProduct({ ...initialState });
			setUploadProgress(0);
		} catch (error) {
			setIsLoading(false);
			toast.error(error);
			setProduct({ ...initialState });
			setUploadProgress(0);
		}
	};

	const editProduct = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		let newInput = {
			name: product.name,
			imageUrl: product.imageUrl,
			price: +product.price,
			category: product.category,
			brand: product.brand,
			desc: product.desc,
			createdAT: productEdit.createdAT,
			editedAt: Timestamp.now().toDate(),
		};

		if (product.imageUrl !== productEdit.imageUrl) {
			const storageRef = ref(storage, productEdit.imageUrl);

			deleteObject(storageRef);
		}
		try {
			const editProductRef = doc(db, "products", id);
			await updateDoc(editProductRef, newInput);
			setIsLoading(false);
			toast.success("Product edited successfully");
			navigate("/admin/all-products");
		} catch (error) {
			setIsLoading(false);
			toast.error(error.message);
		}
	};
	return (
		<section className="main-content">
			{isLoading && <Loader />}
			<ToastContainer />
			<Card className="main-card">
				<div className="card-header">
					<div className="text-header">
						{detectForm(id, "Add Product", "Edit Product")}
					</div>
				</div>

				<div className="card-body">
					<form onSubmit={detectForm(id, addProduct, editProduct)}>
						<div className="form-group">
							<label>Product Name:</label>
							<input
								required
								className="form-control txt"
								name="name"
								id="name"
								type="text"
								placeholder="Product name"
								value={product.name}
								onChange={handleInputChange}
							/>
						</div>

						<div className="form-group">
							<label>Product Image:</label>
							<Card sx={{ p: 2 }} className="image-card">
								{uploadProgress === 0 ? null : (
									<div className="progress">
										<div
											className="progressBar"
											style={{ width: `${uploadProgress}%` }}
										>
											{uploadProgress < 100
												? `Uploading ${uploadProgress}%`
												: `Upload Complete ${uploadProgress}%`}
										</div>
									</div>
								)}

								<input
									className="form-control img"
									name="image"
									id="image"
									type="file"
									accept="image/*"
									onChange={(e) => handleImageChange(e)}
								/>
								{product.imageUrl === "" ? null : (
									<input
										type="text"
										required
										name="imageURL"
										value={product.imageUrl}
										disabled
										className="form-control txt img"
									/>
								)}
							</Card>
						</div>

						<div className="form-group">
							<label>Product Price:</label>
							<input
								required
								className="form-control txt"
								name="price"
								id="price"
								type="text"
								placeholder="Product Price"
								value={product.price}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>

						<div className="form-group">
							<label>Product Category:</label>
							<select
								required
								name="category"
								value={product.category}
								onChange={(e) => handleInputChange(e)}
							>
								<option value="" disabled>
									-- choose product category --{" "}
								</option>
								{categories.map((category) => {
									return (
										<option key={category.id} value={category.name}>
											{category.name}
										</option>
									);
								})}
							</select>
						</div>

						<div className="form-group">
							<label>Product Company/Brand:</label>
							<input
								required
								className="form-control txt"
								name="brand"
								id="brand"
								type="text"
								placeholder="Product brand"
								value={product.brand}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>

						<div className="form-group">
							<label>Product Description:</label>
							<textarea
								rows="5"
								cols="50"
								name="desc"
								value={product.desc}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>
						<input
							type="submit"
							className="btn"
							value={detectForm(id, "Add Product", "Edit Product")}
						/>
					</form>
				</div>
			</Card>
		</section>
	);
};

export default AddProducts;
