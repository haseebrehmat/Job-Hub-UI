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
                    <div className='h-fit'>
                        <Navbar />
                    </div>
                    <div className='h-max p-3'>{children}</div>
                </div>
            </div>
        </main>
    )
})

export default layout
