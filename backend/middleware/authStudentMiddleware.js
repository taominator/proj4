const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Student = require('../models/studentModel')

const protectStudent = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get student from token
      req.student = await Student.findById(decoded.id)//.select('-password')
      // NOTE: We need to check if a student was found
      // https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/30591026#questions/17843570
      if (!req.student) {
        res.status(401)
        throw new Error('Not authorised')
      }

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = { protectStudent }
