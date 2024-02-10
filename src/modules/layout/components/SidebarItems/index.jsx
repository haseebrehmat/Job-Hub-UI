import { memo } from 'react'
import { Link } from 'react-router-dom'
import { menuItems } from '@constants/layout'

const SidebarItems = memo(
    ({ toggle = true }) =>
        menuItems?.length > 0 &&
        menuItems?.map(item => (
            <Link
                key={item.label}
                to={item.link}
                className='flex items-center text-sm p-4 text-[#003C40] rounded border-2 hover:text-[#003C40] border-solid border-[#EDFFFB] hover:border-2 hover:border-solid hover:border-[#048C8C] active:border-2 active:border-solid active:border-[#048C8C]'
            >
                {item.svg}
                {toggle ? <span className='ml-3'>{item.label}</span> : ''}
            </Link>
        ))
)

export default SidebarItems
