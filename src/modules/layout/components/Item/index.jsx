import React, { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { OpenSubMenuIcon } from '@icons'

const Item = ({ item, setSubMenu, show, subMenu }) => {
    const handleSubMenu = key => setSubMenu({ ...subMenu, [key]: !subMenu[key] })
    const handleHover = key => setSubMenu({ ...subMenu, [key]: true })
    const location = useLocation()

    return (
        <>
            <div
                className={`flex items-center justify-between text-[#003C40] border-[#048C8C] rounded ${
                    location.pathname === item.link ? 'border-2' : 'border-0'
                }  hover:text-[#003C40] border-solid hover:border-2 hover:border-solid hover:border-[#048C8C] cursor-pointer`}
                onClick={() => handleSubMenu(item.key)}
                onMouseEnter={() => handleHover(item.key)}
            >
                <Link key={item.label} to={item.link} className='flex items-center text-md p-4'>
                    {item.svg}
                    {show ? <span className='ml-3 hidden lg:block'>{item.label}</span> : ''}
                </Link>
                {show && item?.subItems && <span className='hidden lg:block mr-2'>{OpenSubMenuIcon}</span>}
            </div>
            {item?.subItems && (
                <div className='hidden lg:block'>
                    {subMenu[item.key] &&
                        item?.subItems.map(subItem => (
                            <Link
                                key={subItem.label}
                                to={subItem.link}
                                className={`flex items-center text-sm p-4 ml-2 border-[#048C8C] my-1 ${
                                    location.pathname === subItem.link ? 'border-2' : 'border-0'
                                } text-[#003C40] rounded hover:text-[#003C40] border-solid hover:border-2 hover:border-solid hover:border-[#048C8C] cursor-pointer`}
                            >
                                {subItem.svg}
                                {show ? <span className='ml-3 hidden lg:block'>{subItem.label}</span> : ''}
                            </Link>
                        ))}
                </div>
            )}
        </>
    )
}
export default memo(Item)
