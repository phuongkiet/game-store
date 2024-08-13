import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Login() {
	const { login } = useContext(UserContext);

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		let token = localStorage.getItem("token");
		if (token) {
			navigate("/");
		}
	}, []);

	const handleSignIn = async () => {
		if (!email || !password) {
			toast.error("Email and Password must not be empty");
			return;
		}
		let res = await AuthService.login(email, password);
		if (res.data.Success == true) {
			login(res.UserData.Token);
			toast.success("Login success");
			navigate("/");
		} else if (res.data.Success == false) {
			toast.error(res.data.Message);
		}
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					alt="Your Company"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					className="mx-auto h-10 w-auto"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
				{/* <form action="#" method="POST" className="space-y-6"> */}
				<div>
					<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
						Email address
					</label>
					<div className="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
							autoComplete="email"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
						/>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
							Password
						</label>
						<div className="text-sm">
							<a href="#" className="font-semibold text-sky-600 hover:text-sky-500">
								Forgot password?
							</a>
						</div>
					</div>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
							autoComplete="current-password"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
						/>
					</div>
				</div>

				<div>
					<button
						className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={() => handleSignIn()}
					>
						Sign in
					</button>
				</div>
				{/* </form> */}

				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{" "}
					<a href="/Register" className="font-semibold leading-6 text-sky-600 hover:text-sky-500">
						Sign up here
					</a>
				</p>
			</div>
		</div>
	);
}
