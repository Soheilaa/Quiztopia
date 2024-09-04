import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateAccount from './components/CreateAccount';
import LoginForm from './components/LoginForm ';
import QuizNamePage from './components/QuizNamePage';
import MapComponent from './components/MapComponent';
import QuizForm from './components/QuizForm';
import AllQuestions from './components/AllQuestions';
import QuestionMap from './components/QuestionsMap';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
    const isLoggedIn = !!sessionStorage.getItem('token');

    const mapCenter: [number, number] = [51.505, -0.09];
    const markers: Array<{ position: [number, number]; question: string; answer: string }> = [
        { position: [51.505, -0.09], question: 'What is this place?', answer: 'A famous place' }
    ];

    const handleLocationSelect = (location: [number, number]) => {
        console.log('Selected Location:', location);
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route
                        path="/quiz-form"
                        element={isLoggedIn ? <QuizForm /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/map"
                        element={
                            <MapComponent
                                center={mapCenter}
                                markers={markers}
                                onLocationSelect={handleLocationSelect}
                            />
                        }
                    />
                    <Route path="/all-questions" element={<AllQuestions />} />
                    <Route path="/question-map" element={<QuestionMap />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/quiz-name-page" element={<QuizNamePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


