import { createContext, useContext, useState } from "react";

const MapContext = createContext({});
const defaultMapCenter = {
    lat: -25.443271541583464,
    lng: -49.27872840889469,
};

function isMarkersTheSame(marker1, marker2) {
    return marker1.lat === marker2.lat && marker1.lng === marker2.lng;
}

export const MapProvider = ({ children }) => {
    const [markers, setMarkers] = useState([]);
    const [center, setCenter] = useState(defaultMapCenter);

    const addMarker = (marker) => {
        const markerExists = markers.find((findMarker) =>
            isMarkersTheSame(findMarker, marker)
        );

        if (!markerExists) {
            setCenter(marker);
            setMarkers([...markers, marker]);
            return;
        }

        if (!isMarkersTheSame(center, marker)) {
            setCenter(marker);
            return;
        }

        const updatedMarkers = markers.filter(
            (m) => m.lat !== marker.lat || m.lng !== marker.lng
        );
        setMarkers(updatedMarkers);
    };

    return (
        <MapContext.Provider value={{ markers, center, addMarker }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMapContext = () => {
    return useContext(MapContext);
};
