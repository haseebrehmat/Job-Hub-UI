import { memo, useState } from 'react'
import SideBar from '@modules/layout/sidebar'
import Navbar from '@modules/layout/navbar'

const layout = memo(({ children }) => {
    const [toggle, setToggle] = useState(true)

    return (
        <main className='flex h-screen'>
            <SideBar toggle={toggle} setToggle={setToggle} />
            <div className='w-[85%] flex-1'>
                <div className='flex flex-col space-y-1 h-screen'>
                    <div className='h-1/6'>
                        <Navbar toggle={toggle} setToggle={setToggle} />
                    </div>
                    <div className='h-5/6 p-2'>{children}</div>
                </div>
            </div>
        </main>
    )
})

export default layout
