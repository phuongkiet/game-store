import React, { useEffect, useState } from "react";
import { fetchAllGameHome } from "../services/GameService";
import ReactPaginate from "react-paginate";

export default function GameList() {
  const [listGames, setListGames] = useState([]);
  const [totalGames, setTotalGames] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getGames(currentPage, searchTerm);
  }, [currentPage]);

  const getGames = async (page, searchTerm) => {
    try {
      let res = await fetchAllGameHome(page, searchTerm);
      if (res && res.data) {
        setTotalGames(res.TotalCount);
        setListGames(res.data);
        setTotalPages(res.TotalPages);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
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
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between">
            <h1 className="text-3xl font-medium pb-10 text-gray-900">Games</h1>
            <div className="pb-10">
              <input
                id="searchTerm"
                name="searchTerm"
                type="text"
                placeholder="Search Game here..."
                onChange={(event) => handleSearch(event)}
                className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {listGames && listGames.length > 0 ? (
              listGames.map((games) => (
                <a key={games.GameId} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      //   alt={games.Title}
                      src={games.ImageUrl}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{games.Title}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${games.Price}
                  </p>
                </a>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No games available.
                </td>
              </tr>
            )}
          </div>
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
        containerClassName="flex justify-center mb-10 space-x-3"
        pageClassName="text-white-700 hover:bg-sky-200 rounded-full w-8 h-8 flex items-center justify-center"
        pageLinkClassName="w-full h-full flex items-center justify-center"
        previousClassName="flex items-center justify-center text-gray-500 px-4 py-2"
        previousLinkClassName="w-full h-full flex items-center justify-center"
        nextClassName="flex items-center justify-center text-gray-500 px-4 py-2"
        nextLinkClassName="w-full h-full flex items-center justify-center"
        activeClassName="bg-sky-400 text-white rounded-full"
        activeLinkClassName="w-full h-full flex items-center justify-center"
      />
    </>
  );
}
