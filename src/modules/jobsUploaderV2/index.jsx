import { React, useEffect, useRef, useState } from 'react'
import './index.css'
import { toast } from 'react-hot-toast'
import { Button } from '@/components'
import { baseURL } from '@utils/http'
import { UploadIcon } from '@icons'

const JobsUploaderV2 = () => {
    // drag state
    const upload_job_url = `${baseURL}api/job_portal/upload_data/`
    const [dragActive, setDragActive] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(true)
    const [fileUploadButton, setFileUploadButton] = useState(false)
    // ref
    const inputRef = useRef(null)
    // upload files
    const [uploadFiles, setUploadFiles] = useState([])
    // handle drag events
    function handleDrag(e) {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    useEffect(() => {
        console.log('Hello', uploadFiles)
    }, [uploadFiles])

    // triggers when file is dropped
    const handleDrop = e => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // handleFiles(e.dataTransfer.files);
            setUploadFiles([...e.dataTransfer.files])
            setButtonDisable(false)
        }
    }

    // triggers when file is selected with click
    const handleChange = e => {
        e.preventDefault()
        console.log(e.target.value)
        if (e.target.files && e.target.files[0]) {
            setUploadFiles([...e.target.files])
            setButtonDisable(false)
        }
    }

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click()
    }

    const uploadButtonHandle = async event => {
        event.preventDefault()
        const formData = new FormData()
        for (let i = 0; i < uploadFiles.length; i++) {
            formData.append(`file_upload`, uploadFiles[i])
        }
        const response = await fetch(upload_job_url, {
            method: 'POST',
            body: formData,
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token').slice(1, -1)}`,
            },
        })
        const json = await response.json()
        if (response.ok) {
            toast.success(json.detail)
        } else {
            setUploadFiles([])
            toast.error(json.detail)
        }
        setFileUploadButton(false)
        setUploadFiles([])
        return false
    }

    return (
        <div className='flex flex-col border shadow	text-[#006366] py-8'>
            <div className='flex flex-row mx-auto'>
                <div className='mr-1 my-12 '>
                    <button
                        disabled={buttonDisable}
                        className={`${
                            buttonDisable
                                ? 'text-[#66666d] bg-[#dddde0] text-sm'
                                : 'text-white bg-[#048C8C] hover:bg-[#048C6D]'
                        }  py-2 px-4 rounded h-10`}
                        type='submit'
                        onClick={e => {
                            setButtonDisable(true)
                            setFileUploadButton(true)
                            uploadButtonHandle(e)
                        }}
                    >
                        <span>Upload</span>
                    </button>
                </div>
                <div className='flex flex-col justify-center mx-auto border p-3 '>
                    <div>
                        <form id='form-file-upload' onDragEnter={handleDrag} onSubmit={e => e.preventDefault()}>
                            <input
                                accept='.xlsx, .xls, .ods'
                                required
                                ref={inputRef}
                                type='file'
                                id='input-file-upload'
                                multiple
                                onChange={handleChange}
                            />
                            <label
                                id='label-file-upload'
                                htmlFor='input-file-upload'
                                className={dragActive ? 'drag-active' : ''}
                            >
                                <div className='flex px-12 h-32 py-12 align-item-middle '>
                                    <button
                                        disabled={fileUploadButton}
                                        className='upload-button'
                                        onClick={() => {
                                            onButtonClick()
                                        }}
                                    >
                                        <div className='flex'>
                                            <span className='px-2'> {UploadIcon}</span>
                                            <span>drag,drop,select files?csv.xlsx.xls.ods </span>
                                        </div>
                                    </button>
                                </div>
                            </label>

                            {dragActive && (
                                <div
                                    id='drag-file-element'
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                />
                            )}
                        </form>
                    </div>
                    <div className='text-xs flex flex-col items-start p-3'>
                        {uploadFiles.map((item, i) => (
                            <div className='flex justify-between items-center w-full gap-5' key={i}>
                                <span className='py-2'>{item.name}</span>
                                <span className='py-2'>{UploadIcon}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobsUploaderV2
