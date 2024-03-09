const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/comments/add', async (req, res) => {
    const { instructor_id, lead_id, course_id, comment_text } = req.body;
    if (!instructor_id || !lead_id || !course_id || !comment_text)
        return res.status(400).json({ message: 'Missing required fields' });
    
    try {
        const [result] = await pool.query('INSERT INTO Comments (instructor_id, lead_id, course_id, comment_text, comment_date) VALUES (?, ?, ?, ?, CURRENT_DATE())', [instructor_id, lead_id, course_id, comment_text]);
        return res.status(result.affectedRows === 1 ? 201 : 500).json({ message: result.affectedRows === 1 ? 'Comment added successfully' : 'Failed to add comment' });
    } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
