import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Navbar from './Navbar';
import 'leaflet/dist/leaflet.css';
import './QuizMap.css'; // Import the CSS file

type MarkerData = {
    position: [number, number];
    question: string;
    answer: string;
};

const QuizMap: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const markers: MarkerData[] = location.state?.markers || [];

    console.log("Markers in QuizMap component:", markers);

    const mapCenter: [number, number] = markers.length > 0
        ? markers[0].position
        : [59.326464, 18.0584448]; // Default center (Stockholm)

    return (
        <div>
            {/* Render Navbar at the top */}
            <Navbar />
            
            {/* Back button */}
            <button onClick={() => navigate(-1)} className="back-button">
                Back
            </button>

            {/* Map container */}
            <div className="map-container">
                <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {markers.length === 0 ? (
                        <p>No markers to display</p>
                    ) : (
                        markers.map((marker: MarkerData, index: number) => {
                            const [lat, lng] = marker.position;

                            if (isNaN(lat) || isNaN(lng)) {
                                console.error(`Invalid marker position: [${lat}, ${lng}] for marker index ${index}`);
                                return null;
                            }

                            return (
                                <Marker key={index} position={marker.position}>
                                    <Popup>
                                        <strong>Question:</strong> {marker.question}<br />
                                    </Popup>
                                </Marker>
                            );
                        })
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default QuizMap;

