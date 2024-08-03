import React, { useEffect, useState } from "react";
import { fetchAllUser, fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
// import ModalAddUser from './ModalAddUser';
// import ModalUpdateUser from './ModalUpdateUser';
// import ModalDeleteUser from './ModalDeleteUser';

export default function UserTable() {
	const [listUsers, setListUsers] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalEditOpen, setIsModalEditOpen] = useState(false);
	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
	const [dataUser, setDataUser] = useState({});

	useEffect(() => {
		getUsers(currentPage);
	}, [currentPage]);

	const getUsers = async (page) => {
		try {
			let res = await fetchAllUsers(page);
			if (res && res.data) {
				setTotalUsers(res.TotalCount);
				setListUsers(res.data);
				setTotalPages(res.TotalPages);
			}
		} catch (error) {
			console.error("Error fetching Users:", error);
		}
	};

	const handlePageClick = (event) => {
		const selectedPage = event.selected + 1;
		setCurrentPage(selectedPage);
	};

	const handleAddNewUser = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setIsModalEditOpen(false);
		setIsModalDeleteOpen(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Here you can handle the form submission logic, like adding a new User
		// Example:
		// const newUserName = event.target.UserName.value;
		// Call the service to add the new User
		// After adding, you may want to refresh the User list or close the modal
		setIsModalOpen(false);
	};

	const handleEditUser = (User) => {
		setDataUser(User);
		setIsModalEditOpen(true);
	};

	const handleDeleteUser = (User) => {
		setDataUser(User);
		setIsModalDeleteOpen(true);
	};

	return (
		<>
			<div className="p-4">
				<div className="flex justify-between items-center mb-4">
					<div>
						<h1 className="text-2xl font-bold">User Table</h1>
						<p className="text-gray-500">A list of all the Users.</p>
					</div>
					<button onClick={handleAddNewUser} className="bg-sky-400 text-white px-4 py-2 rounded-md">
						Add new User
					</button>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border border-gray-200">
						<thead className="bg-gray-100">
							<tr>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Id</th>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
								<th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
							</tr>
						</thead>
						<tbody>
							{listUsers && listUsers.length > 0 ? (
								listUsers.map((item, index) => (
									<tr key={index} className="border-t border-gray-200">
										<td className="px-6 py-4 text-sm text-gray-900">{item.Id}</td>
										<td className="px-6 py-4 text-sm text-gray-500">{item.Name}</td>
										<td className="px-6 py-4 text-sm text-gray-500">{item.Email}</td>
										<td className="px-6 py-4 text-right text-sm font-medium">
											<div className="flex float-right">
												<GoPencil
													href="#"
													className="text-xl text-yellow-400 hover:text-yellow-200 mr-5"
													onClick={() => handleEditUser(item)}
												/>
												<FaTrashAlt
													href="#"
													className="text-xl text-red-400 hover:text-red-200"
													onClick={() => handleDeleteUser(item)}
												/>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
										No Users available.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			<ReactPaginate
				previousLabel={<span className="text-gray-500">← Previous</span>}
				nextLabel={<span className="text-gray-500">Next →</span>}
				breakLabel="..."
				breakClassName="break-me"
				pageCount={totalPages}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={handlePageClick}
				containerClassName="flex justify-center mt-4 space-x-2"
				pageClassName="text-white-700 hover:bg-sky-200 rounded-full w-8 h-8 flex items-center justify-center"
				pageLinkClassName="w-full h-full flex items-center justify-center"
				previousClassName="flex items-center justify-center text-gray-500 px-4 py-2"
				previousLinkClassName="w-full h-full flex items-center justify-center"
				nextClassName="flex items-center justify-center text-gray-500 px-4 py-2"
				nextLinkClassName="w-full h-full flex items-center justify-center"
				activeClassName="bg-sky-400 text-white rounded-full"
				activeLinkClassName="w-full h-full flex items-center justify-center"
			/>
			{/* <ModalAddUser isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} onCreateSuccess={() => getUsers(1)} />
            <ModalUpdateUser isOpen={isModalEditOpen} onClose={handleCloseModal} dataUserEdit={dataUser} onEditSuccess={() => getUsers(currentPage)}/>
            <ModalDeleteUser isOpen={isModalDeleteOpen} onClose={handleCloseModal} dataUser={dataUser} onDeleteSuccess={() => getUsers(currentPage)}/> */}
		</>
	);
}
