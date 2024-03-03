import { useState } from 'react'
import { Profile } from '@components'
import { NavBellIcon, NavContactIcon, NavSettingIcon, OpenSidebarIcon } from '@icons'

const Navbar = ({ setShow, title = 'Octagon' }) => {
    const [profile, setProfile] = useState(false)

    return (
        <header className='bg-white w-full px-8 pt-3'>
            <nav className='relative flex flex-row justify-between'>
                <p className='text-[#006366] not-italic font-bold text-5xl leading-[58px] font-gruppo'>{title}</p>
                <ul className='flex text-white space-x-5 justify-end'>
                    <li className='block mx-2 my-2 cursor-pointer text-teal-800 sm:hidden md:hidden'>
                        <a href='#' onClick={() => setShow(true)}>
                            {OpenSidebarIcon}
                        </a>
                    </li>
                    <li className=' mx-2 my-2 cursor-pointer text-teal-800'>
                        <a type='button' onClick={() => setProfile(!profile)}>
                            {NavContactIcon}
                        </a>
                        {profile && <Profile />}
                    </li>
                    <li className='mx-2 my-2 cursor-pointer text-teal-800'>
                        <a href='#'>{NavSettingIcon}</a>
                    </li>
                    <li className='mx-2 my-2 cursor-pointer text-teal-800'>
                        <a href='#'>
                            <div className='relative'>
                                {NavBellIcon}
                                <div className='absolute inline-flex items-center justify-center w-8 h-6 text-xs font-bold text-white border-2 rounded-full -top-3 -right-5 bg-teal-500'>
                                    20
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Navbar
