import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { HiOutlineCog } from "react-icons/hi";

function Sidebar() {
	return (
		<div className="bg-gray-900 text-white w-64 space-y-6 py-7 px-2 h-screen">
			<a href="#" className="text-white flex items-center space-x-2 px-4">
				<span className="sr-only">Khú Phứa</span>
				<img
				alt="Company Logo"
				src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
				className="h-10 w-auto"
				/>
			</a>
			<nav className="space-y-4">
				<a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<IoHomeOutline className="inline-block h-5 w-5 mr-2" />
					Home
				</a>
				<a href="/admin/User" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<FaRegUser className="inline-block h-5 w-5 mr-2" />
					User
				</a>
				<a href="/admin/Game" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<FaGamepad className="inline-block h-5 w-5 mr-2" />
					Games
				</a>
				<a href="/admin/Genre" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<BiCategory className="inline-block h-5 w-5 mr-2" />
					Genre
				</a>
				<a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<IoHomeOutline className="inline-block h-5 w-5 mr-2" />
					Null
				</a>
				<a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<IoHomeOutline className="inline-block h-5 w-5 mr-2" />
					Null
				</a>
				<a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<HiOutlineCog className="inline-block h-5 w-5 mr-2" />
					Settings
				</a>
			</nav>
		</div>
	);
}

export default Sidebar;
