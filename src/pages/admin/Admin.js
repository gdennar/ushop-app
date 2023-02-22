import React from "react";
import "./Admin.css";
import NavBar from "../../components/adminNavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "../../components/admin/Home";
import ViewProducts from "../../components/admin/ViewProducts";
import Order from "../../components/admin/Order";
import AddProducts from "../../components/admin/AddProducts";

const Admin = () => {
	return (
		<div className="admin">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="adminContent">
				<Routes>
					<Route path="home" element={<Home />} />
					<Route path="add-product/:id" element={<AddProducts />} />
					<Route path="all-products" element={<ViewProducts />} />
					<Route path="orders" element={<Order />} />
				</Routes>
			</div>
		</div>
	);
};

export default Admin;
