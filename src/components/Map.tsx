"use client";

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type CenterType = {
  latitude: number,
  longitude: number
}

export default function Map({
  children,
  center
}: {
  children: React.ReactNode,
  center: CenterType
}) {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </div>
  );
}