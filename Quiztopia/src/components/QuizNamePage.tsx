import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material';
import './QuizNamePage.css';

const QuizNamePage: React.FC = () => {
    const [quizName, setQuizName] = useState<string>(''); // Changed quizId to quizName for clarity
    const [error, setError] = useState<string>('');
    const [duplicateQuizError, setDuplicateQuizError] = useState<string>(''); // For duplicate quiz name error
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (!storedUsername) {
            navigate('/'); // Redirect to login if no username found
        }
    }, [navigate]);

    // Function to check if the quiz name already exists (e.g., from an API or locally stored data)
    const isDuplicateQuizName = (quizName: string): boolean => {
        // For demonstration, using static existing quiz names
        const existingQuizNames = ['Quiz1', 'Quiz2', 'Sample Quiz']; // Replace this with actual API call or logic
        return existingQuizNames.includes(quizName);
    };

    // Function to handle the save process
    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setDuplicateQuizError('');

        // Validate if the quiz name is empty
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

        // Navigate to the quiz form with quizName and username
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







