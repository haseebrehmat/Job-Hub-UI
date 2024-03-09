import { useState } from 'react'
import { dilogColor } from '@utils/colors'
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

const CustomDilog = (title, description, successTrigger, type) => {
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    const successModal = () => {
        successTrigger()
        closeModal()
    }

    return {
        CustomModal: (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Example Modal'>
                <div className='flex items-start justify-between rounded-t dark:border-gray-600'>
                    <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{title}</h3>
                </div>

                <div className='p-2 space-y-5'>
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
                        className={`block rounded px-2 py-1 my-3 bg-[${dilogColor[type]}] text-white`}
                        onClick={successModal}
                    >
                        {type === 'success' ? 'Ok' : 'delete'}
                    </button>
                </div>
            </Modal>
        ),
        openModal,
    }
}

export default CustomDilog
