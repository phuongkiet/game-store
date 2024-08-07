import React from "react";
import ProtectedRoute from "./auth/ProtectedRoute";

const Admin = (props) => {
	return (
		<div className="h-full flex">
			<div className="h-screen w-52 bg-gray-300 mr-4">Sidebar</div>
			<div className="w-full">
				<ProtectedRoute>{props.children}</ProtectedRoute>;
			</div>
		</div>
	);
};

export default Admin;
