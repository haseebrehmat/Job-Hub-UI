import { memo, useState } from 'react'
import toast from 'react-hot-toast'

import { Button, Input } from '@components'

import { loginUser } from '@modules/authentication/api'
import { RememberMe, TermsOfService } from '@modules/authentication/components'

import signinLogo from '@images/signin-logo.png'
import devsincLogo from '@images/devsinc-logo.png'
import { useNavigate } from 'react-router-dom'

const Login = memo(() => {
    const navigate = useNavigate()
    const [user, setUser] = useState({ email: '', password: '' })

    const handleSubmit = async e => {
        e.preventDefault()
        const response = await loginUser(user.email, user.password)
        if (response.status === 'error') {
            toast.error(response.message)
        } else {
            toast.success(response.message)
            navigate(0)
        }
    }

    const handleChange = e => setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))

    return (
        <div className='bg-[url(@images/signin-bg.png)] bg-no-repeat bg-cover bg-center'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <a className='flex items-center bg-[#EDFFFB] rounded-lg shadow-[0px_1px_5px_rgba(4,131,131,0.5)] px-12 py-2 -mb-12 z-[1]'>
                    <img className='w-42' src={signinLogo} alt='logo' />
                </a>
                <div className='w-full bg-white md:mt-0 sm:max-w-md xl:p-0 shadow-[0px_1px_8px_rgba(0,99,102,0.4)] rounded-xl'>
                    <div className='p-6 mt-10 space-y-4 md:space-y-6 sm:p-8'>
                        <form className='space-y-2 md:space-y-4' action='#' onSubmit={handleSubmit}>
                            <Input name='email' type='email' onChange={handleChange} value={user.email} ph='Email' />
                            <Input
                                name='password'
                                type='password'
                                onChange={handleChange}
                                value={user.password}
                                ph='Password'
                            />
                            <div className='flex flex-col md:items-center justify-between md:flex-row'>
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
        </div>
    )
})

export default Login
