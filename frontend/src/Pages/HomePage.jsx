import { useState } from "react";
import { useUserContext } from "../store/context"
import Register from "../Components/Register";
import Login from "../Components/Login";

function HomePage() {

    const state = useUserContext();

    if (!state?.token){
        setShowView("login");
    }

    if (showView === "register"){
        return <Register />
    } else if (showView === "login"){
        return <Login />
    }
}

export default HomePage