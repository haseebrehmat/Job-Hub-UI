/* eslint-disable no-useless-escape */
import * as Yup from 'yup'

import { isValidFileTypeForAvatar } from '@utils/helpers'

import { today } from '@constants/dashboard'
import { MAX_FILE_SIZE } from '@constants/profile'
import { JOB_SOURCES } from '@constants/scrapper'
import { GENERIC_SKILL_TYPES, SOCIAL_PLATFORMS } from '@constants/pseudos'

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
    password: Yup.string().required('Password is required'),
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

export const cronjobSettingSchema = Yup.object().shape({
    job_source: Yup.mixed()
        .oneOf(Object.keys(JOB_SOURCES), 'Invalid job source type')
        .required('Please select job source'),
    type: Yup.string().oneOf(['time', 'interval'], 'Invalid type'),
    time: Yup.string().when('type', {
        is: type => type === 'time',
        then: () => Yup.string().required('Time is required'),
    }),
    interval: Yup.number()
        .positive()
        .when('type', {
            is: type => type === 'interval',
            then: () => Yup.number().positive().required('Interval is required'),
        })
        .when('interval_type', {
            is: interval_type => interval_type === 'minutes',
            then: () =>
                Yup.number()
                    .positive()
                    .required('Interval is required')
                    .min(25, 'Interval must be greater than or equal to 25 minutes'),
        }),
    interval_type: Yup.mixed()
        .oneOf(['minutes', 'hours', 'days'], 'Invalid interval type')
        .when('type', {
            is: type => type === 'interval',
            then: () =>
                Yup.mixed()
                    .oneOf(['minutes', 'hours', 'days'], 'Invalid interval type')
                    .required('Please select interval type'),
        }),
})

export const coverLetterSchema = Yup.object().shape({
    name: Yup.string().required('Applicant name is required'),
    company: Yup.string().required('Company name is required'),
    experience: Yup.string().required('Applicant experience is required'),
    job_des: Yup.string().required('Job description is required'),
})

export const manualJobSchema = Yup.object().shape({
    job_title: Yup.string().required('Job Title is required'),
    company_name: Yup.string().required('Company Name is required'),
    job_source: Yup.string().required('Job Source is required'),
    job_type: Yup.string().required('Job Type is required'),
    address: Yup.string().required('Location is required'),
    job_source_url: Yup.string().required('Job URL is required'),
    job_posted_date: Yup.string().required('Job Posted Date is required'),
    time: Yup.string().required('Time is required'),
    tech_keywords: Yup.string().required('Tech Stack is required'),
    job_description: Yup.string().required('Job Ddescription is required'),
})

export const jobSourceLinkSchema = Yup.object().shape({
    job_source: Yup.mixed()
        .oneOf(Object.keys(JOB_SOURCES), 'Invalid job source type')
        .required('Please select job source'),
})

export const pseudoSchema = Yup.object().shape({
    name: Yup.string().required('Pseudo name is required'),
})

export const createVerticalSchema = Yup.object().shape({
    name: Yup.string().required('Vertical name is required'),
    description: Yup.string().max(250, 'Description is too long'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
})

export const verticalBasicInfoSchema = Yup.object().shape({
    ...createVerticalSchema.fields,
    address: Yup.string().max(100, 'Address is too long'),
    summary: Yup.string().max(500, 'Summary is too long'),
    phone: Yup.string().matches(/^[0-9+()\-\s]*$/, 'Invalid phone number'),
    portfolio: Yup.string().url('Portfolio Website is not valid'),
})

export const skillSchema = Yup.object().shape({
    generic_skill_id: Yup.string().required('Please select Skill'),
    vertical_id: Yup.string().required('Vertical Id is missing'),
    level: Yup.number('Skill level must be an number')
        .required('Skill level is required')
        .max(5, 'Skill level is too high'),
})

export const experienceSchema = Yup.object().shape({
    company_name: Yup.string().required('Company name is required'),
    designation: Yup.string().required('Designation is required'),
    description: Yup.string().max(250, 'Description is too long'),
    start_date: Yup.date().max(today, 'Please choose future date'),
    end_date: Yup.date().min(Yup.ref('start_date'), "End date can't be before Start date"),
})

export const educationSchema = Yup.object().shape({
    institute: Yup.string().required('Institute name is required'),
    degree: Yup.string().required('Degree is required'),
    grade: Yup.string().required('Grade like A+ or marks like 876/1100 required is required'),
    start_date: Yup.date().max(today, 'Please choose future date'),
    end_date: Yup.date().min(Yup.ref('start_date'), "End date can't be before Start date"),
})

export const languageSchema = Yup.object().shape({
    name: Yup.string().required('Language name is required'),
    level: Yup.number('Language level must be an number')
        .required('Language level is required')
        .max(5, 'Language level is too high'),
})

export const linkSchema = Yup.object().shape({
    platform: Yup.mixed().oneOf(Object.keys(SOCIAL_PLATFORMS), 'Invalid platform').required('Please select platform'),
    url: Yup.string().url('Please enter a valid URL').required('URL is required'),
})

export const otherSectionSchema = Yup.object().shape({
    name: Yup.string().required('Section name is required'),
    value: Yup.string().max(1000, 'Section value is too long'),
})

export const verticalSchema = Yup.object().shape({
    team_id: Yup.string().required('Section name is required'),
})

export const verticalmemberSchema = Yup.object().shape({
    user_id: Yup.string().required('Section name is required'),
})

export const projectSchema = Yup.object().shape({
    name: Yup.string().required('Project name is required'),
    title: Yup.string().required('Title of yours is required'),
    description: Yup.string().max(1000, 'Project description is too long'),
    repo: Yup.string().url('Please enter a github/bitbucket/gitlab repository URL'),
})

export const genericSkillSchema = Yup.object().shape({
    name: Yup.string().required('Skill name is required'),
    type: Yup.mixed()
        .oneOf(Object.keys(GENERIC_SKILL_TYPES), 'Invalid skill type')
        .required('Please select skill type'),
})
