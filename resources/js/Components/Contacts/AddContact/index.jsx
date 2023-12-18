import { useState } from "react";
import { TIPO_INSERT, FormContact } from "../FormContact";
import { Api } from "@/Services/Api";
import { useGlobalContext } from "@/Contexts/global-context";

export function AddContact() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { updateContacts } = useGlobalContext();

    const onHandleSubmit = (item) => {
        setIsLoading(true);
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
            .post(route("contact.add"), params)
            .then((response) => response.json())
            .then((json) => {
                if (!json.success) {
                    setError(json.message);
                    return;
                }
                updateContacts();
                setIsModalVisible(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onAddPress = () => {
        setIsModalVisible(true);
        setError("");
    };

    return (
        <>
            <button
                className="px-5 py-2 border"
                onClick={onAddPress}
                disabled={isLoading}
            >
                Adicionar
            </button>
            <FormContact
                isVisible={isModalVisible}
                setIsVisible={setIsModalVisible}
                tipo={TIPO_INSERT}
                onHandleSubmit={onHandleSubmit}
                submitError={error}
            />
        </>
    );
}
