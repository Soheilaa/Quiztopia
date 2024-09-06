import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

// Define the LandingPage functional component
const LandingPage: React.FC = () => {
    // Hook to programmatically navigate to different routes
    const navigate = useNavigate();
    
    // State to manage transition effect for login button
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    // Handler function for the Login button click event
    const handleLoginClick = () => {
        // Trigger the transition effect
        setIsTransitioning(true);

        // Navigate to the '/login' route after a 1-second delay
        // This delay matches the duration of the slide-in transition
        setTimeout(() => navigate('/login'), 1000);
    };

    return (
        <div className={`landing-container ${isTransitioning ? 'transitioning' : ''}`}>
            <h1>Quiztopia</h1>
            <div id="button-container">
                <button onClick={() => navigate('/create-account')}>Create New Account</button>
                <button onClick={handleLoginClick}>Log In</button>
            </div>
            <div className={`login-slide ${isTransitioning ? 'visible' : ''}`}>
            </div>
        </div>
    );
};

export default LandingPage;
