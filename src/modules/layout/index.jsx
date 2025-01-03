import { memo, useState } from 'react'

import SideBar from '@modules/layout/sidebar'
import Navbar from '@modules/layout/navbar'
import Overlay from '@modules/layout/overlay'

const layout = memo(({ children, title }) => {
    const [toggle, setToggle] = useState(true)
    const [show, setShow] = useState(false)

    return (
        <main className='flex h-100'>
            <SideBar toggle={toggle} setToggle={setToggle} />
            <Overlay show={show} setShow={setShow} />
            <div className='w-[85%] flex-1'>
                <div className='flex flex-col space-y-1 h-screen'>
                    <div className='h-100'>
                        <Navbar setShow={setShow} title={title} />
                    </div>
                    <div className='max-h-100 overflow-auto p-3'>{children}</div>
                </div>
            </div>
        </main>
    )
})

export default layout
