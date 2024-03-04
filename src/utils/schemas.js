import * as Yup from 'yup'
import { today } from '@constants/dashboard'

export const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
})

export const forgotPasswordSchema = Yup.object({
    email: Yup.string().email().required(),
})

export const resetPasswordSchema = Yup.object({
    password: Yup.string().required('Pasword is required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export const filtersSchema = Yup.object().shape({
    from_date: Yup.date().max(today, 'Please choose future date'),
    to_date: Yup.date().min(Yup.ref('from_date'), "End date can't be before Start date"),
})

export const companySchema = Yup.object().shape({
    name: Yup.string().required('Company name is required'),
    status: Yup.boolean().required('Status is required'),
})

export const integrationFilterSchema = Yup.object().shape({
    company: Yup.string(),
    integration: Yup.boolean(),
})

export const roleSchema = Yup.object().shape({
    name: Yup.string().required('Role name is required'),
})

export const userSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    roles: Yup.string().required('Role is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
})

export const integrationSchema = Yup.object().shape({
    company: Yup.string().required('Please select company'),
    name: Yup.string().required('Please select integration type'),
    api_key: Yup.string().required('Api key is required'),
    status: Yup.boolean().required('Status is required'),
})
