import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext({id: null, email: '', role: '', auth: false});

//@function UserProvider
// Create function to provide UserContext
const UserProvider = ({children}) => {
    const [user, setUser] = useState({id: null, email: '', role: '', auth: false});

    const login = async (token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.nameid;
        const userEmail = decodedToken.email;
        const userRole = decodedToken.role; 
        setUser({ id: userId, email: userEmail, role: userRole, auth: true });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser({id: null, email: '', role: '', auth: false});
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.nameid;
                const userEmail = decodedToken.email;
                const userRole = decodedToken.role;
                setUser({ id: userId, email: userEmail, role: userRole, auth: true });
            } catch (error) {
                console.error('Error decoding token on initial load', error);
                logout();
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider};