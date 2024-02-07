import { memo } from 'react'

const layout = memo(({ children }) => (
    <main className='min-h-screen w-full'>
        <header className='flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2'>
            <div className='flex items-center space-x-2'>
                <button type='button' className='text-3xl'>
                    <i className='bx bx-menu' />
                </button>
                <div>Logo</div>
            </div>
        </header>
        <div className='flex'>
            <aside
                className='flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2'
                style={{ height: '90.5vh' }}
                x-show='asideOpen'
            >
                <a
                    href='#'
                    className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600'
                >
                    <span className='text-2xl'>
                        <i className='bx bx-home' />
                    </span>
                    <span>Dashboard</span>
                </a>
                <a
                    href='#'
                    className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600'
                >
                    <span className='text-2xl'>
                        <i className='bx bx-cart' />
                    </span>
                    <span>Cart</span>
                </a>
                <a
                    href='#'
                    className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600'
                >
                    <span className='text-2xl'>
                        <i className='bx bx-shopping-bag' />
                    </span>
                    <span>Shopping</span>
                </a>
                <a
                    href='#'
                    className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600'
                >
                    <span className='text-2xl'>
                        <i className='bx bx-heart' />
                    </span>
                    <span>My Favourite</span>
                </a>
                <a
                    href='#'
                    className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600'
                >
                    <span className='text-2xl'>
                        <i className='bx bx-user' />
                    </span>
                    <span>Profile</span>
                </a>
            </aside>
            <div className='w-full p-4'>{children}</div>
        </div>
    </main>
))
export default layout
