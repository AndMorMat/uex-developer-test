import { AddContact } from "@/Components/Contacts/AddContact";
import { ContactSearch } from "@/Components/Contacts/ContactSearch";
import { MapWrapper } from "@/Components/Map";
import { GlobalProvider } from "@/Contexts/global-context";
import { MapProvider } from "@/Contexts/map-context";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <GlobalProvider>
                <div className="py-12">
                    <div className="max-w-screen-2xl mx-auto ">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <MapProvider>
                                <div className="p-6 text-gray-900 flex flex-row">
                                    <div>
                                        <AddContact />
                                        <ContactSearch />
                                    </div>
                                    <div className="flex-1">
                                        <MapWrapper />
                                    </div>
                                </div>
                            </MapProvider>
                        </div>
                    </div>
                </div>
            </GlobalProvider>
        </AuthenticatedLayout>
    );
}
