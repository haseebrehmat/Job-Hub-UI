import { memo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from '@components'

import { sendResetPasswordLink } from '@modules/authentication/api'

import { forgotPasswordSchema } from '@utils/schemas'

import signinLogo from '@images/signin-logo.webp'
import devsincLogo from '@images/poweredBy.svg'
import { ValidateTrueIcon, ValidateFalseIcon } from '@icons'

const ForgetPassword = memo(() => {
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(false)

    const { values, errors, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: { email: '' },
        validationSchema: forgotPasswordSchema,
        onSubmit: async formValues => {
            setDisabled(true)
            const { status, message } = await sendResetPasswordLink(formValues.email)
            if (status === 'error') toast.error(message || 'Something gone wrong')
            else {
                toast.success(message)
                setTimeout(() => navigate('/login'), 3000)
            }
            setDisabled(false)
        },
    })

    const handleClick = () => navigate('/login')

    return (
        <div className='bg-[url(@images/signin-bg.webp)] bg-no-repeat bg-cover bg-center'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
                <a className='flex items-center bg-[#EDFFFB] rounded-lg shadow-[0px_1px_5px_rgba(4,131,131,0.5)] px-12 py-2 -mb-12 z-[1]'>
                    <img className='w-42' src={signinLogo} alt='logo' />
                </a>
                <div className='w-full bg-white md:mt-0 sm:max-w-md xl:p-0 shadow-[0px_1px_8px_rgba(0,99,102,0.4)] rounded-xl'>
                    <div className='p-6 mt-10 space-y-4 md:space-y-6 sm:p-8'>
                        <form className='space-y-2 md:space-y-4' onSubmit={handleSubmit}>
                            <div className='relative'>
                                <Input
                                    name='email'
                                    type='email'
                                    onChange={handleChange}
                                    value={values.email}
                                    ph='Email'
                                    onBlur={handleBlur}
                                    label='Email'
                                />
                                <div className='absolute inset-y-0 right-1 flex items-center pl-3 p-2 pointer-events-none'>
                                    {errors.email ? ValidateFalseIcon : values.email.length > 0 && ValidateTrueIcon}
                                </div>
                            </div>
                            {errors.email && <small className='ml-2 text-sm text-red-400'>{errors.email}</small>}
                            <Button label='Send Reset Password Link' type='submit' disabled={disabled} />
                            <Button label='Back to login' onClick={handleClick} disabled={disabled} />
                        </form>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 right-10 p-5'>
                <a href='https://devsinc.com/' target='_blank' rel='noreferrer'>
                    <img src={devsincLogo} alt='logo' />
                </a>
            </div>
            <Toaster />
        </div>
    )
})

export default ForgetPassword
