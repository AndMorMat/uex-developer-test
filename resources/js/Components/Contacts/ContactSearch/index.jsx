import TextInput from "@/Components/TextInput";
import { useEffect, useState } from "react";
import { ContactSearchItemList } from "../ContactSearchItemList";
import { useGlobalContext } from "@/Contexts/global-context";
import { useMapContext } from "@/Contexts/map-context";
import { Pagination } from "../Pagination";

export function ContactSearch() {
    const [searchParam, setSearchParam] = useState("");
    const { contacts, updateContacts } = useGlobalContext();

    const onSearchHandlePress = () => {
        updateContacts(searchParam);
    };

    const onSearchCancelHandlePress = () => {
        setSearchParam("");
        updateContacts("");
    };

    useEffect(() => {
        updateContacts();
    }, []);

    return (
        <div className="border p-3">
            <div className="header flex flex-row ">
                <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                    required
                    isFocused
                    autoComplete="name"
                />
                <button
                    className="px-5 py-0 ml-2 border"
                    onClick={onSearchCancelHandlePress}
                >
                    x
                </button>
                <button
                    className="px-5 py-0 ml-2 border"
                    onClick={onSearchHandlePress}
                >
                    Buscar
                </button>
            </div>
            <div className="result mt-3">
                {contacts &&
                    contacts.map((item) => (
                        <ContactSearchItemList item={item} />
                    ))}
            </div>
            <Pagination searchParam={searchParam} />
        </div>
    );
}
