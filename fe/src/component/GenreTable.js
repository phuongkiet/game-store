import React, { useEffect, useState } from "react";
import { fetchAllGenre } from "../services/GenreService";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import ReactPaginate from "react-paginate";
import ModalAddGenre from "./ModalAddGenre";
import ModalUpdateGenre from "./ModalUpdateGenre";
import ModalDeleteGenre from "./ModalDeleteGenre";

export default function GenreTable() {
    const [listGenres, setListGenres] = useState([]);
    const [totalGenres, setTotalGenres] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [dataGenre, setDataGenre] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getGenres(currentPage, searchTerm);
    }, [currentPage]);

    const getGenres = async (page, searchTerm) => {
        try {
            let res = await fetchAllGenre(page, searchTerm);
            if (res && res.data) {
                setTotalGenres(res.TotalCount);
                setListGenres(res.data);
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
		// Here you can handle the form submission logic, like adding a new genre
		// Example:
		// const newGenreName = event.target.genreName.value;
		// Call the service to add the new genre
		// After adding, you may want to refresh the genre list or close the modal
		setIsModalOpen(false);
	};

	const handleEditGenre = (genre) => {
		setDataGenre(genre);
		setIsModalEditOpen(true);
	};

	const handleDeleteGenre = (genre) => {
		setDataGenre(genre);
		setIsModalDeleteOpen(true);
	};

    const handleSearch = (event) => {
        let term = event.target.value;
        if(term){
            getGenres(currentPage, term);
        }else{
            getGenres(currentPage, searchTerm);
        }
    }
    return (
        <>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Genre Table</h1>
                        <p className="text-gray-500">A list of all the genres.</p>
                    </div>
                    <button
                        onClick={handleAddNewGenre}
                        className="bg-sky-400 text-white px-4 py-2 rounded-md"
                    >
                        Add new genre
                    </button>
                </div>
                <div className="flex justify-start mt-4 mb-4">
                    <input
                    id="searchTerm"
                    name="searchTerm"
                    type="text"
                    placeholder='Search Genre here...'
                    onChange={(event) => handleSearch(event)}
                    className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Id</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listGenres && listGenres.length > 0 ? (
                                listGenres.map((item, index) => (
                                    <tr key={index} className="border-t border-gray-200">
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.GenreId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{item.GenreName}</td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <a href="#" className="text-blue-600 hover:text-blue-900 mr-5" onClick={() => handleEditGenre(item)}>Edit</a>
                                            <a href="#" className="text-blue-600 hover:text-blue-900" onClick={() => handleDeleteGenre(item)}>Delete</a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No genres available.</td>
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
            <ModalAddGenre isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} onCreateSuccess={() => getGenres(1, searchTerm)} />
            <ModalUpdateGenre isOpen={isModalEditOpen} onClose={handleCloseModal} dataGenreEdit={dataGenre} onEditSuccess={() => getGenres(currentPage, searchTerm)}/>
            <ModalDeleteGenre isOpen={isModalDeleteOpen} onClose={handleCloseModal} dataGenre={dataGenre} onDeleteSuccess={() => getGenres(currentPage, searchTerm)}/>
        </>
    );
}
