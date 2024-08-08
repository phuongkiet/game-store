import React from "react";
import { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Admin = (props) => {
	const { logout, user } = useContext(UserContext);
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate("/Login");
	};
	return (
		<div className="h-full flex">
			<div className="">
				<Sidebar />
			</div>
			<div className="w-full">
				{/* Header */}
				<header className="py-4 px-4 flex flex-1 justify-end bg-gray-800">
					<div className="lg:flex hidden">
						<Popover className="relative">
							<PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
								<span className="text-white text-md">{`Hello ${user.email}`}</span>
								<ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
							</PopoverButton>
							<PopoverPanel className="absolute z-10 mt-3 w-full transform -translate-x-1/2 left-1/2">
								<div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
									<div className="p-4">
										<div className="flex flex-col gap-y-2">
											<a className="block font-semibold text-gray-900 cursor-pointer" onClick={handleLogout}>
												Logout
											</a>
										</div>
									</div>
								</div>
							</PopoverPanel>
						</Popover>
					</div>
				</header>
				{/* Content */}
				<>{props.children}</>;
			</div>
		</div>
	);
};

export default Admin;
