import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Input } from '@components'

import { NavbarSearchIcon, NavBellIcon, NavContactIcon, NavSettingIcon, OpenSidebarIcon } from '@icons'

const Navbar = memo(({ setShow }) => (
    <header className='bg-white w-full px-8 pt-3'>
        <nav className='relative flex flex-row justify-between'>
            <Link to='applied-jobs' className='text-[#006366] font-medium text-2xl'>
                Welcome to Octagon
            </Link>
            <ul className='flex text-white space-x-5 justify-end'>
                <div className='relative hidden md:block'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 p-2 pointer-events-none'>
                        {NavbarSearchIcon}
                    </div>
                    <form>
                        <Input name='Search' type='text' ph='Search Here' classes='pl-10 p-2' />
                    </form>
                </div>
                <li className='block mx-2 my-2 cursor-pointer text-teal-800 sm:hidden md:hidden'>
                    <a href='#' onClick={() => setShow(true)}>
                        {OpenSidebarIcon}
                    </a>
                </li>
                <li className='mx-2 my-2 cursor-pointer text-teal-800'>
                    <a href='#'>{NavContactIcon}</a>
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
))

export default Navbar
