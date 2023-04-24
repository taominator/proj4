const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Student = require('../models/studentModel')



// @desc    Get all students
// @route   GET /api/students
// @access  Public
const getStudents = asyncHandler(async (req, res) => {
   const students = await Student.findAll();
   res.status(200).json(students);
 });
  


 // @desc    Get student by ID
 // @route   GET /api/students/:id
 // @access  Public
 const getStudent = asyncHandler(async (req, res) => {
   console.log(req.params.id);
   const student = await Student.findById(req.params.id);
 
   if (!student) {
     res.status(404);
     throw new Error('Student not found');
   }
 
   res.status(200).json(student);
 });


// @desc    Register a new student
// @route   /api/students
// @access  Public
const registerStudent = asyncHandler(async (req, res) => {
  const { student_name, student_email, student_major, password } = req.body;

  console.log(student_name);
  console.log(student_email);
  console.log(student_major);
  console.log(password);

  // Validation
  if (!student_name || !student_email || !student_major || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if student already exists
  const studentExists = await Student.findByEmail(student_email)

  if (studentExists) {
    res.status(400)
    throw new Error('Student already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create student
  await Student.create({
    student_name,
    student_email,
    student_major,
    password: hashedPassword,
  })

  const student = await Student.findByEmail(student_email);

  console.log(student);

  if (student) {
    res.status(201).json({
      id: student.student_id,
      name: student.student_name,
      email: student.student_email,
      major: student.student_major,
      token: generateToken(student.student_id)
    })
  } else {
    res.status(400)
    throw new error('Invalid student data')
  }
})

// @desc    Login a student
// @route   /api/student/login
// @access  Public
const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const student = await Student.findByEmail(email)
  console.log(email);

  // Check student and passwords match
  if (student && (await bcrypt.compare(password, student.password))) {
    res.status(200).json({
      id: student.student_id,
      name: student.student_name,
      email: student.student_email,
      major: student.student_major,
      token: generateToken(student.student_id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get current student
// @route   /api/student/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const student = {
    id: req.student.id,
    email: req.student.email,
    name: req.student.name,
    major: req.student.major
  }
  res.status(200).json(student)
})

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


// @desc    Update student
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const updatedStudent = await Student.update(req.params.id, req.body);

  res.status(200).json(updatedStudent);
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  await Student.delete(req.params.id);

  res.status(200).json({ success: true });
});


module.exports = {
  getStudents,
  getStudent,
  registerStudent,
  loginStudent,
  getMe,
  updateStudent,
  deleteStudent,
}
