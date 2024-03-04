import './index.css'
import { useState, memo } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import ClipLoader from 'react-spinners/ClipLoader'
import toast from 'react-hot-toast'

import { baseURL } from '@utils/http'

const JobsUploader = memo(() => {
    const fileTypes = ['csv', 'xlsx']
    const [files, setFiles] = useState(null)
    const [disableBtn, setDisableBtn] = useState(true)
    const [spinnerFlag, setSpinnerFlag] = useState(false)
    const upload_job_url = `${baseURL}api/job_portal/upload_data/`

    const handleChange = upload_files => {
        setDisableBtn(false)
        setFiles(upload_files)
        setSpinnerFlag(false)
    }

    const buttonColor = () => (files && spinnerFlag === false ? 'blue-500' : 'gray-500')

    const uploadFiles = event => {
        event.preventDefault()
        setDisableBtn(true)
        setSpinnerFlag(true)
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append(`file_upload`, files[i])
        }

        fetch(upload_job_url, {
            method: 'POST',
            body: formData,
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token').slice(1, -1)}`,
            },
        })
            .then(resp => {
                if (!resp.ok) {
                    throw Error(resp)
                }
                return resp.json()
            })
            .then(obj => {
                setDisableBtn(true)
                setSpinnerFlag(false)
                setFiles(null)
                toast.success('Files uploaded successfully!')
            })
            .catch(error => {
                setDisableBtn(true)
                setSpinnerFlag(false)
                setFiles(null)
                toast.error('Invalid files format!')
            })
        return false
    }

    return (
        <div className='my-2'>
            <h3 className='text-center py-2 pl-4 text-[#006366] font-bold text-lg'>Jobs Uploader</h3>
            <div className='row'>
                <div className='border shadow flex justify-center'>
                    <div className='p-4'>
                        <form onSubmit={uploadFiles}>
                            <h4 className='text-center'>Upload multiples files</h4>
                            <div className='m-2'>
                                <FileUploader
                                    handleChange={handleChange}
                                    label='Upload or drop a file right here .'
                                    name='file'
                                    hoverTitle='Drop Files Here'
                                    multiple={true}
                                    types={fileTypes}
                                />
                            </div>

                            {spinnerFlag === true && (
                                <div className='flex justify-center my-2'>
                                    <h5 className='mr-2'>Processing... </h5>
                                    <ClipLoader color='black' size={30} />
                                </div>
                            )}
                            <div className='flex justify-center'>
                                <input
                                    type='submit'
                                    value='Upload Files'
                                    className={`px-4 py-2 rounded text-white bg-${buttonColor()}`}
                                    disabled={disableBtn}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default JobsUploader
