import React, { useEffect, useState } from 'react';
import { fetchAllGameHome } from '../services/GameService';

export default function Home() {
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
            console.log(">>> check res: ", res);
            if (res && res.data) {
                setTotalGames(res.TotalCount);
                setListGames(res.data);
                setTotalPages(res.TotalPages);
            }
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };
  return (
    <div className="bg-gray-100">
      
      {/* Navigation Bar */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-4 py-2">
          <a href="#" className="text-sm text-gray-700 hover:text-blue-600">Giải trí</a>
          <a href="#" className="text-sm text-gray-700 hover:text-blue-600">Làm việc</a>
          <a href="#" className="text-sm text-gray-700 hover:text-blue-600">Học tập</a>
          <a href="#" className="text-sm text-gray-700 hover:text-blue-600">Game Steam</a>
          <a href="#" className="text-sm text-gray-700 hover:text-blue-600">Edit Ảnh - Video</a>
          <a href="#" className="text-sm text-gray-700 hover:text-blue-600">Window, Office</a>
          <a href="#" className="text-sm text-gray-700 hover:text-blue-600">Google Drive</a>
          <a href="#" className="text-sm text-gray-700 hover:text-blue-600">Tiktok</a>
          <a href="#" className="text-sm text-gray-700 hover:text-blue-600">Diệt Virus</a>
        </div>
      </nav>

      {/* Main Banner */}
      <section className="relative bg-gray-100">
        <img
          src="https://via.placeholder.com/1920x400"
          alt="Main Banner"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-4xl font-bold mb-4">YouTube Premium</h1>
            <p className="text-lg mb-4">Chỉ từ 29K/THÁNG</p>
            <a href="#" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='flex justify-between'>
            <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
            <a href='#' className='text-blue-600 hover:text-blue-900 mr-5 font-semibold'>See more</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {listGames && listGames.length > 0 ? ( listGames.map((games, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                <img
                  src={games.ImageUrl}
                  alt={games.Title}
                  className="w-full mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{games.Title}</h3>
                <div className="text-red-600 font-bold mb-2">${games.Price}</div>
              </div>
            ))) : (
              <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">No games available.</td>
              </tr>
            )}
          </div>
        </div>
      </section>

      {/* Popular Keywords */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-4">Popular Keywords</h2>
          <div className="flex flex-wrap space-x-2">
            {['Làm việc', 'Giải trí', 'Học tập', 'Spotify', 'Wallet', 'Youtube'].map((keyword, index) => (
              <a
                key={index}
                href="#"
                className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1.5 rounded mb-2 hover:bg-blue-200"
              >
                {keyword}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='flex justify-between'>
            <h2 className="text-2xl font-bold mb-6">Well-known Steam Game</h2>
            <a href='#' className='text-blue-600 hover:text-blue-900 mr-5 font-semibold'>See more</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {listGames && listGames.length > 0 ? ( listGames.map((games, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                <img
                  src={games.ImageUrl}
                  alt={games.Title}
                  className="w-full mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{games.Title}</h3>
                <div className="text-red-600 font-bold mb-2">${games.Price}</div>
              </div>
            ))) : (
              <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">No games available.</td>
              </tr>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
