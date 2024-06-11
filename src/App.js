import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DynamicMarker from "./DynamicMarker";
import PanelData from "./PanelData";
import MapMenu from "./MapMenu";
import axios from "axios"; // Import axios for HTTP requests


const API_URL = "https://iai-be-deploy.vercel.app/api/hello"; // Updated API endpoint

function App() {
  const mapRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayDataIndex, setDisplayDataIndex] = useState(0);
  const [toggleDisplayData, setToggleDisplayData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data.features);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDataInterval = setInterval(fetchData, 3000); // Fetch data every 3 seconds

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, []);

  const handleClick = (index) => {
    console.log("Marker clicked:", index);
    setDisplayDataIndex(index);
  };

  return (
    <div>
      <MapMenu mapRef={mapRef}/>
      {loading && (
        <div className={`absolute z-50 ${toggleDisplayData ? '':'-translate-x-96 opacity-0' } top-1/2 -translate-y-1/2 duration-200 shadow-lg ml-10`}>
          <PanelData properties={data[displayDataIndex].properties} />
        </div>
        )
      }
      <div class="w-full h-screen relative z-0">
        <div style={{ height: "400px", width: "100wh" }}>
          <MapContainer 
          center={[-7.819405, 110.357586]} 
          zoom={12} 
          scrollWheelZoom={true} 
          style={{ height: "100vh", width: "100wh" }}
          ref={mapRef}
          whenReady={() => {
            setMapInitialized(true)
          }}
          >
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
