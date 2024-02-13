import { memo } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from '@components'

import { loginUser } from '@modules/authentication/api'
import { RememberMe, TermsOfService } from '@modules/authentication/components'

import { loginSchema } from '@utils/schemas'

import signinLogo from '@images/signin-logo.png'
import devsincLogo from '@images/devsinc-logo.png'

const Login = memo(() => {
    const navigate = useNavigate()

    const { values, errors, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: async formValues => {
            console.log(formValues)
            const { status, message } = await loginUser(formValues.email, formValues.password)
            if (status === 'error') {
                toast.error(message)
            } else {
                toast.success(message)
                navigate(0)
            }
        },
    })

    return (
        <div className='bg-[url(@images/signin-bg.webp)] bg-no-repeat bg-cover bg-center'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <a className='flex items-center bg-[#EDFFFB] rounded-lg shadow-[0px_1px_5px_rgba(4,131,131,0.5)] px-12 py-2 -mb-12 z-[1]'>
                    <img className='w-42' src={signinLogo} alt='logo' />
                </a>
                <div className='w-full bg-white md:mt-0 sm:max-w-md xl:p-0 shadow-[0px_1px_8px_rgba(0,99,102,0.4)] rounded-xl'>
                    <div className='p-6 mt-10 space-y-4 md:space-y-6 sm:p-8'>
                        <form className='space-y-2 md:space-y-4' action='#' onSubmit={handleSubmit}>
                            <Input
                                name='email'
                                type='email'
                                onChange={handleChange}
                                value={values.email}
                                ph='Email'
                                onBlur={handleBlur}
                            />
                            {errors.email && <small className='ml-2 text-sm text-red-500'>{errors.email}</small>}
                            <Input
                                name='password'
                                type='password'
                                onChange={handleChange}
                                value={values.password}
                                ph='Password'
                                onBlur={handleBlur}
                            />
                            {errors.password && <small className='ml-2 text-sm text-red-500'>{errors.password}</small>}
                            <div className='flex flex-col justify-between sm:flex-row'>
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
