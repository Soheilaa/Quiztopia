import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import Navbar from './Navbar';
import './QuestionsMap.css';

type Marker = {
    position: [number, number];
    question: string;
    answer: string;
};

const QuestionMap: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const markers: Marker[] = location.state?.markers || [];
    const selectedMarker: Marker | undefined = location.state?.selectedMarker;

    const mapCenter = selectedMarker?.position || markers[0]?.position || [59.326464, 18.0584448];

    return (
        <div className="question-map-page">
            <Navbar />
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
            <div className="question-map-content">
                <h1>Quiz Map</h1>
                <div className="map-container">
                    <MapComponent center={mapCenter} markers={markers} />
                </div>
            </div>
        </div>
    );
};

export default QuestionMap;





