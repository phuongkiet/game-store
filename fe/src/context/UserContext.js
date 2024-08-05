import React from 'react';

const UserContext = React.createContext({email: '', auth: false});

//@function UserProvider
// Create function to provide UserContext
const UserProvider = ({children}) => {
    const [user, setUser] = React.useState({ email: '', auth: false});

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser((user) => ({
            email : userData.Email,
            auth: true
        }));
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser((user) => ({
            email: '',
            auth: false
        }));
    };

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider};