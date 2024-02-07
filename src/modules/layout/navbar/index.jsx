import { memo } from 'react'
import { IoMdContact, IoIosSettings, IoIosNotifications, IoMdHome } from 'react-icons/io'

const Navbar = memo(() => (
    <header className='bg-white w-screen px-8 pt-9'>
        <nav className='relative flex flex-row-reverse justify-between'>
            <ul className='flex text-white space-x-5 justify-end'>
                <div className='relative'>
                    <li>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pb-2 pointer-events-none'>
                            <svg
                                aria-hidden='true'
                                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                />
                            </svg>
                        </div>
                        <form>
                            <input
                                type='search'
                                id='search'
                                className='block w-full p-4 pl-10 text-sm text-teal-800 border  border-teal-800 rounded-lg bg-gray-50 '
                                placeholder='Search Here'
                                required
                            />
                        </form>
                    </li>
                </div>
                <li className='mx-2 my-4 cursor-pointer text-teal-800'>
                    <a href='#'>
                        <IoMdContact fontSize='2em' />
                    </a>
                </li>
                <li className='mx-2 my-4 cursor-pointer text-teal-800'>
                    <a href='#'>
                        <IoIosSettings fontSize='2em' />
                    </a>
                </li>
                <li className='mx-2 my-4 cursor-pointer text-teal-800'>
                    <a href='#'>
                        <div className='relative'>
                            <IoIosNotifications fontSize='2em' />
                            <div className='absolute bottom-3 inline-flex items-center justify-center w-8 h-6 text-xs font-bold text-teal-800 border-2 rounded-full -top-1 -right-4 bg-teal-500 '>
                                20
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
            <ul className='justify-start text-sm text-teal-800'>
                <div className='flex space-x-2'>
                    <IoMdHome fontSize='1.2em' />
                    <span>&#47;</span>
                    <li>
                        <a href='#'>Pages</a>
                    </li>
                    <span>&#47;</span>
                    <li>
                        <a href='#'>Account</a>
                    </li>
                    <span>&#47;</span>
                    <li>
                        <a href='#'>Billing</a>
                    </li>
                </div>
                <div className='relative font-bold text-2xl leading-loose'>
                    <a href='#'>Billing</a>
                </div>
            </ul>
        </nav>
    </header>
))

export default Navbar
