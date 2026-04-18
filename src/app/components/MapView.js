"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView() {
  const locations = [
    { name: "Mata Mandir", pos: [23.233, 77.432] },
    { name: "Ayodhya Nagar", pos: [23.259, 77.463] },
    { name: "Bhopal Camp", pos: [23.250, 77.410] },
  ];

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700">
      <MapContainer
        center={[23.2599, 77.4126]}
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations.map((item, i) => (
          <Marker key={i} position={item.pos}>
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}