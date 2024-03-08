import './index.css'
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import ClipLoader from 'react-spinners/ClipLoader'
import toast from 'react-hot-toast'
import { baseURL } from '@utils/http'
import { can } from '@/utils/helpers'
import uploadJobs from './api'

const JobsUploader = () => {
    const fileTypes = ['csv', 'xlsx']
    const [files, setFiles] = useState([])
    const [spinnerFlag, setSpinnerFlag] = useState(false)
    const handleChange = upload_files => {
        setFiles(upload_files)
        console.log('hello')
        setSpinnerFlag(false)
    }
    const uploadFiles = async event => {
        event.preventDefault()

        setSpinnerFlag(true)

        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append(`file_upload`, files[i])
        }

        const { status, detail } = await uploadJobs(`${baseURL}api/job_portal/upload_data/`, formData)

        if (status === 'success') {
            toast.success(detail)
        } else {
            toast.error(detail)
        }

        setFiles([])
        setSpinnerFlag(false)
        return false
    }

    return (
        <div className='my-2 py-2'>
            <div className='row'>
                <div className='border shadow flex justify-center mx-3'>
                    {can('upload_csv') ? (
                        <div className='p-4'>
                            <form onSubmit={uploadFiles}>
                                <h4 className='text-center text-cyan-700'>Upload multiples files</h4>
                                <div className='m-2'>
                                    <FileUploader
                                        handleChange={handleChange}
                                        label='Upload or drop a file right here .'
                                        name='file'
                                        hoverTitle='Drop Files Here'
                                        multiple
                                        disabled={spinnerFlag}
                                        required
                                        classes='border-2'
                                        types={fileTypes}
                                    />
                                </div>

                                {spinnerFlag === true && (
                                    <div className='flex justify-center my-2'>
                                        <h5 className='mr-2 text-cyan-700'>Processing... </h5>
                                        <ClipLoader color='#048c8c' size={30} />
                                    </div>
                                )}

                                <p> Files Counts: {files.length}</p>

                                {spinnerFlag === false && files.length !== 0 && (
                                    <div className='flex justify-center'>
                                        <input
                                            type='submit'
                                            value='Upload Files'
                                            className='-fit text-[#048C8C] border border-cyan-600 font-medium rounded-lg text-sm px-2 py-2 text-center flex items-center justify-center'
                                        />
                                    </div>
                                )}
                            </form>
                        </div>
                    ) : (
                        <p className='py-3'>You cannot upload job.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default JobsUploader
