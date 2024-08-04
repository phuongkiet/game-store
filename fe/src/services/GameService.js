import axios from "./custom-axios";

const fetchAllGame = (page, searchTerm) => {
    return axios.get(`api/Game/get-games?page=${page}&pageSize=5&searchTerm=${searchTerm}`);
}

const createGame = (Title, Price, Stock, Description) => {
	return axios.post(`api/Game/create-game`, { Title, Price, Stock, Description });
};

const updateGame = (Id, Title, Price, Stock, Description, Status) => {
	return axios.put(`api/Game/update-game/${Id}`, { Title, Price, Stock, Description, Status });
};

const deleteGame = (Id) => {
	return axios.delete(`api/Game/delete-game/${Id}`);
};

export { fetchAllGame, createGame, updateGame, deleteGame };
