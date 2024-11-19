// controllers/teacherController.js
const Teacher = require('../models/teacher');

const teacherController = {
  getAllTeachers: async (req, res) => {
    try {
      const limit = req.query.limit;
      const teachers = await Teacher.find().limit(limit);
      res.json(teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createTeacher: async (req, res) => {
    const { name, email } = req.body;
    const newTeacher = new Teacher({ name, email });

    try {
      const savedTeacher = await newTeacher.save();
      res.json(savedTeacher);
    } catch (error) {
      console.error('Error creating teacher:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteTeacher: async (req, res) => {
    const teacherId = req.params.teacherId;
    try {
      const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
      if (!deletedTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json({ message: 'Teacher deleted successfully', deletedTeacher });
    } catch (error) {
      console.error('Error deleting teacher:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = teacherController;
