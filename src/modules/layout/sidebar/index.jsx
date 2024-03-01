import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Item } from '@modules/layout/components'

import { menuItems } from '@constants/layout'
import { removeToken } from '@utils/helpers'

import { OpenSidebarIcon, LogoutIcon } from '@icons'
import logo from '@images/signin-logo.svg'
import smallLogo from '@images/signin-small-logo.svg'

const SideBar = ({ toggle, setToggle }) => {
    const navigate = useNavigate()
    const [subMenu, setSubMenu] = useState({ jobs: false, management: false })

    return (
        <aside
            className={`sm:flex hidden ${
                toggle ? 'w-auto xl:w-[15%] md:w-[25%]' : 'w-fit'
            } flex-col space-y-2 border-2 py-2 sm:px-2 my-2 ml-2  text-[#048C8C] bg-[#EDFFFB] rounded-lg`}
        >
            <div className={`p-2 flex justify-center md:justify-${toggle ? 'center' : 'between'}`}>
                <span className='hidden lg:block '>
                    {toggle ? (
                        <img src={logo} alt='' width='120' height='59' />
                    ) : (
                        <img src={smallLogo} alt='' width='25' height='25' />
                    )}
                </span>
                <span className='block lg:hidden'>
                    <img src={smallLogo} alt='' width='25' height='25' />
                </span>
            </div>
            <hr className='w-75 h-100 bg-[#048C8C] my-4 border-0 rounded' />
            {menuItems?.length > 0 &&
                menuItems?.map(item => (
                    <Item item={item} subMenu={subMenu} setSubMenu={setSubMenu} show={toggle} key={item.label} />
                ))}
            <button
                onClick={() => {
                    removeToken()
                    navigate(0)
                }}
                className='flex items-center text-sm p-4 text-[#003C40] rounded border-2 hover:text-[#003C40] border-solid border-[#EDFFFB] hover:border-2 hover:border-solid hover:border-[#048C8C] active:border-2 active:border-solid active:border-[#048C8C]'
            >
                {LogoutIcon}
                {toggle ? <span className='ml-3 hidden lg:block'>Logout</span> : ''}
            </button>
            <hr className='w-50 h-0.5 bg-[#048C8C] my-4 border-0 rounded' />
            <div className='h-100 flex flex-col justify-end items-center'>
                <span className='cursor-pointer p-2 flex mb-1' onClick={() => setToggle(!toggle)}>
                    {OpenSidebarIcon}
                    {toggle && <span className='hidden lg:flex ml-1'>Toggle Sidebar</span>}
                </span>
                {toggle && (
                    <button className='hidden lg:flex w-full p-2.5 bg-[#048C8C] rounded-xl self-end my-2'>
                        <p align='justify' className='text-white float-left text-xs'>
                            &copy; 2023 Octagon.inc <br />
                            Terms Of Service - Privacy Policy
                        </p>
                    </button>
                )}
            </div>
        </aside>
    )
}

export default memo(SideBar)
