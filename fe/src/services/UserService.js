import axios from "./custom-axios";

const fetchAllUsers = (page) => {
	return axios.get(`api/User/get-users?page=${page}&pageSize=5`);
};

const createUser = (UserId, Name, Birthday, Money, Email, PhoneNumber) => {
	return axios.post("api/User/create-user", { UserId, Name, Birthday, Money, Email, PhoneNumber });
};

const updateUser = (UserId, Name, Birthday, Money, Email, PhoneNumber) => {
	return axios.put(`api/User/update-user/${UserId}`, Name, Birthday, Money, Email, PhoneNumber);
};

const deleteUser = (UserId) => {
	return axios.delete(`api/User/delete-user/${UserId}`);
};

export { fetchAllUsers, createUser, updateUser, deleteUser };
