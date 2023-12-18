import { SearchAddressByCep } from "@/Components/Address/SearchAddressByCep";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { Api } from "@/Services/Api";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export const TIPO_INSERT = "Adicionar";
export const TIPO_UPDATE = "Editar";

export function FormContact({
    tipo,
    isVisible,
    setIsVisible,
    onHandleSubmit,
    contact,
    submitError,
}) {
    const [loadingByCep, setLoadingByCep] = useState(false);
    const [searchByCepError, setSearchByCepError] = useState("");
    const [isSearchByAddressActive, setIsSearchByAddressActive] =
        useState(false);

    const { data, setData, errors, reset, processing } = useForm({
        name: contact?.name || "",
        cpf: contact?.cpf || "",
        phone: contact?.phone || "",
        address: contact?.address?.address || "",
        city: contact?.address?.city || "",
        neighborhood: contact?.address?.neighborhood || "",
        province: contact?.address?.province || "",
        zip_code: contact?.address?.zip_code || "",
    });

    useEffect(() => {
        if (!contact) {
            return;
        }
        setData((data) => ({
            ...data,
            name: contact.name,
            cpf: contact.cpf,
            phone: contact.phone,
            neighborhood: contact.address.neighborhood,
            city: contact.address?.city,
            address: contact.address?.address,
            province: contact.address?.province,
        }));
    }, [contact]);

    useEffect(() => {
        if (!isVisible) reset();
    }, [isVisible]);

    const onSearchByCepPress = () => {
        setSearchByCepError("");
        if (!data?.zip_code?.toString().trim()) {
            setSearchByCepError("Necessário informar o cep");
            return;
        }
        setLoadingByCep(true);
        Api()
            .get(route("cep.search", data.zip_code))
            .then((response) => response.json())
            .then((json) => {
                if (!json.success) {
                    setSearchByCepError(json.message);
                    return;
                }
                setData((data) => ({
                    ...data,
                    neighborhood: json.content?.bairro,
                    city: json.content?.localidade,
                    address: json.content?.logradouro,
                    province: json.content?.uf,
                }));
            })
            .finally(() => {
                setLoadingByCep(false);
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onHandleSubmit({ id: contact?.id, ...data });
    };

    return (
        <>
            <Modal show={isVisible} maxWidth="max-w-screen-md">
                <div class="flex flex-row">
                    <div className="p-6 flex-1">
                        <h2 className="text-lg font-medium text-gray-900">
                            {tipo} contato
                        </h2>
                        <div className="mt-6">
                            <InputLabel htmlFor="name" value="Nome" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="name"
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-6">
                            <InputLabel htmlFor="Cpf" value="Cpf" />
                            <TextInput
                                id="cpf"
                                className="mt-1 block w-full"
                                value={data.cpf}
                                onChange={(e) => setData("cpf", e.target.value)}
                                required
                                isFocused
                                autoComplete="cpf"
                            />
                            <InputError message={errors.cpf} className="mt-2" />
                        </div>
                        <div className="mt-6">
                            <InputLabel htmlFor="Celular" value="Celular" />
                            <TextInput
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="phone"
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-6">
                            <div className="flex flex-row">
                                <div className="flex-1">
                                    <InputLabel htmlFor="Cep" value="Cep" />
                                    <TextInput
                                        id="zip_code"
                                        className="mt-1 block w-full"
                                        value={data.zip_code}
                                        onChange={(e) =>
                                            setData("zip_code", e.target.value)
                                        }
                                        required
                                        isFocused
                                        autoComplete="zip_code"
                                    />
                                    <InputError
                                        message={
                                            errors.zip_code || searchByCepError
                                        }
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <PrimaryButton
                                        className="ms-3"
                                        onClick={onSearchByCepPress}
                                        disabled={loadingByCep}
                                    >
                                        Buscar
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="ms-3"
                                        onClick={() =>
                                            setIsSearchByAddressActive(
                                                !isSearchByAddressActive
                                            )
                                        }
                                    >
                                        Não sei o cep
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <InputLabel
                                htmlFor="Logradouro"
                                value="Logradouro"
                            />
                            <TextInput
                                id="address"
                                className="mt-1 block w-full"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="address"
                            />
                            <InputError
                                message={errors.address}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-6">
                            <InputLabel htmlFor="UF" value="UF" />
                            <TextInput
                                id="province"
                                className="mt-1 block w-full"
                                value={data.province}
                                onChange={(e) =>
                                    setData("province", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="province"
                            />
                            <InputError
                                message={errors.province}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-6">
                            <InputLabel htmlFor="Cidade" value="Cidade" />
                            <TextInput
                                id="city"
                                className="mt-1 block w-full"
                                value={data.city}
                                onChange={(e) =>
                                    setData("city", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="city"
                            />
                            <InputError
                                message={errors.city}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-6">
                            <InputLabel htmlFor="Bairro" value="Bairro" />
                            <TextInput
                                id="neighborhood"
                                className="mt-1 block w-full"
                                value={data.neighborhood}
                                onChange={(e) =>
                                    setData("neighborhood", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="neighborhood"
                            />
                            <InputError
                                message={errors.neighborhood}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton
                                onClick={() => setIsVisible(false)}
                            >
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton
                                className="ms-3"
                                disabled={processing}
                                onClick={onSubmit}
                            >
                                Salvar
                            </PrimaryButton>
                        </div>
                        <InputError message={submitError} className="mt-2" />
                    </div>
                    <div className="p-6">
                        <SearchAddressByCep
                            isVisible={isSearchByAddressActive}
                            setIsVisible={setIsSearchByAddressActive}
                            setDataForm={setData}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}
