// routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacherController');

// API routes related to teachers
router.get('/teachers', TeacherController.getAllTeachers);
router.post('/addTeacher', TeacherController.createTeacher);
router.delete('/teachers/:teacherId', TeacherController.deleteTeacher);

module.exports = router;
