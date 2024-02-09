import { Input } from '@components'
import { memo } from 'react'
import { IoMdContact, IoIosSettings, IoIosNotifications } from 'react-icons/io'

const Navbar = memo(({ toggle }) => (
    <header className='bg-white w-full px-8 pt-3'>
        <nav className='relative flex flex-row-reverse justify-between'>
            <ul className='flex text-white space-x-5 justify-end'>
                <div className='relative'>
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
                    {toggle ? (
                        <form className='hidden md:block'>
                            <Input name='Search' type='text' ph='Search Here' classes='pl-10 p-4' />
                        </form>
                    ) : (
                        ''
                    )}
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
        </nav>
    </header>
))

export default Navbar
