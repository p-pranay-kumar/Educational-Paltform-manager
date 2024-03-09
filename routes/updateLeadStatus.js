const express = require('express');
const router = express.Router();
const pool = require('../db'); 
router.put('/leads/:leadId/update-status', async (req, res) => {
    const leadId = req.params.leadId;
    const { status } = req.body;
    if (!status || !['Accepted', 'Rejected', 'Waitlist'].includes(status))
        return res.status(400).json({ message: 'invalid' });
    try {
        const [result] = await pool.query('UPDATE Leads SET status = ? WHERE lead_id = ?', [status, leadId]);
        return res.status(result.affectedRows === 1 ? 200 : 404).json({
            message: result.affectedRows === 1 ? 'updated successfully' : 'not found'
        });
    } catch (error) {
        return res.status(500).json({ message: 'error' });
    }
});

module.exports = router;
