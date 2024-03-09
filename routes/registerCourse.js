const express = require('express');
const router = express.Router();
const pool = require('../db'); 

router.post('/courses/:courseId/register', async (req, res) => {
    const courseId = req.params.courseId;
    const { learner_name, email, phone_number, linkedin_url } = req.body;

    if (!learner_name || !email || !phone_number || !linkedin_url) return res.status(400).json({ message: 'Missing required fields' });
    
    try {
        const [result] = await pool.query('INSERT INTO Leads (course_id, learner_name, email, phone_number, linkedin_url, application_date, status) VALUES (?, ?, ?, ?, ?, CURDATE(), "Pending")', [courseId, learner_name, email, phone_number, linkedin_url]);
        return res.status(result.affectedRows === 1 ? 201 : 500).json({
            message: result.affectedRows === 1 ? 'Registration successful' : 'Failed to register for the course'
        });
    } catch (error) {
        console.error('Error registering for the course:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
