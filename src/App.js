import { Route, BrowserRouter, Routes } from "react-router-dom";
import AdminRoute from "./components/adminRoute/AdminRoute";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {
	Home,
	Contact,
	Login,
	Register,
	Reset,
	Admin,
	ProductDetails,
} from "./pages";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/reset-password" element={<Reset />} />

					<Route
						path="/admin/*"
						element={
							<AdminRoute>
								<Admin />
							</AdminRoute>
						}
					/>
					<Route path="/product-details/:id" element={<ProductDetails />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
