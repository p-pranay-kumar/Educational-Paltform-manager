const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const pool = require('./db');
const addCourseRoute = require('./routes/addCourse');
const updateCourseRoute = require('./routes/updateCourse');
const registerCourseRoute = require('./routes/registerCourse');
const updateLeadStatusRoute = require('./routes/updateLeadStatus');
const searchLeadsRoute = require('./routes/searchLeads');
const addCommentRoute = require('./routes/addComment');




app.use(express.json());
app.use('/', addCourseRoute);
app.use('/', updateCourseRoute);
app.use('/', registerCourseRoute);
app.use('/', updateLeadStatusRoute);
app.use('/', searchLeadsRoute);
app.use('/', addCommentRoute);





const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

(async () => {
    try {
        const connection = await pool.getConnection();
        const sqlFilePath = path.join(__dirname, 'create_tables.sql');
        const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
        const sqlQueries = sqlScript.split(';').filter(query => query.trim() !== ''); // Split SQL script into individual queries

        for (const query of sqlQueries) {
            await connection.query(query); 
        }

        console.log('Tables created successfully');
        connection.release(); 
    } catch (error) {
        console.error('Error executing SQL script:', error);
    }
})();
