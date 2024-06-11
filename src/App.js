import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DynamicMarker from "./DynamicMarker";
import PanelData from "./PanelData";

const ENDPOINT = "http://localhost:4000";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayDataIndex, setDisplayDataIndex] = useState(0);
  const [toggleDisplayData, setToggleDisplayData] = useState(true);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("geoinfo", (receivedData) => {
      setData(receivedData.features);
      setLoading(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = (index) => {
    console.log("Marker clicked:", index);
    setDisplayDataIndex(index);
  };

  console.log(displayDataIndex);

  return (
    <div>
      {loading && (
        <div className={`absolute z-50 ${toggleDisplayData ? '':'-translate-x-96 opacity-0' } top-1/2 -translate-y-1/2 duration-200 shadow-lg ml-10`}>
          <PanelData properties={data[displayDataIndex].properties} />
        </div>
        )
      }
      <div class="w-full h-screen relative z-0">
        <div style={{ height: "400px", width: "100wh" }}>
          <MapContainer center={[-7.7854, 110.3353]} zoom={10} scrollWheelZoom={true} style={{ height: "100vh", width: "100wh" }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {loading &&
              data.map((point, index) => (
                <DynamicMarker
                  key={index}
                  position={[point.geometry.coordinates[1], point.geometry.coordinates[0]]}
                  properties={point.properties}
                  index={index}
                  handleClick={handleClick} // Pass handleClick as prop
                  setToggleDisplayData={setToggleDisplayData}
                />
              ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
