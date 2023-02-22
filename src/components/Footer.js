import * as React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";

import classes from "./Header.module.css";

function Footer() {
	return (
		<AppBar
			position="fixed"
			className={classes.navBar}
			sx={{ top: "auto", bottom: 0 }}
		>
			<Toolbar>
				<Typography
					sx={{
						mr: 2,
						fontFamily: "monospace",
						letterSpacing: ".3rem",
						color: "white",
						textDecoration: "none",
					}}
				>
					&copy;{`${"Copyright Golden "}${new Date().getFullYear()}`}
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Footer;
