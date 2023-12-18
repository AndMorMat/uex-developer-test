import { useState } from "react";
import { FormContact, TIPO_UPDATE } from "../FormContact";
import { Api } from "@/Services/Api";
import { useGlobalContext } from "@/Contexts/global-context";

export function EditContact({ contact }) {
    const [isModalVisible, setIsModalVisible] = useState();
    const { updateContacts } = useGlobalContext();
    const [isLoading, setIsLoading] = useState("");
    const [error, setError] = useState("");

    const onEdithandlePress = () => {
        console.log("edit: ", contact.name);
        setIsModalVisible(true);
    };

    const onHandleSubmit = (item) => {
        setIsLoading(true);
        setError("");
        const params = {
            name: item.name,
            cpf: item.cpf,
            phone: item.phone,
            address: {
                zip_code: item.zip_code,
                address: item.address,
                neighborhood: item.neighborhood,
                city: item.city,
                province: item.province,
            },
        };
        Api()
            .put(route("contact.update", item.id), params)
            .then((response) => response.json())
            .then((json) => {
                if (!json.success) {
                    setError(json.message);
                    return;
                }
                setIsModalVisible(false);
                window.location.reload();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <>
            <button className="px-5 py-2 border" onClick={onEdithandlePress}>
                Editar
            </button>
            <FormContact
                isVisible={isModalVisible}
                setIsVisible={setIsModalVisible}
                tipo={TIPO_UPDATE}
                contact={contact}
                onHandleSubmit={onHandleSubmit}
                submitError={error}
            />
        </>
    );
}
