import { CloseIcon, DashboardIcon, LogoutIcon, NavigationIcon, OctagonLogo } from '@/assets/svg-icons'
import React, { useState } from 'react'

const SideBar = () => {
    const menuItems = [
        {
            label: 'Dashboard',
            link: '#',
            svg: <DashboardIcon />,
        },
        {
            label: 'Report',
            link: '#',
            svg: <DashboardIcon />,
        },
        {
            label: 'Users',
            link: '#',
            svg: <DashboardIcon />,
        },
        {
            label: 'Roles',
            link: '#',
            svg: <DashboardIcon />,
        },
        {
            label: 'New User',
            link: '#',
            svg: <DashboardIcon />,
        },
        {
            label: 'Settings',
            link: '#',
            svg: <DashboardIcon />,
        },
        {
            label: 'Notification',
            link: '#',
            svg: <DashboardIcon />,
        },
        {
            label: 'Security',
            link: '#',
            svg: <DashboardIcon />,
        },
        {
            label: 'Logout',
            link: '#',
            svg: <LogoutIcon />,
        },
    ]
    const [toggle, setToggle] = useState(false)

    return (
        <div className='m-5 rounded-lg'>
            <button
                className='fixed top-0 left-0 w-20px p-4 overflow-y-auto transition-transform bg-gray-2'
                onClick={() => setToggle(!toggle)}
            >
                <NavigationIcon />
            </button>
            {toggle ? (
                <div
                    id='drawer-navigation'
                    className='fixed top-0 left-0 w-64 text-[#048C8C] h-screen p-4 overflow-y-auto transition-transform bg-[#EDFFFB] dark:bg-gray-800'
                >
                    <h5
                        id='drawer-navigation-label'
                        className='text-base font-semibold text-gray-500 uppercase dark:text-gray-400'
                    >
                        <OctagonLogo />
                    </h5>
                    <hr className='w-50 h-0.5 bg-[#048C8C] my-4 border-0 rounded dark:bg-gray-700' />
                    <button
                        type='button'
                        onClick={() => setToggle(!toggle)}
                        className='bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:text-white'
                    >
                        <CloseIcon />
                        <span className='sr-only'>Close menu</span>
                    </button>
                    <div className='py-4 overflow-y-auto'>
                        <ul className='space-y-2'>
                            {menuItems.length > 0 &&
                                menuItems.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.link}
                                            className='flex items-center text-sm p-4 text-[#003C40] rounded dark:text-white border-2 hover:text-[#003C40] border-solid border-[#EDFFFB] hover:border-2 hover:border-solid hover:border-[#048C8C] active:border-2 active:border-solid active:border-[#048C8C]'
                                        >
                                            {item.svg}
                                            <span className='ml-3'>{item.label}</span>
                                        </a>
                                    </li>
                                ))}
                            <hr className='w-50 h-0.5 bg-[#048C8C] my-4 border-0 rounded dark:bg-gray-700' />
                        </ul>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default SideBar
