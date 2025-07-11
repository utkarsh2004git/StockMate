import { useState } from "react";
import { createContext } from "react";


export const userContext = createContext();

const StoreContextProvider =(props)=>{
    const [user, setUser] = useState(null);

    const contextValues = {
        user,
        setUser,
    }

    return (
        <userContext.Provider value={contextValues}>
            {props.children}
        </userContext.Provider>
    );
}

export default StoreContextProvider;