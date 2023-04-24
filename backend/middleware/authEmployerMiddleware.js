const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Employer = require('../models/employerModel')

const protectEmployer = asyncHandler(async (req, res, next) => {
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
      // Get employer from token
      req.employer = await Employer.findById(decoded.id)//.select('-password')
      // NOTE: We need to check if a employer was found
      // https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/30591026#questions/17843570
      if (!req.employer) {
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

module.exports = { protectEmployer }
