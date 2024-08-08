import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

import Header from "./component/Header";
import Login from "./component/auth/Login";
import GenreTable from "./component/genre/GenreTable";
import Footer from "./component/Footer";
import UserTable from "./component/user/UserTable";
import Register from "./component/auth/Register";
import Home from "./component/Home";
import GameTable from "./component/game/GameTable";

import Admin from "./component/Admin";
import Client from "./component/Client";
import GameList from "./component/GameList";
import Checkout from "./component/form/Checkout";
import ShoppingCart from "./component/ShoppingCart";
function App() {
  const { user, login } = useContext(UserContext);

  console.log(">> check user: ", user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      login(localStorage.getItem("token"));
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="container mx-auto">
        {/* <header>
					<Header />
				</header> */}
        <body className="">
          <Routes>
            <Route
              path="/"
              element={
                <Client>
                  <Home />
                </Client>
              }
            />
            <Route
              path="/Home"
              element={
                <Client>
                  <Home />
                </Client>
              }
            />
            <Route
              path="/admin/Genre"
              element={
                <Admin>
                  <GenreTable />
                </Admin>
              }
            />
            <Route
              path="/admin/User"
              element={
                <Admin>
                  <UserTable />
                </Admin>
              }
            />
            <Route
              path="/admin/Game"
              element={
                <Admin>
                  <GameTable />
                </Admin>
              }
            />
            <Route
              path="/Login"
              element={
                <Client>
                  <Login />
                </Client>
              }
            />
            <Route
              path="/Register"
              element={
                <Client>
                  <Register />
                </Client>
              }
            />
            <Route
              path="/ListGame"
              element={
                <Client>
                  <GameList />
                </Client>
              }
            />
            <Route
              path="/Checkout"
              element={
                <Client>
                  <Checkout />
                </Client>
              }
            />
            <Route
              path="/Cart"
              element={
                <Client>
                  <ShoppingCart />
                </Client>
              }
            />
          </Routes>
        </body>
        {/* <footer>
					<Footer />
				</footer> */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
