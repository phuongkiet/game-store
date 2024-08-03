import axios from "./custom-axios";

const fetchAllGenre = (page, searchTerm) => {
    return axios.get(`api/Genre/get-genres?page=${page}&pageSize=5&searchTerm=${searchTerm}`);
}

const createGenre = (GenreId, GenreName) => {
	return axios.post(`api/Genre/create-genre`, { GenreId, GenreName });
};

const updateGenre = (GenreId, GenreName) => {
	return axios.put(`api/Genre/update-genre/${GenreId}`, { GenreName });
};

const deleteGenre = (GenreId) => {
	return axios.delete(`api/Genre/delete-genre/${GenreId}`);
};

export { fetchAllGenre, createGenre, updateGenre, deleteGenre };
