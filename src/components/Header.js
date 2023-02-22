import React, { useState, useEffect } from "react";
import {
	AppBar,
	Box,
	useTheme,
	useMediaQuery,
	Toolbar,
	Button,
} from "@mui/material";
import { Container } from "@mui/material";
import logo from "../assests/uShop-logo.png";
import classes from "./Header.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/authSlice";
import NavDrawer from "./NavDrawer";
import { AdminLink } from "./adminRoute/AdminRoute";

// const navStyle = ({ isActive }) =>
// 	isActive ? `${classes.navActive}` : `${classes..navLink}`;

function Header() {
	const [displayUName, setDisplayUName] = useState("");

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const logoutHandler = () => {
		signOut(auth)
			.then(() => {
				toast.success("Logged out successfully");
				navigate("/login");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				if (user.displayName == null) {
					const displayEmail = user.email.split("@")[0];
					const uName =
						displayEmail.charAt(0).toUpperCase() + displayEmail.slice(1);
					setDisplayUName(uName);
				} else {
					setDisplayUName(user.displayName);
				}
				dispatch(
					authAction.setActiveUser({
						email: user.email,
						userName: displayUName,
						userID: user.uid,
					})
				);
			} else {
				setDisplayUName("");
				dispatch(authAction.removeActiveUser());
			}
		});
	});

	return (
		<section className="main-header">
			<ToastContainer />
			<AppBar position="static" className={classes.navBar}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						{/* Desktop Menu */}
						<Link to="/">
							<Box>
								<img src={logo} width={150} alt="logo" />
							</Box>
						</Link>
						{isMatch ? (
							<NavDrawer />
						) : (
							<>
								<Box sx={{ m: 1, display: { xs: "none", md: "flex" } }}>
									<AdminLink>
										<Button
											sx={{
												backgroundColor: "#ffb700",
												"&:hover": {
													border: "2px solid #ffb700",
													color: "#ffb700",
													backgroundColor: "white",
												},
											}}
											variant="contained"
											size="small"
											onClick={() => {
												navigate("/admin/home");
											}}
										>
											Admin
										</Button>
									</AdminLink>
									<NavLink to="/" className={classes.navLink}>
										<p className="nav-text">Home</p>
									</NavLink>
									<NavLink to="contact" className={classes.navLink}>
										<p className="nav-text">Contact Us</p>
									</NavLink>
								</Box>

								{/* Right hand Menu */}
								<Box sx={{ flexGrow: 0, display: "flex", marginLeft: "auto" }}>
									{isUserLoggedIn && (
										<NavLink to="" className={classes.navLink}>
											<p className="nav-text">
												HI,
												<span>{displayUName}</span>
											</p>
										</NavLink>
									)}
									{isUserLoggedIn && (
										<NavLink to="" className={classes.navLink}>
											<p>My Orders</p>
										</NavLink>
									)}
									<NavLink to="" className={classes.navLink}>
										<p>
											<ShoppingCartIcon />
										</p>
									</NavLink>
									{!isUserLoggedIn && (
										<NavLink to="/login" className={classes.navLink}>
											<p>LOGIN</p>
										</NavLink>
									)}
									{isUserLoggedIn && (
										<div className={classes.navLink}>
											<p>
												<LogoutIcon onClick={logoutHandler} />
											</p>
										</div>
									)}
								</Box>
							</>
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</section>
	);
}
export default Header;
