import React, { useContext, useState } from "react";

const userContext = React.createContext();

export const userContextProvider = ({ children }) => {

    const [state, setState] = useState({
        name: "",
        email: "",
        token: ""
    });

    const [showView, setShowView] = useState("login");

    return <userContext.Provider value={{ state, setState, showView, setShowView }}>
        {children}
    </userContext.Provider>;
}

export const useUserContext = () => {
    return useContext(userContext);
}
