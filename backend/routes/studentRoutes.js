const express = require('express');
const {
  getStudents,
  getStudent,
  registerStudent,
  loginStudent,
  getMe,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

const { protectStudent } = require('../middleware/authStudentMiddleware');

const router = express.Router();

router.get('/students', getStudents);
router.get('/:id', protectStudent, getStudent);
router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.post('/:id', protectStudent, updateStudent);
router.delete('/:id', protectStudent, deleteStudent);

module.exports = router;