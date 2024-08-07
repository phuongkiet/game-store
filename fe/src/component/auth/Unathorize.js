import React from "react";

export default function Unathorize() {
	return (
		<div className="flex flex-col items-center justify-center p-12">
			<h1 className="p-4 text-4xl font-bold">Unauthorized</h1>
			<p className="p-4">You don't have permission to access this page.</p>
			<button className="bg-sky-400 text-white px-4 py-2 rounded-md" onClick={() => (window.location.href = "/")}>
				Return to HomePage
			</button>
		</div>
	);
}
