import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
export const sidebarData = [
	{
		id: 1,
		text: "Admin",
		path: "/admin",
	},
	{
		id: 2,
		text: "Home",
		path: "/",
	},
	{
		id: 3,
		text: "Contact Us",
		path: "/contact",
	},
	{
		id: 4,
		text: "Login",
		path: "/login",
	},
	{
		id: 5,
		text: "My Orders",
		path: "/orders",
	},
	{
		id: 6,
		path: "/cart",
		icon: <ShoppingCartIcon />,
	},
	{
		id: 7,
		path: "/logout",
		icon: <LogoutIcon />,
	},
];
