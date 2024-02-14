import { memo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from '@components'

import { loginUser } from '@modules/authentication/api'
import { RememberMe, TermsOfService } from '@modules/authentication/components'

import { loginSchema } from '@utils/schemas'

import signinLogo from '@images/signin-logo.webp'
import devsincLogo from '@images/devsinc-logo.png'
import { ValidateTrueIcon, ValidateFalseIcon, SeePassIcon, HidePassIcon } from '@icons'

const Login = memo(() => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const { values, errors, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: async formValues => {
            const { status, message } = await loginUser(formValues.email, formValues.password)
            if (status === 'error') {
                toast.error(message || 'Something gone wrong')
            } else {
                toast.success(message)
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            }
        },
    })

    const togglePassword = () => setShowPassword(!showPassword)

    return (
        <div className='bg-[url(@images/signin-bg.webp)] bg-no-repeat bg-cover bg-center'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
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
                                    {errors.email ? ValidateFalseIcon : ValidateTrueIcon}
                                </div>
                            </div>
                            {errors.email && <small className='ml-2 text-sm text-red-400'>{errors.email}</small>}
                            <div className='relative'>
                                <Input
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleChange}
                                    value={values.password}
                                    ph='Password'
                                    onBlur={handleBlur}
                                    label='Password'
                                />
                                <div className='absolute inset-y-0 right-1 flex items-center pl-3 p-2'>
                                    <span className='mr-1 cursor-pointer' onClick={togglePassword}>
                                        {showPassword ? HidePassIcon : SeePassIcon}
                                    </span>
                                    {errors.password ? ValidateFalseIcon : ValidateTrueIcon}
                                </div>
                            </div>
                            {errors.password && <small className='ml-2 text-sm text-red-400'>{errors.password}</small>}
                            <div className='flex justify-between'>
                                <RememberMe />
                                <a className='text-sm text-[#048C8C] hover:underline'>Forgot password?</a>
                            </div>
                            <Button label='SIGN IN' type='submit' />
                            <TermsOfService />
                        </form>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 right-0 p-5'>
                <img src={devsincLogo} alt='logo' />
            </div>
            <Toaster />
        </div>
    )
})

export default Login
