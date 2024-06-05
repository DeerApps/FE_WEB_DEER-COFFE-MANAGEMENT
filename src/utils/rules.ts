import * as yup from 'yup'

export const loginSchema = yup.object({
  employeeID: yup
    .string()
    .required('EmployeeId is Required !')
    .min(1, 'Can not under 5 characters')
    .max(160, 'Can not exceed 160 characters'),
  password: yup
    .string()
    .required('Password Is Required !')
    .min(5, 'Can not under 5 characters')
    .max(160, 'Can not exceed 160 characters')
})

export const employeeSchema = yup.object({
  employeeID: yup.string().required('Can not be Empty !').max(20, 'Maximum 20 characters !'),
  email: yup.string().required('Can not be Empty !').email('Invalid email format').max(50, 'Maximum 50 characters !'),
  fullName: yup.string().required('Can not be Empty !').max(50, 'Maximum 50 characters !'),
  phoneNumber: yup
    .string()
    .required('Can not be Empty !')
    .min(10, 'At least 10 characters !')
    .max(12, 'Maximum 12 characters !'),
  address: yup.string().required('Can not be Empty !').max(160, 'Maximum 160 characters !'),
  role: yup.string().required('Can not be Empty !').max(10, 'Maximum 10 characters !'),
  dateOfBirth: yup.date().required('Can not be Empty !'),
  dateJoined: yup.date().required('Can not be Empty !'),
  isActive: yup.boolean().required('Can not be Empty !')
})

export type EmployeeSchema = yup.InferType<typeof employeeSchema>
export type LoginSchema = yup.InferType<typeof loginSchema>
