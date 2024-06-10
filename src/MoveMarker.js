import React from 'react';
import { MapContainer, TileLayer, Popup, Marker, CircleMarker } from 'react-leaflet';


const MoveMarker = ({centerCoords, color}) => {

    const redOptions = { color: 'red'}

    console.log(centerCoords)

    return (
        // <CircleMarker center={centerCoords} pathOptions={redOptions} radius={20}>
        //     <Popup>Popup in CircleMarker</Popup>
        // </CircleMarker>
        <>
        </>
    );
}

export default MoveMarker;
