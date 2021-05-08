const { body, validationResult } = require('express-validator')
const loginValidationRules = () => {
  return [
    body('username').trim().escape().isLength({min: 5, max: 25}).matches(/^[a-zA-Z0-9]+$/),
    body('password').isLength({ min: 8, max: 20 }).matches(/^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^\w\s]).{8,20}$/),
  ]
}

const signupValidationRules = () => {
    return [
      body('username').trim().escape().isLength({min: 5, max: 25}).matches(/^[a-zA-Z0-9]+$/),
      body('password').isLength({ min: 8, max: 20 }).matches(/^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^\w\s]).{8,20}$/),
      body('firstname').trim().escape().isLength({min: 1, max: 50}).matches(/^[a-zA-Z]+$/),
      body('lastname').trim().escape().isLength({min: 1, max: 50}).matches(/^[a-zA-Z]+$/),
      body('email').isEmail(),
    ]
  }

  const changePassValidationRules = () => {
    return [
      body('username').trim().escape().isLength({min: 5, max: 25}).matches(/^[a-zA-Z0-9]+$/),
      body('password').isLength({ min: 8, max: 20 }).matches(/^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^\w\s]).{8,20}$/),
      body('newpass').isLength({ min: 8, max: 20 }).matches(/^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^\w\s]).{8,20}$/),
    ]
  }

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  console.log(extractedErrors)
  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  loginValidationRules,
  signupValidationRules,
  changePassValidationRules,
  validate,
}