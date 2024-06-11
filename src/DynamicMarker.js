import React from 'react';
import { Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import { AQIColor } from './helperfunction';

const DynamicMarker = ({ position, index, properties, handleClick, setToggleDisplayData }) => {

    const markerColor = AQIColor(properties.air_quality_index);

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
