// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './LandingPage.css';

// const LandingPage: React.FC = () => {
//     const navigate = useNavigate();
//     const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

//     const handleLoginClick = () => {
//         setIsTransitioning(true);

//         setTimeout(() => navigate('/login'), 1000); // 1 second matches the fade-out duration
//     };

//     return (
//         <div className={`landing-container ${isTransitioning ? 'transitioning' : ''}`}>
//             <h1>Quiztopia</h1>
//             <div id="button-container">
//                 <button onClick={() => navigate('/create-account')}>Create New Account</button>
//                 <button onClick={handleLoginClick}>Log In</button>
//             </div>
//         </div>
//     );
// };

// export default LandingPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    const handleLoginClick = () => {
        setIsTransitioning(true);

        setTimeout(() => navigate('/login'), 1000); // 1 second matches the slide-in duration
    };

    return (
        <div className={`landing-container ${isTransitioning ? 'transitioning' : ''}`}>
            <h1>Quiztopia</h1>
            <div id="button-container">
                <button onClick={() => navigate('/create-account')}>Create New Account</button>
                <button onClick={handleLoginClick}>Log In</button>
            </div>
            <div className={`login-slide ${isTransitioning ? 'visible' : ''}`}>
                {/* The login form or content should be here */}
            </div>
        </div>
    );
};

export default LandingPage;



