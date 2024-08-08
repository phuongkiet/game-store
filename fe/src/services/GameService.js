import axios from "./custom-axios";

const fetchAllGame = (page, searchTerm) => {
    return axios.get(`api/Game/get-games?page=${page}&pageSize=5&searchTerm=${searchTerm}`);
}

const fetchAllGameHome = (page, searchTerm) => {
    return axios.get(`api/Game/get-games?page=${page}&pageSize=8&searchTerm=${searchTerm}`);
}

const fetchAllGameAdmin = (page, searchTerm) => {
	return axios.get(`api/Game/get-games-admin?page=${page}&pageSize=5&searchTerm=${searchTerm}`);
}

const createGame = (Title, Price, Stock, Description, ImageUrl) => {
	return axios.post(`api/Game/create-game`, { Title, Price, Stock, Description, ImageUrl });
};

const updateGame = (Id, Title, Price, Stock, Description, Status, ImageUrl) => {
	return axios.put(`api/Game/update-game/${Id}`, { Title, Price, Stock, Description, Status, ImageUrl });
};

const deleteGame = (Id) => {
	return axios.delete(`api/Game/delete-game/${Id}`);
};

export { fetchAllGame, fetchAllGameHome, fetchAllGameAdmin, createGame, updateGame, deleteGame };
