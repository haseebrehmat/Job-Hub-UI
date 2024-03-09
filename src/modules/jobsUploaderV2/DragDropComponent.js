import { useState } from 'react'
// drag drop file component
const DragDropFile = () => {
    // drag state
    const [dragActive, setDragActive] = useState(false)

    // handle drag events
    const handleDrag = e => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    return (
        <form id='form-file-upload' onDragEnter={handleDrag} onSubmit={e => e.preventDefault()}>
            <input type='file' id='input-file-upload' multiple />
            <label id='label-file-upload' htmlFor='input-file-upload' className={dragActive ? 'drag-active' : ''}>
                <div>
                    <p>Drag and drop your file here or</p>
                    <button className='upload-button'>Upload a file</button>
                </div>
            </label>
        </form>
    )
}
