const express = require('express');
const router = express.Router();
const pool = require('../db'); 

router.post('/courses/add', async (req, res) => {
    const { instructor_id, title, description, max_seats, start_date, end_date } = req.body;
    if (!instructor_id || !title || !description || !max_seats || !start_date || !end_date)
        return res.status(400).json({ message: 'Missing required fields' });

    try {
        const [result] = await pool.query('INSERT INTO Courses (instructor_id, title, description, max_seats, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)',
         [instructor_id, title, description, max_seats, start_date, end_date]);
        return res.status(result.affectedRows === 1 ? 201 : 500).json({ message: result.affectedRows === 1 ? 'Course added successfully' : 'Failed to add course' });
    } catch (error) {
        console.error('Error adding course:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
