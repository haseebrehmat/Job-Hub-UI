import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Profile, Tooltip } from '@components'

import { removeToken } from '@utils/helpers'

import { NavContactIcon, NavSettingIcon, OpenSidebarIcon, SignOutIcon } from '@icons'

const Navbar = ({ setShow, title = 'Octagon' }) => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState(false)

    const handleLogout = () => {
        removeToken()
        navigate(0)
    }

    return (
        <header className='bg-white w-full px-8 pt-3'>
            <nav className='relative flex flex-row justify-between'>
                <p className='text-[#006366] not-italic font-bold text-5xl leading-[58px] font-gruppo py-3'>{title}</p>
                <ul className='flex text-white space-x-5 justify-end'>
                    <li className='block mx-2 my-2 cursor-pointer text-teal-800 sm:hidden md:hidden'>
                        <a href='#' onClick={() => setShow(true)}>
                            {OpenSidebarIcon}
                        </a>
                    </li>
                    <li className=' mx-2 my-2 cursor-pointer text-teal-800'>
                        <a type='button' onClick={() => setProfile(!profile)} onMouseEnter={() => setProfile(true)}>
                            {NavContactIcon}
                        </a>
                        {profile && <Profile />}
                    </li>
                    <li className='mx-2 my-2 cursor-pointer text-teal-800'>
                        <Tooltip text='Edit Profile' down>
                            <Link to='/profile'>{NavSettingIcon}</Link>
                        </Tooltip>
                    </li>
                    <li className='mx-2 my-2 cursor-pointer text-teal-800'>
                        <Tooltip text='Logout' down>
                            <a type='button' onClick={handleLogout}>
                                {SignOutIcon}
                            </a>
                        </Tooltip>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Navbar
