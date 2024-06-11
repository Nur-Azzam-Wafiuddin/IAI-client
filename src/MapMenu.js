import React from 'react';

const MapMenu = ({mapRef}) => {

    const map = mapRef.current;

    const handleFly = () => {
        map.flyTo([-7.819405, 110.357586], 12)
    }


    return (
        <div className="absolute w-52 h-16 right-5 top-0 flex justify-end items-center gap-5">
            <div className="bg-white h-10 w-10 rounded-md z-50 cursor-pointer flex items-center justify-center drop-shadow-md hover:bg-slate-100" onClick={() => handleFly()}>
                <img src="/zoom_out.svg" alt="Icon" className="w-8 h-8" />            
            </div>
      </div>
    );
}

export default MapMenu;
