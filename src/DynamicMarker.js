import React from 'react';
import { Popup, Marker } from 'react-leaflet';
import L from 'leaflet';

const DynamicMarker = ({ position, index, properties, handleClick, setToggleDisplayData }) => {

    const interpolateColor = (value) => {
        const min = 50;
        const max = 150;

        const percentage = (value - min) / (max - min);

        const r = Math.round(255 * percentage);
        const g = Math.round(255 * (1 - percentage));
        const b = 0;

        return `rgb(${r}, ${g}, ${b})`;
    };

    const markerColor = interpolateColor(properties.air_quality_index);

    const CustomMarkerIcon = L.divIcon({
        className: 'custom-marker-icon',
        html: `<div class="w-8 h-8 hover:opacity-45 rounded-full flex items-center justify-center text-white font-bold" 
            style="background-color: ${markerColor};">
            ${properties.air_quality_index}
            </div>`,
    });

    return (
        <Marker 
            position={position} 
            icon={CustomMarkerIcon}
            eventHandlers={{
                click: () => {handleClick(index); setToggleDisplayData(true)},
                popupclose: () => setToggleDisplayData(false)
            }}
        >
            <Popup>
                {properties.location}
            </Popup>
        </Marker>
    );
}

export default DynamicMarker;
