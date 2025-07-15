// src/MapView.jsx
import React, { useState } from 'react';
import { MapContainer, ImageOverlay, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 1) Define CRS Simple bounds (adjust to image resolution if needed)
const bounds = [[0, 0], [1000, 1000]]; // Replace 1000x1000 with your real image dimensions

// 2) Floor plans config
const floorPlans = {
  ground: {
    label: 'Ground Floor',
    imageUrl: '/maps/ground.jpg',
    markers: [
      { id: 1, name: 'Main Entrance', position: [500, 950] },
      // Add more ground markers here
    ],
  },
  basement: {
    label: 'Basement',
    imageUrl: '/maps/basement.jpg',
    markers: [
      // Add basement markers here
    ],
  },
  first: {
    label: 'First Floor',
    imageUrl: '/maps/floor1.jpg',
    markers: [
      // Add first floor markers here
    ],
  },
  second: {
    label: 'Second Floor',
    imageUrl: '/maps/floor2.jpg',
    markers: [
      // Add second floor markers here
    ],
  },
  third: {
    label: 'Third Floor',
    imageUrl: '/maps/floor3.jpg',
    markers: [
      // Add third floor markers here
    ],
  },
};

export default function MapView() {
  const [currentFloor, setCurrentFloor] = useState('ground');
  const [zoomLevel, setZoomLevel] = useState(0);
  const { imageUrl, markers } = floorPlans[currentFloor];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Floor Selector Dropdown */}
      <div style={{ padding: '8px', background: '#fff', zIndex: 1000 }}>
        <select
          value={currentFloor}
          onChange={(e) => setCurrentFloor(e.target.value)}
        >
          {Object.entries(floorPlans).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Map Display */}
      <MapContainer
        crs={L.CRS.Simple}
        bounds={bounds}
        minZoom={-1}
        maxZoom={2}
        style={{ flex: 1 }}
        whenCreated={(map) => {
          map.on('zoomend', () => setZoomLevel(map.getZoom()));
        }}
      >
        {/* Floorplan Image */}
        <ImageOverlay url={imageUrl} bounds={bounds} />

        {/* Markers shown if zoomed in */}
        {zoomLevel >= 0 && markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Tooltip direction="top" offset={[0, -10]} permanent>
              {marker.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
