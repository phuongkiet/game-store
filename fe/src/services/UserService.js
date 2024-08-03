import axios from "./custom-axios";

const fetchAllUsers = (page) => {
	return axios.get(`api/User/get-users?page=${page}&pageSize=5`);
};

const createUser = (userId, userName) => {
	return axios.post("api/User/create-user", userId, userName);
};

const updateUser = (userId, userName) => {
	return axios.put(`api/User/update-user/${userId}`, userName);
};

const deleteUser = (userId) => {
	return axios.delete(`api/User/delete-user/${userId}`);
};

export { fetchAllUsers, createUser, updateUser, deleteUser };
