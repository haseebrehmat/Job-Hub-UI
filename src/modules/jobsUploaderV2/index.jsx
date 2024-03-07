import { React, useEffect, useRef, useState } from 'react'
import './index.css'
import { toast } from 'react-hot-toast'
import { Button } from '@/components'
import { baseURL } from '@utils/http'

const JobsUploaderV2 = () => {
    // drag state
    const upload_job_url = `${baseURL}api/job_portal/upload_data/`
    const [dragActive, setDragActive] = useState(false)
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
            setUploadFiles(e.dataTransfer.files)
        }
    }

    // triggers when file is selected with click
    const handleChange = e => {
        e.preventDefault()
        console.log(e.target.value)
        if (e.target.files && e.target.files[0]) {
            setUploadFiles(e.target.files)
            // handleFiles(e.target.files);
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

        return false
    }

    return (
        <div>
            <form id='form-file-upload' onDragEnter={handleDrag} onSubmit={e => e.preventDefault()}>
                <input ref={inputRef} type='file' id='input-file-upload' multiple onChange={handleChange} />
                <label id='label-file-upload' htmlFor='input-file-upload' className={dragActive ? 'drag-active' : ''}>
                    <div>
                        <button className='upload-button' onClick={onButtonClick}>
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
            <div className='flex justify-center'>
                {Array.from(uploadFiles).forEach(file => (
                    <div className='py-2' id={file.name}> hello {file.name} </div>
                ))}
            </div>
            <div className='flex justify-center'>
                <Button label='Upload Files' type='submit' fill onClick={e => uploadButtonHandle(e)} />
            </div>
        </div>
    )
}

export default JobsUploaderV2
