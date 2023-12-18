import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Api } from "@/Services/Api";
import { useEffect, useState } from "react";

export function SearchAddressByCep({ isVisible, setIsVisible, setDataForm }) {
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    if (!isVisible) return null;

    const onSearchPress = () => {
        const isToSearch = province && city && street;

        if (!isToSearch) return;
        setIsLoading(true);
        Api()
            .get(
                route("cep.searchstreet", {
                    province,
                    city,
                    searchParam: street,
                })
            )
            .then((response) => response.json())
            .then((json) => {
                console.log(json.content);
                setAddresses(json.content);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onItemSearchPress = (item) => {
        setDataForm((data) => ({
            ...data,
            neighborhood: item.bairro,
        }));
        setDataForm((data) => ({
            ...data,
            city: item.localidade,
        }));
        setDataForm((data) => ({
            ...data,
            address: item.logradouro,
        }));
        setDataForm((data) => ({ ...data, province: item.uf }));
        setDataForm((data) => ({
            ...data,
            zip_code: item.cep.replace("-", ""),
        }));

        setIsVisible(false);
    };

    return (
        <div>
            <div>
                <h2 className="text-lg font-medium text-gray-900">
                    Buscar endereço pelo cep
                </h2>
                <h4 className="text-lg text-gray-500">
                    Informe UF, Cidade para buscar o endereço
                </h4>
                <InputLabel htmlFor="uf" value="UF" />
                <TextInput
                    id="province"
                    className="mt-1 block w-full"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    required
                    isFocused
                    autoComplete="province"
                />
                <InputLabel htmlFor="city" value="Cidade" />
                <TextInput
                    id="city"
                    className="mt-1 block w-full"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    isFocused
                    autoComplete="city"
                />

                <InputLabel htmlFor="street" value="Rua" />
                <div className="flex flex-row">
                    <TextInput
                        id="street"
                        className="mt-1 block w-full"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                        isFocused
                        autoComplete="city"
                    />
                    <button
                        className="px-5 ml-2 rounded py-2 border"
                        onClick={onSearchPress}
                    >
                        Buscar
                    </button>
                </div>
            </div>
            {isLoading && <p>Carregando...</p>}
            {!!addresses?.length && (
                <div class="overflow-scroll max-h-96">
                    <ul>
                        {addresses.map((address) => (
                            <li
                                onClick={() => onItemSearchPress(address)}
                                className="cursor-pointer p-2"
                                key={address.ibge}
                            >
                                {address.logradouro}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
