import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

import Header from "./component/Header";
import Login from "./component/auth/Login";
import GenreTable from "./component/genre/GenreTable";
import Footer from "./component/Footer";
import UserTable from "./component/user/UserTable";
import Register from "./component/auth/Register";
import Home from "./component/Home";
import GameTable from "./component/game/GameTable";

import Admin from "./component/Admin";
import Client from "./component/Client";
import ProtectedRoute from "./component/auth/ProtectedRoute";
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
			<div className="">
				<body className="mb-10">
					{/* Client Routes */}
					<Routes className="mx-auto">
						<Route
							path="/"
							element={
								<Client>
									<Home />
								</Client>
							}
						/>
						<Route
							path="/Home"
							element={
								<Client>
									<Home />
								</Client>
							}
						/>
						<Route
							path="/Login"
							element={
								<Client>
									<Login />
								</Client>
							}
						/>
						<Route
							path="/Register"
							element={
								<Client>
									<Register />
								</Client>
							}
						/>
					</Routes>
					{/* Admin Routes */}
					<Routes>
						<Route
							path="/admin/Genre"
							element={
								<ProtectedRoute>
									<GenreTable />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/User"
							element={
								<ProtectedRoute>
									<UserTable />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/Game"
							element={
								<ProtectedRoute>
									<GameTable />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/"
							element={
								<ProtectedRoute>
									<GameTable />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</body>
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
