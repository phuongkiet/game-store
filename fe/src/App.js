import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import Login from "./component/Login";
import GenreTable from "./component/GenreTable";
import Footer from "./component/Footer";
import UserTable from "./component/UserTable";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<div className="container mx-auto">
				<header>
					<Header />
				</header>
				<body className="mb-10">	
					{/* <Login/> */}
					<Routes>
						<Route path="/Genre" element={<GenreTable />} />
						<Route path="/User" element={<UserTable />} />
					</Routes>
				</body>
				<footer>
					<Footer/>
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
