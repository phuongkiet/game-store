import React, { createContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const UserContext = createContext({ user: null, admin: null });

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.nameid;
        const userEmail = decodedToken.email;
        const userRole = decodedToken.role;
        const username = decodedToken.unique_name;

        if (userRole === 'Admin') {
            setAdmin({ id: userId, email: userEmail, username: username, role: userRole, auth: true });
            setUser(null);
        } else {
            setUser({ id: userId, email: userEmail, username: username, role: userRole, auth: true });
            console.log(user);
            setAdmin(null);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setAdmin(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.nameid;
                const userEmail = decodedToken.email;
                const userRole = decodedToken.role;
                const username = decodedToken.unique_name;

                if (userRole === 'Admin') {
                    setAdmin({ id: userId, email: userEmail, username: username, role: userRole, auth: true });
                    setUser(null);
                } else {
                    setUser({ id: userId, email: userEmail, username: username, role: userRole, auth: true });
                    setAdmin(null);
                }
            } catch (error) {
                console.error('Error decoding token on initial load', error);
                logout();
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, admin, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};


export { UserContext, UserProvider };
