CREATE TABLE IF NOT EXISTS Instructors (
    instructor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
);

CREATE TABLE IF NOT EXISTS Courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    instructor_id INT,
    title VARCHAR(100),
    description TEXT,
    max_seats INT, 
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
);

CREATE TABLE IF NOT EXISTS Leads (
    lead_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    learner_name VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    linkedin_url VARCHAR(255),
    application_date DATE,
    status VARCHAR(20),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);


CREATE TABLE IF NOT EXISTS Comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    instructor_id INT,
    lead_id INT,
    course_id INT,
    comment_text TEXT,
    comment_date DATE,
    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id),
    FOREIGN KEY (lead_id) REFERENCES Leads(lead_id)
);


INSERT IGNORE INTO Instructors (name, email, expertise_area) VALUES
('Dhaval Trivedi', 'dhaval.trivedi@airtribe.com', 'Design'),
('Navneet Sharma', 'navneet.sharma@airtribe.com', 'Product engineer'),
('Aseem Mehta', 'aseem.mehta@airtribe.com', 'Product Management'),
('Ravi Patel', 'ravi.patel@airtribe.com', 'Web Development'),
('Neha Gupta', 'neha.gupta@airtribe.com', 'Data Science');


INSERT IGNORE INTO Courses (instructor_id, title, description, max_seats, start_date, end_date) VALUES
(1, 'Nuxt.js - Vue.js on Steroids', 'Build highly engaging Vue JS applications with Nuxt.js.', 60, '2024-03-25', '2024-05-25'),
(2, 'React - The Complete Guide (incl Hooks, React Router, Redux)', 'Dive in and learn React from scratch.', 70, '2024-04-01', '2024-06-01'),
(3, 'Python for Data Science and Machine Learning Bootcamp', 'Learn Python for Data Science, Machine Learning, and more!', 80, '2024-03-20', '2024-05-20');


INSERT IGNORE INTO Leads (course_id, learner_name, email, phone_number, linkedin_url, application_date, status) VALUES
(1, 'Pranay Kumar', 'pranay.kumar@gmail.com', '9876543210', 'https://www.linkedin.com/in/pranay-kumar/', '2024-03-10', 'Pending'),
(2, 'Easwanth Konduru', 'easwanth.konduru@gmail.com', '9876543211', 'https://www.linkedin.com/in/easwanth-konduru/', '2024-03-12', 'Accepted'),
(3, 'Aravind', 'aravind@gmail.com', '9876543212', 'https://www.linkedin.com/in/aravind/', '2024-03-14', 'Rejected');


INSERT IGNORE INTO Comments (instructor_id, lead_id, course_id, comment_text, comment_date) VALUES
(1, 1, 1, 'Great to see your interest! We will review your application soon.', '2024-03-11'),
(2, 2, 2, 'Welcome to the course! Feel free to ask any questions.', '2024-03-13'),
(3, 3, 3, 'Thank you for your application. Unfortunately, this course is currently full.', '2024-03-15');
