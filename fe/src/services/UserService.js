import axios from "./custom-axios";

const fetchAllUsers = (page, searchTerm) => {
	return axios.get(`api/User/get-users?page=${page}&pageSize=5&searchTerm=${searchTerm}`);
};

const createUser = (UserId, Name, Birthday, Email, PhoneNumber) => {
	return axios.post("api/User/create-user", { UserId, Name, Birthday, Email, PhoneNumber });
};

const updateUser = (UserId, Name, Birthday, Money, Email, PhoneNumber, Status) => {
	return axios.put(`api/User/update-user/${UserId}`, { Name, Birthday, Money, Email, PhoneNumber, Status });
};

const deleteUser = (UserId) => {
	return axios.delete(`api/User/delete-user/${UserId}`);
};

export { fetchAllUsers, createUser, updateUser, deleteUser };
