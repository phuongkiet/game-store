import React, { useContext, useEffect, useState } from "react";
import { fetchAllGameAdmin } from "../../services/GameService";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import ReactPaginate from "react-paginate";
import ModalAddGame from "./ModalAddGame";
import ModalDeleteGame from "./ModalDeleteGame";
import ModalUpdateGame from "./ModalUpdateGame";
import { UserContext } from "../../context/UserContext";

export default function GameTable() {
	const [listGames, setListGames] = useState([]);
	const [totalGames, setTotalGames] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalEditOpen, setIsModalEditOpen] = useState(false);
	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
	const [dataGame, setDataGame] = useState({});
	const [searchTerm, setSearchTerm] = useState("");
	const { user } = useContext(UserContext);

	useEffect(() => {
		getGames(currentPage, searchTerm);
	}, [currentPage]);

	const getGames = async (page, searchTerm) => {
		try {
			let res = await fetchAllGameAdmin(page, searchTerm);
			if (res && res.data) {
				setTotalGames(res.TotalCount);
				setListGames(res.data);
				setTotalPages(res.TotalPages);
			}
		} catch (error) {
			console.error("Error fetching genres:", error);
		}
	};

	const handlePageClick = (event) => {
		const selectedPage = event.selected + 1;
		setCurrentPage(selectedPage);
	};

	const handleAddNewGenre = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setIsModalEditOpen(false);
		setIsModalDeleteOpen(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsModalOpen(false);
	};

	const handleEditGenre = (game) => {
		setDataGame(game);
		setIsModalEditOpen(true);
	};

	const handleDeleteGenre = (game) => {
		setDataGame(game);
		setIsModalDeleteOpen(true);
	};

	const handleSearch = (event) => {
		let term = event.target.value;
		if (term) {
			getGames(currentPage, term);
		} else {
			getGames(currentPage, searchTerm);
		}
	};
	return (
		<>
			<div className="p-4">
				<div className="flex justify-between items-center mb-4">
					<div>
						<h1 className="text-2xl font-bold">Game Table</h1>
						<p className="text-gray-500">A list of all the games.</p>
					</div>
					<button onClick={handleAddNewGenre} className="bg-sky-400 text-white px-4 py-2 rounded-md">
						Add new game
					</button>
				</div>
				<div className="flex justify-start mt-4 mb-4">
					<input
						id="searchTerm"
						name="searchTerm"
						type="text"
						placeholder="Search Game here..."
						onChange={(event) => handleSearch(event)}
						className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
					/>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border border-gray-200">
						<thead className="bg-gray-100">
							<tr>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Id</th>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
								<th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
							</tr>
						</thead>
						<tbody>
							{listGames && listGames.length > 0 ? (
								listGames.map((item, index) => (
									<tr key={index} className="border-t border-gray-200">
										<td className="px-6 py-4 text-sm text-gray-900">{item.GameId}</td>
										<td className="px-6 py-4 text-sm text-gray-500">{item.Title}</td>
										<td className="px-6 py-4 text-sm text-gray-500">{item.Description}</td>
										<td className="px-6 py-4 text-sm text-gray-500">{item.Price}</td>
										<td className="px-6 py-4 text-sm text-gray-500">{item.Stock}</td>
										<td className="px-6 py-4 text-sm text-gray-500">{item.Status === 1 ? "Active" : "Inactive"}</td>
										<td className="px-6 py-4 text-right text-sm font-medium">
											<div className="flex float-right">
												<GoPencil
													href="#"
													className="text-xl text-yellow-400 hover:text-yellow-200 mr-5"
													onClick={() => handleEditGenre(item)}
												/>

												<FaTrashAlt
													href="#"
													className="text-xl text-red-400 hover:text-red-200"
													onClick={() => handleDeleteGenre(item)}
												/>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
										No games available.
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
			<ModalAddGame
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onSubmit={handleSubmit}
				onCreateSuccess={() => getGames(1, searchTerm)}
			/>
			<ModalUpdateGame
				isOpen={isModalEditOpen}
				onClose={handleCloseModal}
				dataGameEdit={dataGame}
				onEditSuccess={() => getGames(currentPage, searchTerm)}
			/>
			<ModalDeleteGame
				isOpen={isModalDeleteOpen}
				onClose={handleCloseModal}
				dataGame={dataGame}
				onDeleteSuccess={() => getGames(currentPage, searchTerm)}
			/>
		</>
	);
}
