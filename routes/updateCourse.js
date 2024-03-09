const express = require('express');
const router = express.Router();
const pool = require('../db'); 

router.put('/courses/:courseId/update', async (req, res) => {
    const courseId = req.params.courseId;
    const { title, description, max_seats, start_date, end_date } = req.body;

    if (!title && !description && !max_seats && !start_date && !end_date) {
        return res.status(400).json({ message: 'No fields provided for update' });
    }

    let updateFields = [];
    let updateValues = [];

    if (title) {
        updateFields.push('title = ?');
        updateValues.push(title);
    }
    if (description) {
        updateFields.push('description = ?');
        updateValues.push(description);
    }
    if (max_seats) {
        updateFields.push('max_seats = ?');
        updateValues.push(max_seats);
    }
    if (start_date) {
        updateFields.push('start_date = ?');
        updateValues.push(start_date);
    }
    if (end_date) {
        updateFields.push('end_date = ?');
        updateValues.push(end_date);
    }

    updateValues.push(courseId); 

    try {
        const [result] = await pool.query(`UPDATE Courses SET ${updateFields.join(',')} WHERE course_id = ?`, updateValues);

        if (result.affectedRows === 1) {
            res.status(200).json({ message: 'Course details updated successfully' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error('Error updating course details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
