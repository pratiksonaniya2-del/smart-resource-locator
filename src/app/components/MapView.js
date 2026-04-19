"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const LeafletMap = dynamic(
  async () => {
    const { MapContainer, TileLayer, Marker, Popup } =
      await import("react-leaflet");

    const L = await import("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    return function Map() {
      const locations = [
        { name: "Mata Mandir", pos: [23.233, 77.432] },
        { name: "Ayodhya Nagar", pos: [23.259, 77.463] },
        { name: "Bhopal Camp", pos: [23.250, 77.410] },
      ];

      return (
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
      );
    };
  },
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);

export default function MapView() {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700">
      <LeafletMap />
    </div>
  );
}