import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import Login from "./component/auth/Login";
import GenreTable from "./component/genre/GenreTable";
import Footer from "./component/Footer";
import UserTable from "./component/user/UserTable";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/auth/Register";
import Home from "./component/Home";
import GameTable from "./component/game/GameTable";
import Admin from "./component/Admin";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Switch } from "@headlessui/react";

function App() {
	const { user, login } = useContext(UserContext);

	console.log(">> check user: ", user);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			login(localStorage.getItem("token"));
		}
	}, []);

	return (
		<BrowserRouter>
			<div className="container mx-auto">
				<header>
					<Header />
				</header>
				<body className="mb-10">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Home" element={<Home />} />
						<Route path="/Admin" Component={<Admin />} />
						<Route path="/Genre" element={<GenreTable />} />
						<Route path="/User" element={<UserTable />} />
						<Route path="/Game" element={<GameTable />} />
						<Route path="/Login" element={<Login />} />
						<Route path="/Register" element={<Register />} />
					</Routes>
				</body>
				<footer>
					<Footer />
				</footer>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</BrowserRouter>
	);
}

export default App;
