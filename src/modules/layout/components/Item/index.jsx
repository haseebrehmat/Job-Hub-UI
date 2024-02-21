import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { OpenSubMenuIcon } from '@icons'

const Item = ({ item, setSubMenu, show, subMenu }) => {
    const handleSubMenu = key => setSubMenu({ ...subMenu, [key]: !subMenu[key] })

    return (
        <>
            <div className='flex items-center justify-between text-sm text-[#003C40] rounded border-2 hover:text-[#003C40] border-solid border-[#EDFFFB] hover:border-2 hover:border-solid hover:border-[#048C8C] active:border-2 active:border-solid active:border-[#048C8C]'>
                <Link key={item.label} to={item.link} className='flex items-center text-sm p-4'>
                    {item.svg}
                    {show ? <span className='ml-3 hidden lg:block'>{item.label}</span> : ''}
                </Link>
                {show && item?.subItems && (
                    <span className='hidden lg:block mr-2' onClick={() => handleSubMenu(item.key)}>
                        {OpenSubMenuIcon}
                    </span>
                )}
            </div>
            {item?.subItems && (
                <div className='hidden lg:block'>
                    {subMenu[item.key] &&
                        item.subItems.map(subItem => (
                            <Link
                                key={subItem.label}
                                to={subItem.link}
                                className='flex items-center text-sm p-4 ml-3.5 text-[#003C40] rounded border-2 hover:text-[#003C40] border-solid border-[#EDFFFB] hover:border-2 hover:border-solid hover:border-[#048C8C] active:border-2 active:border-solid active:border-[#048C8C]'
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
