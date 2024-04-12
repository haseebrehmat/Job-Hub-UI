import { memo, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Dialog = ({ children, content, show, title = 'Confirmation', setShow }) => {
    useEffect(() => {
        const dialogWrapper = document.createElement('div')
        document.body.appendChild(dialogWrapper)
        return () => {
            document.body.removeChild(dialogWrapper)
        }
    }, [])

    return (
        <>
            {children}
            {show &&
                ReactDOM.createPortal(
                    <div className='fixed z-20 inset-0 overflow-y-auto'>
                        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                            <div className='fixed inset-0 transition-opacity'>
                                <div
                                    className='absolute inset-0 backdrop-blur-[5px] bg-[rgba(0,0,0,0.3)] transition-[background-color] duration-[0.5s]'
                                    onClick={() => setShow(false)}
                                />
                            </div>
                            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' />
                            &#8203;
                            <div
                                className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full'
                                role='dialog'
                                aria-modal='true'
                                aria-labelledby='modal-headline'
                            >
                                <div>
                                    <div className='text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                        <h3 className='text-gray-900' id='modal-headline'>
                                            {title}
                                        </h3>
                                    </div>
                                </div>
                                <div className='mt-5 sm:mt-6'>
                                    <span className='flex w-full rounded-md shadow-sm gap-4 sm:w-auto'>{content}</span>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    )
}

export default memo(Dialog)
