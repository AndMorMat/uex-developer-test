import { Api } from "@/Services/Api";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
    const [contacts, setContacts] = useState("");

    const updateContacts = (searchParam = "") => {
        Api()
            .get(route("contact.search") + `?q=${searchParam}`)
            .then((response) => response.json())
            .then((json) => setContacts(json.content));
    };

    return (
        <GlobalContext.Provider value={{ contacts, updateContacts }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
