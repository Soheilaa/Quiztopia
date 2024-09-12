import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material';
import './QuizNamePage.css';

const QuizNamePage: React.FC = () => {
    const [quizName, setQuizName] = useState<string>(''); // Quiz name state
    const [error, setError] = useState<string>(''); // Error state for validation
    const [duplicateQuizError, setDuplicateQuizError] = useState<string>(''); // Error for duplicate quiz names
    const navigate = useNavigate();

    // Check if the username is stored in sessionStorage when the component mounts
    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (!storedUsername) {
            navigate('/'); // Redirect to login if no username is found
        }
    }, [navigate]);

    // Function to check if the quiz name is a duplicate (replace with API call as needed)
    const isDuplicateQuizName = (quizName: string): boolean => {
        const existingQuizNames = ['Quiz1', 'Quiz2', 'Sample Quiz']; // Example data
        return existingQuizNames.includes(quizName);
    };

    // Handle form submission and validation
    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setDuplicateQuizError('');

        // Validate quiz name
        if (!quizName.trim()) {
            setError('Quiz name is required.');
            return;
        }

        const username = sessionStorage.getItem('username');
        if (!username) {
            setError('No username found in session storage.');
            return;
        }

        // Check for duplicate quiz names
        if (isDuplicateQuizName(quizName)) {
            setDuplicateQuizError('This quiz name is already taken. Please choose another name.');
            return;
        }

        // If all validations pass, navigate to the quiz form page with quizName and username
        navigate('/quiz-form', { state: { quizName, username } });
    };

    return (
        <div className="quiz-name-container">
            <Paper className="quiz-name-overlay">
                <Typography variant="h4">Enter Quiz Name</Typography>
                {error && <Typography color="error">{error}</Typography>}
                {duplicateQuizError && <Typography color="error">{duplicateQuizError}</Typography>}
                <form onSubmit={handleSave} className="quiz-name-form">
                    <TextField
                        label="Quiz Name"
                        variant="outlined"
                        value={quizName}
                        onChange={(e) => setQuizName(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Proceed to Quiz Form
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default QuizNamePage;
