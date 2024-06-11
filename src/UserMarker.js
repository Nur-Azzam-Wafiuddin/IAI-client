import React from 'react';
import { Popup, Marker } from 'react-leaflet';
import L from 'leaflet';


const UserMarker = ({position}) => {

    const CustomMarkerIcon = L.divIcon({
        className: 'custom-marker-icon',
        html: `
        <div class="relative w-8 h-8">
          <div class="absolute w-6 h-6 bg-blue-600 bg-opacity-25 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute w-4 h-4 bg-blue-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      `,
    });


    return (
      <Marker position={position} icon={CustomMarkerIcon}
      >
        <Popup>
          You are here: {position[0]}, {position[1]}
        </Popup>
      </Marker>
    );
}

export default UserMarker;
