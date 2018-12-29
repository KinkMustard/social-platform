import * as yup from "yup"

export const usernameNotLongEnough = "username must be at least 3 characters"
export const usernameTooLong = "username must be at less than 30 characters"
export const usernameDoesNotContainOnlyLettersAndNumbers =
  "username can only contain letters and numbers"
export const emailNotLongEnough = "email must be at least 3 characters"
export const emailTooLong = "email must be less than 255 characters"
export const passwordNotLongEnough = "password must be at least 3 characters"
export const passwordTooLong = "password must be less than 255 characters"
export const invalidEmail = "email must be a valid email"

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required()

export const validUserSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, usernameDoesNotContainOnlyLettersAndNumbers)
    .min(3, usernameNotLongEnough)
    .max(30, usernameTooLong)
    .required(),
  email: yup
    .string()
    .email(invalidEmail)
    .min(3, emailNotLongEnough)
    .max(255, emailTooLong)
    .required(),
  password: registerPasswordValidation
})

const invalidLogin = "invalid login"

export const loginSchema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .required(),
  password: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .required()
})

export const changePasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation
})
