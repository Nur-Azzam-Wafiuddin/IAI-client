import React, { useEffect, useState, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { MapContainer, TileLayer, GeoJSON, Popup, Marker, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import MoveMarker from './MoveMarker';
import provinceData from './indonesia-prov.json';

const ENDPOINT = 'http://localhost:4000';

function MyComponent({ data }) {
  const map = useMap();
  // map.flyTo([51.51 * (data/5), -51])
  return null;
}

function App() {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [dataGeo, setDataGeo] = useState(null);
  const [centerCoords, setCenterCoords] = useState([-2.5489, 118.0149]);
  const geojsonRef = useRef([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('data', (receivedData) => {
      setData(receivedData);
    });

    socket.on('data2', (receivedData) => {
      setData2(receivedData);
    });

    socket.on('dataGeo', (receivedData) => {
      setDataGeo(receivedData);
      if (geojsonRef.current[receivedData.id - 1]) {
        const featureRef = geojsonRef.current[receivedData.id - 1].ref.current;
        if (receivedData.level > 0.8) {
          featureRef.setStyle({ color: "red" });
        } else if (receivedData.level > 0.3 && receivedData.level < 0.8) {
          featureRef.setStyle({ color: "yellow" });
        } else {
          featureRef.setStyle({ color: "green" });
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (provinceData.features) {
      geojsonRef.current = provinceData.features.map((feature, index) => ({
        ref: React.createRef(),
        ...feature
      }));
      setLoading(true);
    }
  }, []);

  const onEachProvince = (feature, layer) => {
    const provinceName = feature.properties.Propinsi;
    layer.bindPopup(provinceName);
    layer.on('popupopen', () => {
      layer.setStyle({ fillOpacity: 0.8 });
    });
    layer.on('popupclose', () => {
      layer.setStyle({ fillOpacity: 0.2 });
    });
  };

  return (
    <div>
      <h1>Data Stream App</h1>
      <div style={{ height: "400px", width: "100wh" }}>
        {data !== null && <p className='text-3xl'>Data from server: {data}</p>}
        <MapContainer
          center={[-2.5489, 118.0149]}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: '100vh', width: '100wh' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <MoveMarker data={centerCoords} color={'red'} /> */}
          <MyComponent data={data} />
          {loading && geojsonRef.current.map((region, index) => (
            <GeoJSON
              key={index}
              ref={region.ref}
              data={region}
              onEachFeature={onEachProvince}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
