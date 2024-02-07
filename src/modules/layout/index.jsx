import { memo } from 'react'
import SideBar from './sidebar'

const layout = memo(({ children }) => (
    <main className='min-h-screen w-full'>
        <header className='flex w-full items-center justify-between bg-[#EDFFFB]'>
            <div className='flex items-center space-x-2'>
                <button type='button' className='text-3xl'>
                    <i className='bx bx-menu' />
                </button>
            </div>
        </header>
        <div className='flex p-5'>
            <SideBar />
            <div className='w-full p-4'>{children}</div>
        </div>
    </main>
))
export default layout
