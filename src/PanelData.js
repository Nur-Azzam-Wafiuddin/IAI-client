import React from 'react';

const PanelData = ({ properties }) => {
    // Destructure properties from props if needed
    console.log(properties)

    const { location, air_quality_index, pm10, pm2_5, o3, no2, so2, co, timestamp } = properties;

    return (
        <div className='h-5/6 w-10/12 bg-white rounded-lg p-4'>
            <h2 className='text-lg font-bold mb-2'>{location}</h2>
            <p>Air Quality Index: {air_quality_index}</p>
            <p>PM10: {pm10}</p>
            <p>PM2.5: {pm2_5}</p>
            <p>O3: {o3}</p>
            <p>NO2: {no2}</p>
            <p>SO2: {so2}</p>
            <p>CO: {co}</p>
            <p>Timestamp: {timestamp}</p>
        </div>
    );
}

export default PanelData;
