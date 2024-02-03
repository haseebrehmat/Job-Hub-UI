import { memo, useState } from 'react'

import Button from '@components/Button'

import { login } from '@modules/authentication/api'
import { TermsOfService } from '@modules/authentication/components'

import signinLogo from '@images/signin-logo.png'
import devsincLogo from '@images/devsinc-logo.png'

const loginIn = memo(() => {
    const [user, setUser] = useState({ email: '', password: '' })

    const handleSubmit = async e => {
        e.preventDefault()
        const response = await login(user.email, user.password)
        if (response.status === 'error') {
            alert(response.message)
        } else {
            console.log('success => ', response.message)
        }
    }

    const handleChange = e => setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))

    return (
        <div className='bg-[url(@images/signin-bg.png)] bg-no-repeat bg-cover bg-center'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <a className='flex items-center bg-[#EDFFFB] rounded-lg shadow-[0px_1px_5px_rgba(4,131,131,0.5)] px-12 py-2 -mb-12 z-[1]'>
                    <img className='w-42' src={signinLogo} alt='logo' />
                </a>
                <div className='w-full bg-white dark:border md:mt-0 sm:max-w-md xl:p-0 shadow-[0px_1px_8px_rgba(0,99,102,0.4)] rounded-xl'>
                    <div className='p-6 mt-10 space-y-4 md:space-y-6 sm:p-8'>
                        <form className='space-y-2 md:space-y-4' action='#' onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='bg-gray-50 border border-cyan-600 text-gray-900 sm:text-sm rounded-lg focus:ring-[#048C8C] focus:border-[#048C8C] block w-full p-2.5'
                                    placeholder='Email'
                                    required=''
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    className='bg-gray-50 border border-cyan-600 text-gray-900 sm:text-sm rounded-lg focus:ring-[#048C8C] focus:border-[#048C8C] block w-full p-2.5'
                                    required=''
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-start'>
                                    <label
                                        htmlFor='Toggle2'
                                        className='inline-flex items-center space-x-4 cursor-pointer text-[#048C8C]'
                                    >
                                        <span className='relative'>
                                            <input id='Toggle2' type='checkbox' className='hidden peer' />
                                            <div className='w-10 h-4 rounded-full shadow bg-[#048C8C] peer-checked:bg-[#048C8C]' />
                                            <div className='absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto bg-white' />
                                        </span>
                                        <span className='text-sm'>Remember me</span>
                                    </label>
                                </div>
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

export default loginIn
