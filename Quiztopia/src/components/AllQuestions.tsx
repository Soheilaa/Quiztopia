import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './AllQuestions.css';

type Marker = {
    position: [number, number];
    question: string;
    username: string; 
    answer: string;
    quizName: string;
};

const AllQuestions: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const markers: Marker[] = location.state?.markers || [];
    console.log(markers); // Check if username is part of each marker

    const handleQuizClick = (quizName: string) => {
        const filteredMarkers = markers.filter(marker => marker.quizName === quizName);
        if (filteredMarkers.length > 0) {
            navigate('/question-map', { state: { markers: filteredMarkers, selectedMarker: filteredMarkers[0] } });
        } else {
            alert('No markers found for this quiz.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="all-questions-container">
                <button className="back-button" onClick={() => navigate(-1)}>Back to Quiz Form</button>
                <h1 className="all-questions-title">All Saved Questions</h1>
                <div className="question-grid">
                    {markers.length > 0 ? (
                        markers.map((marker, index) => (
                            <div key={index} className="question-card">
                                <p><strong>Quiz Name:</strong> {marker.quizName}</p>
                                <p><strong>Username:</strong> {marker.username}</p> 
                                <button
                                    className="question-button"
                                    onClick={() => handleQuizClick(marker.quizName)}
                                >
                                    View on Map
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No questions available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllQuestions;












