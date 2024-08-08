import React, { useContext } from "react";
import Unathorize from "./Unathorize";
import { UserContext } from "../../context/UserContext";
import Header from "../Header";
import Footer from "../Footer";
import Admin from "../Admin";

const ProtectedRoute = (props) => {
	const { user } = useContext(UserContext);
	console.log(">>> check user role: ", user);

	return (
		<>
			{user && user.role !== "Admin" ? (
				<>
					<header>
						<Header />
					</header>
					<body>
						<Unathorize />
					</body>
					<footer>
						<Footer />
					</footer>
				</>
			) : (
				<Admin>{props.children}</Admin>
			)}
		</>
	);
};

export default ProtectedRoute;
