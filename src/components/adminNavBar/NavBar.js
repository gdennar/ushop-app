import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { adminNavData } from "../../data/AdminNavData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./NavBar.css";
import { useSelector } from "react-redux";

const NavBar = () => {
	const [showNav, setShowNav] = useState(true);
	const adminUserName = useSelector((state) => state.auth.userName);

	return (
		<div className="navbarr">
			<div className="user">
				<AccountCircleIcon
					sx={{
						fontSize: "50px",
					}}
				/>
				{adminUserName}
			</div>

			{/* <Drawer open={showNav} onClose={() => setShowNav(false)}> */}

			<nav>
				<ul>
					{adminNavData.map((item) => {
						return (
							<li
								key={item.id}
								className=""
								onClick={() => setShowNav(!showNav)}
							>
								<NavLink to={item.path} className="nav-link">
									<div className="text">{item.text}</div>
								</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* </Drawer> */}
		</div>
	);
};

export default NavBar;
