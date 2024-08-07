import { Switch } from "@headlessui/react";
import React from "react";
import { BrowserRouter, Route, Router } from "react-router-dom";
import GenreTable from "./genre/GenreTable";
import GameTable from "./game/GameTable";
import UserTable from "./user/UserTable";
import { Component } from "react";
import { render } from "react-dom";

class Admin extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="container-fluid">
					<div className="row">
						<ul className="sidebar-submenu ">
							<li></li>
							<li></li>
						</ul>
						<div className="col-md-10 admin-content">
							<Switch>
								<Route exact path="/admin/user" component={UserTable} />
							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default Admin;
