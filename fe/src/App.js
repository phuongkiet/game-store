import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import Login from "./component/Login";
import GenreTable from "./component/GenreTable";
import Footer from "./component/Footer";
import UserTable from "./component/UserTable";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/Register";
import Home from "./component/Home";

function App() {
	return (
		<BrowserRouter>
			<div className="container mx-auto">
				<header>
					<Header />
				</header>
				<body className="mb-10">	
					<Routes>
						<Route path="/" element={<Home/>}/>	
						<Route path="/Genre" element={<GenreTable />} />
						<Route path="/User" element={<UserTable />} />
						<Route path="/Login" element={<Login/>}/>
						<Route path="/Register" element={<Register/>}/>
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
