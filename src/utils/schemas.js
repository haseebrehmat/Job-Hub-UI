import * as Yup from 'yup'

import { isValidFileTypeForAvatar } from './helpers'

import { today } from '@constants/dashboard'
import { MAX_FILE_SIZE } from '@constants/profile'

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
    company: Yup.string().required('Please select company'),
    roles: Yup.string().required('Role is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
})

export const integrationSchema = Yup.object().shape({
    company: Yup.string().required('Please select company'),
    name: Yup.string().required('Please select integration type'),
    api_key: Yup.string().required('Api key is required'),
    status: Yup.boolean().required('Status is required'),
})

export const teamSchema = Yup.object().shape({
    name: Yup.string().required('Team name is required'),
    reporting_to: Yup.string().required('Please select reporting to'),
    members: Yup.array().required('Please select members'),
})

export const profileSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
})

export const updatePasswordSchema = Yup.object().shape({
    old_password: Yup.string().required('Old Password is required'),
    new_password: Yup.string().required('Password is required'),
    confirmed_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
})

export const avatarSchema = Yup.object().shape({
    file: Yup.mixed()
        .required('Required')
        .test('is-valid-type', 'Not a valid image type', value =>
            isValidFileTypeForAvatar(value && value.name.toLowerCase(), 'file')
        )
        .test('is-valid-size', 'Max allowed size is 4MBs', value => value && value.size <= MAX_FILE_SIZE),
})
