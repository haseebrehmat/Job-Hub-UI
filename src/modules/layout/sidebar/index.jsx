import { menuItems } from '@constants/layout'

import { NavigationIcon } from '@icons'
import { OctagonLogo } from '@svgs'

const SideBar = ({ toggle, setToggle }) => (
    <aside
        className={`sm:flex hidden ${
            toggle ? 'w-auto lg:w-[15%]' : 'w-fit'
        } flex-col space-y-2 border-2 py-2 sm:p-2 my-2 ml-2 text-[#048C8C] bg-[#EDFFFB] rounded-lg`}
    >
        <div className={`p-2 flex justify-center md:justify-${toggle ? 'between' : 'center'}`}>
            {toggle ? (
                <span className='hidden lg:block'>
                    <OctagonLogo />
                </span>
            ) : (
                ''
            )}
            <span className='cursor-pointer' onClick={() => setToggle(!toggle)}>
                {NavigationIcon}
            </span>
        </div>
        <hr className='w-50 h-0.5 bg-[#048C8C] my-4 border-0 rounded' />
        {menuItems?.length > 0 &&
            menuItems?.map(item => (
                <a
                    key={item.label}
                    href={item.link}
                    className='flex items-center text-sm p-4 text-[#003C40] rounded dark:text-white border-2 hover:text-[#003C40] border-solid border-[#EDFFFB] hover:border-2 hover:border-solid hover:border-[#048C8C] active:border-2 active:border-solid active:border-[#048C8C]'
                >
                    {item.svg}
                    {toggle ? <span className='ml-3 hidden lg:block'>{item.label}</span> : ''}
                </a>
            ))}
        <hr className='w-50 h-0.5 bg-[#048C8C] my-4 border-0 rounded' />
    </aside>
)

export default SideBar
