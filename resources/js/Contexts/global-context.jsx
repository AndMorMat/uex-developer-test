import { Api } from "@/Services/Api";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
    const [contacts, setContacts] = useState("");
    const [pagination, setPagination] = useState();

    const updateContacts = (searchParam = "", page = 1) => {
        Api()
            .get(route("contact.search") + `?q=${searchParam}&page=${page}`)
            .then((response) => response.json())
            .then((json) => {
                setContacts(json.content.data);
                setPagination({
                    currentPage: json.content.current_page,
                    lastPage: json.content.last_page,
                });
            });
    };

    return (
        <GlobalContext.Provider
            value={{ contacts, pagination, updateContacts }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
