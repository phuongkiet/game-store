import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../../services/UserService";

export default function ModalUpdateUser({ isOpen, onClose, onSubmit, dataUserEdit, onEditSuccess }) {
	const [UserId, setUserId] = useState(0);
	const [Name, setName] = useState("");
	const [Birthday, setBirthday] = useState("");
	const [Email, setEmail] = useState("");
	const [PhoneNumber, setPhoneNumber] = useState("");
	const [Money, setMoney] = useState(0);
	const [Status, setStatus] = useState(1);

	useEffect(() => {
		if (isOpen && dataUserEdit) {
			setUserId(dataUserEdit.Id);
			setName(dataUserEdit.Name);
			const formattedBirthday = new Date(dataUserEdit.Birthday).toISOString().split('T')[0];
			setBirthday(formattedBirthday);
			setEmail(dataUserEdit.Email);
			setPhoneNumber(dataUserEdit.PhoneNumber);
			setMoney(dataUserEdit.Money);
			setStatus(dataUserEdit.Status);
		}
	}, [isOpen, dataUserEdit]);

	const handleSaveUser = async (event) => {
		event.preventDefault();
		try {
			let res = await updateUser(UserId, Name, Birthday, Money, Email, PhoneNumber, Status);
			if (res && res.Success === true) {
				onClose();
				setUserId(0);
				setName("");
				setBirthday("");
				setEmail("");
				setPhoneNumber("");
				setStatus(1);
				setMoney(0);
				toast.success("User updated successfully!");
				onEditSuccess();
			} else if (res && res.Success === false) {
				toast.error("Error when updating user!");
				onClose();
			}
		} catch (error) {
			toast.error("An unexpected error occurred!");
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<form onSubmit={handleSaveUser} className="space-y-6">
							<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mt-3 text-center w-full sm:text-left">
										<h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
											Edit User
										</h3>
										<div className="mt-2">
											<div>
												<label htmlFor="genreName" className="block text-sm font-medium leading-6 text-gray-900">
													User Name
												</label>
												<div className="mt-2">
													<input
														id="UserName"
														name="UserName"
														value={Name}
														onChange={(event) => setName(event.target.value)}
														type="text"
														required
														autoComplete="text"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
													/>
												</div>
											</div>
										</div>
										<div className="mt-2">
											<div>
												<label htmlFor="genreName" className="block text-sm font-medium leading-6 text-gray-900">
													User Email
												</label>
												<div className="mt-2">
													<input
														id="Email"
														name="Email"
														value={Email}
														onChange={(event) => setEmail(event.target.value)}
														type="text"
														required
														autoComplete="text"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
													/>
												</div>
											</div>
										</div>
										<div className="mt-2">
											<div>
												<label htmlFor="genreName" className="block text-sm font-medium leading-6 text-gray-900">
													User PhoneNumber
												</label>
												<div className="mt-2">
													<input
														id="PhoneNumber"
														name="PhoneNumber"
														value={PhoneNumber}
														onChange={(event) => setPhoneNumber(event.target.value)}
														type="text"
														required
														autoComplete="text"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
													/>
												</div>
											</div>
										</div>
										<div className="mt-2">
											<div>
												<label htmlFor="genreName" className="block text-sm font-medium leading-6 text-gray-900">
													User Birthday
												</label>
												<div className="mt-2">
													<input
														id="Brithday"
														name="Brithday"
														value={Birthday}
														onChange={(event) => setBirthday(event.target.value)}
														type="date"
														required
														autoComplete="text"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
													/>
												</div>
											</div>
										</div>
										<div>
											<label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
												Status
											</label>
											<div className="mt-2">
												<select
													id="status"
													name="status"
													value={Status}
													onChange={(event) => setStatus(parseInt(event.target.value))}
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
												>
													<option value="1">Active</option>
													<option value="0">Inactive</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
								>
									Save
								</button>
								<button
									type="button"
									onClick={onClose}
									className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
