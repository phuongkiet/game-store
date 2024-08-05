import React, { useState } from "react";
import { createUser } from "../../services/UserService";
import { toast } from "react-toastify";

export default function ModalAddUser({ isOpen, onClose, onSubmit, onCreateSuccess }) {
	const [UserId, setUserId] = useState(0);
	const [Name, setName] = useState("");
	const [Birthday, setBirthday] = useState("");
	const [Email, setEmail] = useState("");
	const [PhoneNumber, setPhoneNumber] = useState("");
	const [Money, setMoney] = useState(0);

	if (!isOpen) return null;

	const handleSaveUser = async () => {
		try {
			let res = await createUser(UserId, Name, Birthday, Money, Email, PhoneNumber);
			if (res && res.Success === true) {
				onClose();
				setUserId(0);
				setName("");
				setBirthday("");
				setEmail("");
				setPhoneNumber("");
				setMoney(0);
				toast.success("User created successfully!");
				onCreateSuccess();
			} else if (res && res.Success === false) {
				toast.error("Error when creating user!");
				onClose();
			}
		} catch (error) {
			toast.error("An unexpected error occurred!");
			onClose();
		}
	};

	return (
		<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<form onSubmit={onSubmit} className="space-y-6">
							<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mt-3 text-center w-full sm:text-left">
										<h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
											Add New User
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
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
								<button
									type="submit"
									onClick={handleSaveUser}
									className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
								>
									Create
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
