import { useEffect, useState } from 'react'

import { menuItems } from '@constants/menuItems'

import { NavigationIcon } from '@icons'
import { OctagonLogo } from '@svgs'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
        width,
        height,
    }
}

const SideBar = () => {
    const [toggle, setToggle] = useState(true)
    const [dimensions, setDimensions] = useState(getWindowDimensions())
    // const { height, width } = useWindowDimensions()
    useEffect(() => {
        setDimensions(getWindowDimensions())
    }, [])
    return (
        <aside
            className={`flex w-${
                toggle && dimensions.width > 900 ? '72' : 'auto'
            } min-h-[97vh] flex-col space-y-2 border-2 p-2 text-[#048C8C] bg-[#EDFFFB] overflow-auto rounded-lg`}
        >
            {toggle && dimensions.width > 900 ? (
                <div className='p-2 flex justify-between'>
                    <OctagonLogo />
                    <span className='cursor-pointer' onClick={() => setToggle(!toggle)}>
                        {NavigationIcon}
                    </span>
                </div>
            ) : (
                <div className='p-2 flex justify-center'>
                    <span className='cursor-pointer' onClick={() => setToggle(!toggle)}>
                        {NavigationIcon}
                    </span>
                </div>
            )}
            <hr className='w-50 h-0.5 bg-[#048C8C] my-4 border-0 rounded dark:bg-gray-700' />
            {menuItems.length > 0 &&
                menuItems.map(item => (
                    <a
                        key={item.label}
                        href={item.link}
                        className='flex items-center text-sm p-4 text-[#003C40] rounded dark:text-white border-2 hover:text-[#003C40] border-solid border-[#EDFFFB] hover:border-2 hover:border-solid hover:border-[#048C8C] active:border-2 active:border-solid active:border-[#048C8C]'
                    >
                        {item.svg}
                        {toggle && dimensions.width > 900 ? <span className='ml-3'>{item.label}</span> : ''}
                    </a>
                ))}
            <hr className='w-50 h-0.5 bg-[#048C8C] my-4 border-0 rounded dark:bg-gray-700' />
        </aside>
    )
}

export default SideBar
