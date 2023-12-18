import DangerButton from "@/Components/DangerButton";
import { EditContact } from "../EditContact";
import { useMapContext } from "@/Contexts/map-context";
import { Api } from "@/Services/Api";
import { useGlobalContext } from "@/Contexts/global-context";

export function ContactSearchItemList({ item }) {
    const { addMarker } = useMapContext();
    const { updateContacts } = useGlobalContext();

    const onItemPress = () => {
        const marker = {
            lat: parseFloat(item.address.lat),
            lng: parseFloat(item.address.long),
        };
        addMarker(marker);
    };

    const onDeleteHandlePress = () => {
        Api()
            .remove(route("contact.delete", item.id))
            .then((response) => response.json())
            .then((json) => {
                if (json.success) {
                    updateContacts();
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="flex flex-row">
            <div class="flex flex-1">
                <button onClick={onItemPress}>{item.name}</button>
            </div>
            <div class="flex flex-row">
                <EditContact contact={item} />
                <DangerButton onClick={onDeleteHandlePress} className="ml-2">
                    x
                </DangerButton>
            </div>
        </div>
    );
}
