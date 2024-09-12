import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import QuizMap from './QuizMap';
import './QuestionsMap.css';

type MarkerData = {
    position: [number, number];
    question: string;
    answer: string;
};

const QuestionMap: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { userId, quizId } = location.state || {}; // Retrieve userId and quizId from the previous page state

    // Log to help debug if location.state contains userId and quizId
    console.log("Location state:", location.state);

    useEffect(() => {
        // Redirect if userId or quizId are missing
        if (!userId || !quizId) {
            setErrorMessage('');
            return;
        }

        const fetchQuiz = async () => {
            try {
                const response = await fetch(`https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/${userId}/${quizId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                // Log the fetched data for debugging
                console.log("Quiz data fetched:", data);

                if (data && data.quiz && Array.isArray(data.quiz.questions)) {
                    // Transform the questions to the MarkerData format
                    const fetchedMarkers = data.quiz.questions.map((question: any) => {
                        const latitude = parseFloat(question.location.latitude);
                        const longitude = parseFloat(question.location.longitude);

                        if (isNaN(latitude) || isNaN(longitude)) {
                            console.error(`Invalid location for question: ${question.question}`);
                            return null; // Skip invalid markers
                        }

                        return {
                            position: [latitude, longitude],
                            question: question.question,
                            answer: question.answer,
                        };
                    }).filter(Boolean); // Filter out any null markers

                    setMarkers(fetchedMarkers);
                } else {
                    setErrorMessage('Quiz data is unavailable or incorrectly formatted.');
                }
            } catch (error) {
                console.error('Error fetching quiz:', error);
                setErrorMessage('Error fetching quiz data.');
            }
        };

        fetchQuiz();
    }, [userId, quizId]);

    return (
        <div className="question-map-page">
            <Navbar />
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
            <div className="question-map-content">
                <h1>Quiz Map</h1>
                {errorMessage && <p>{errorMessage}</p>}
                <QuizMap /> {/* QuizMap automatically uses markers from location.state */}
            </div>
        </div>
    );
};

export default QuestionMap;
