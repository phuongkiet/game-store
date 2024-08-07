import React, { useContext } from "react";
import Unathorize from "./Unathorize";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = (props) => {
	const { user } = useContext(UserContext);
	console.log(">>> check user role: ", user);

	return <>{user && user.role !== "Admin" ? <Unathorize /> : <>{props.children}</>}</>;
};

export default ProtectedRoute;
