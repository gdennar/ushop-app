import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
	const userEmail = useSelector((state) => state.auth.email);

	const navigate = useNavigate();
	if (userEmail === "test@gmail.com") {
		return children;
	}
	return (
		<>
			<div style={{ paddingLeft: "20px" }}>
				<h3>Permission Denied</h3>
				<p>This page can only be viewed by an Admin User</p>
				<br />

				<Button
					variant="contained"
					onClick={() => {
						navigate("/");
					}}
				>
					&larr; Back To Home
				</Button>
			</div>
		</>
	);
};

export const AdminLink = ({ children }) => {
	const userEmail = useSelector((state) => state.auth.email);

	if (userEmail === "test@gmail.com") {
		return children;
	}
	return null;
};
export default AdminRoute;
