import { Drawer, IconButton, List, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { sidebarData } from "../data/SideBarData";
import { NavLink } from "react-router-dom";
import "./NavDrawer.css";

const NavDrawer = () => {
	const [showNav, setShowNav] = useState(false);
	return (
		<>
			<Drawer open={showNav} onClose={() => setShowNav(false)}>
				<Box
					sx={{
						width: "250px",
						height: "100vh",
						backgroundColor: "rgba(4, 20, 42, 0.937)",
					}}
				>
					{sidebarData.map((item) => {
						return (
							<List
								onClick={() => setShowNav(!showNav)}
								key={item.id}
								className="sideNav-list"
								sx={{
									m: 2,
								}}
							>
								<NavLink to={item.path} className="nav-link">
									<span className="icon">{item.icon}</span>
									<span className="text">{item.text}</span>
								</NavLink>
							</List>
						);
					})}
				</Box>
			</Drawer>
			<IconButton
				sx={{ color: "white", marginLeft: "auto" }}
				onClick={() => setShowNav(!showNav)}
			>
				<MenuIcon />
			</IconButton>
		</>
	);
};

export default NavDrawer;
