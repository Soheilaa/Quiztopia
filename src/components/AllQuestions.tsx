import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Paper, Button } from '@mui/material';
import Navbar from './Navbar';

const baseUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";

// Define MarkerData type for the markers
type MarkerData = {
    position: [number, number]; // Latitude and Longitude as tuple
    question: string;           // Question text
    answer: string;             // Answer text
};

interface Question {
    location: {
        latitude: string;
        longitude: string;
    };
    question: string;
    answer?: string;   // Optional answer property
}

interface Quiz {
    questions: Question[];
    username: string;
    quizId: string;
    userId: string;
}

const AllQuestions: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                setErrorMessage('You must be logged in to access this page.');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${baseUrl}/quiz`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message || "Failed to fetch quizzes, please try again.");
                } else {
                    const data = await response.json();
                    if (data.success && Array.isArray(data.quizzes)) {
                        setQuizzes(data.quizzes);
                    } else {
                        setErrorMessage("Failed to fetch quizzes, please try again.");
                    }
                }
            } catch (error) {
                setErrorMessage("Failed to fetch quizzes, please try again.");
            }
        };

        fetchQuizzes();
    }, [navigate]);

    const handleVisitOnMap = (quiz: Quiz) => {
        // Map questions to markers
        const markers = quiz.questions.map((question) => {
            const latitude = parseFloat(question.location.latitude);
            const longitude = parseFloat(question.location.longitude);
    
            // Check if both latitude and longitude are valid, and question/answer are provided
            if (!isNaN(latitude) && !isNaN(longitude) && question.question && question.answer) {
                return {
                    position: [latitude, longitude] as [number, number],
                    question: question.question,
                    answer: question.answer
                };
            } else {
                console.error("Invalid data:", question);
                return null;
            }
        })
        // Filter out any invalid markers
        .filter((marker): marker is MarkerData => marker !== null);

        console.log("Markers being sent to map:", markers);

        // Navigate to the map view with markers as state
        navigate('/question-map', { state: { markers } });
    };
    
    return (
        <Box sx={{ marginTop: '60px' }}>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '60px',
                }}
            >
                <Paper sx={{ padding: 2, width: '100%', maxWidth: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                        Quiz List
                    </Typography>
                    {errorMessage && <p>{errorMessage}</p>}

                    <Box sx={{ width: '90%', marginTop: 2 }}>
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        marginBottom: 2,
                                        padding: 2,
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <Typography variant="h6">
                                        Quiz ID: {quiz.quizId || 'No ID provided'}
                                    </Typography>
                                    <Typography variant="body1">
                                        Created by: {quiz.username || 'No user provided'}
                                    </Typography>
                                    <Typography variant="body2">
                                        Number of questions: {quiz.questions.length || 0}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleVisitOnMap(quiz)}
                                        sx={{ mt: 2 }}
                                    >
                                        Visit on Map
                                    </Button>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1">No quizzes available.</Typography>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default AllQuestions;
