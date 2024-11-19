// models/teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Specify the collection name explicitly
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
