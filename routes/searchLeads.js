const express = require('express');
const router = express.Router();
const pool = require('../db'); 

router.get('/leads/search', async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: 'Missing search query' });
    try {
        const [leads] = await pool.query('SELECT * FROM Leads WHERE learner_name LIKE ? OR email LIKE ?', [`%${query}%`, `%${query}%`]);
        return res.status(200).json({ leads });
    } catch (error) {
        console.error('Error searching leads:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
