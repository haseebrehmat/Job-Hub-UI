import { useState } from 'react'

import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    },
}

const CustomDilog = (title, description, successTrigger) => {
    let subtitle
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
        console.log('open modal')
    }

    const afterOpenModal = () => {
        // subtitle.style.color = '#f00'
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const successModal = () => {
        successTrigger()
        closeModal()
    }
    // {/* <button onClick={openModal}>Open Modal</button> */}
    // {deleteButton}

    return {
        CustomModal: (
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Example Modal'
            >
                <div className='flex items-start justify-between rounded-t dark:border-gray-600'>
                    <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{title}</h3>
                </div>

                <div className='p-2 space-y-5'>
                    {/* Are you want to delete the product? */}
                    <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>{description}</p>
                </div>

                <div className='flex justify-end items-center space-x-2 border-gray-200 rounded-b dark:border-gray-600'>
                    <button
                        onClick={closeModal}
                        type='button'
                        className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
                    >
                        Cancel
                    </button>

                    <button
                        onClick={successModal}
                        type='button'
                        className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        ),
        openModal,
    }
}

export default CustomDilog
