import React, { useContext } from "react";
import Unathorize from "./Unathorize";
import { UserContext } from "../../context/UserContext";
import Header from "../Header";
import Footer from "../Footer";
import Admin from "../Admin";

const ProtectedRoute = (props) => {
  const { admin } = useContext(UserContext);

  return (
    <>
      {admin ? (
        <>
          <Admin>{props.children}</Admin>
        </>
      ) : (
        <>
          <header>
            <Header />
          </header>
          <body>
            <Unathorize />
          </body>
          <footer>
            <Footer />
          </footer>
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
