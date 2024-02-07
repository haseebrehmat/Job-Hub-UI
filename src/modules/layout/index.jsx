import { memo } from 'react'
import SideBar from '@modules/layout/sidebar'
import Navbar from '@modules/layout/navbar'

const layout = memo(({ children }) => (
    <main className='min-h-screen w-fit'>
        <header className='flex w-full items-center justify-between bg-[#EDFFFB]'>
            <div className='flex items-center space-x-2'>
                <button type='button' className='text-3xl'>
                    <i className='bx bx-menu' />
                </button>
            </div>
        </header>
        <div className='flex p-3'>
            <Navbar />
            <SideBar />
            <div className='w-full pl-3'>{children}</div>
        </div>
    </main>
))
export default layout
