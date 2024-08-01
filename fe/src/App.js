import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import Login from "./component/Login";
import GenreTable from "./component/GenreTable";
import { ToastContainer, toast } from 'react-toastify';

function App() {
	return (
		<>
			<div className="container mx-auto">
				<header>
					<Header/>
				</header>
				<body>	
					{/* <Login/> */}
					<GenreTable/>
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
		</>
	);
}

export default App;
