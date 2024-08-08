import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Admin = (props) => {
	return (
		<div className="mx-auto justify-center">
			<header>
				<Header />
			</header>
			<body>{props.children}</body>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default Admin;
