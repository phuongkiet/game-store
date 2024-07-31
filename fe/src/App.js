import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import Login from "./component/Login";

function App() {
	return (
		<div className="container">
			<header>
				<Header/>
			</header>
			<body>	
				<Login/>
			</body>
		</div>
	);
}

export default App;
