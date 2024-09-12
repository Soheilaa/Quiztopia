import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
    center: [number, number];
    onLocationSelect?: (location: [number, number]) => void;
    markers: Array<{ position: [number, number]; question: string; answer: string }>;
    readOnly?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ center, onLocationSelect, markers, readOnly = false }) => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                if (!readOnly && onLocationSelect) {
                    const selectedPosition = [e.latlng.lat, e.latlng.lng] as [number, number];
                    setPosition(selectedPosition);
                    onLocationSelect(selectedPosition);
                }
            }
        });

        return position === null || readOnly ? null : (
            <Marker position={position}>
                <Popup>Selected Location</Popup>
            </Marker>
        );
    };

    return (
        <div>
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
                dragging={!readOnly}
                touchZoom={!readOnly}
                doubleClickZoom={!readOnly}
                scrollWheelZoom={!readOnly}
                boxZoom={!readOnly}
                keyboard={!readOnly}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker.position}>
                        <Popup>
                            <strong>Question:</strong> {marker.question} <br />
                            <strong>Answer:</strong> {marker.answer}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;

