import { React, useEffect, useRef, useState } from 'react'
import './index.css'
import { toast } from 'react-hot-toast'
import { Button } from '@/components'
import { baseURL } from '@utils/http'

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
        <div>
            <form id='form-file-upload' onDragEnter={handleDrag} onSubmit={e => e.preventDefault()}>
                <input accept=".xlsx, .xls, .ods" required ref={inputRef} type='file' id='input-file-upload' multiple onChange={handleChange} />
                <label id='label-file-upload' htmlFor='input-file-upload' className={dragActive ? 'drag-active' : ''}>
                    <div>
                        <button disabled={fileUploadButton} className='upload-button' onClick={()=>{onButtonClick()}}>
                            Upload a file
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
            <div className='justify-center'>
                {uploadFiles.map((item, i) => (
                    <div className='list-item' key={i}>
                        {item.name}
                    </div>
                ))}
            </div>
            <div className='flex justify-center'>
                <button
                    disabled = {buttonDisable}
                    className={`${
                        buttonDisable ? 'text-black bg-[#a1a1aa]' : 'text-white bg-[#048C8C] hover:bg-[#048C6D]'
                    }  py-2 px-4 rounded`}
                    type='submit'
                    onClick={e => {
                        setButtonDisable(true)
                        setFileUploadButton(true)
                        uploadButtonHandle(e)}}
                >
                    Upload Files
                </button>
            </div>
        </div>
    )
}

export default JobsUploaderV2
