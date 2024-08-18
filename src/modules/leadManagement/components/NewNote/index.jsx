import { memo } from 'react'
import { toast } from 'react-hot-toast'

import { NoteCreateForm } from '@modules/leadManagement/components'

import { MAX_FILE_SIZE } from '@constants/profile'
import { EMOJIS } from '@constants/leadManagement'

const NewNote = ({ dispatch = null, options = {} }) => {
    const fileUpload = e => {
        const file = e.target.files[0]
        if (file.size > MAX_FILE_SIZE) {
            toast.error(`File size is too large. Max size: ${Math.ceil(MAX_FILE_SIZE / (1024 * 1024))} MBs.`)
            e.target.value = null
        } else {
            dispatch({ file })
        }
    }
    return (
        <div className='border pt-6 text-[#1E6570] mt-8 relative border-cyan-200 rounded-lg'>
            <p className='-mt-10 absolute px-3 mx-3 border bg-[#EDFDFB] text-lg tracking-widest border-cyan-200'>
                New<span className='text-sm'> Note</span>
            </p>
            {dispatch && (
                <div className='px-2 pb-5 md:px-4'>
                    <NoteCreateForm
                        handleSubmit={options?.submitHandler}
                        note={options?.note}
                        setNote={dispatch}
                        user={options?.user}
                    />
                    <div className='flex flex-col md:flex-row gap-3 mt-2'>
                        <div className='flex flex-wrap items-center gap-3 border rounded-3xl w-fit px-2 py-1 border-cyan-500 ml-14'>
                            {EMOJIS.map(emoji => (
                                <span
                                    onClick={() => dispatch({ msg: `${options?.note?.msg} ${emoji}` })}
                                    className='cursor-pointer'
                                    key={emoji}
                                >
                                    {emoji}
                                </span>
                            ))}
                        </div>
                        <label className='block'>
                            <span className='sr-only'>Attach file</span>
                            <input
                                type='file'
                                accept='.jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx, .zip'
                                onChange={fileUpload}
                                className='block w-full text-sm text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:text-white file:font-semibold file:bg-[#329988] hover:file:bg-[#4ab9a7]'
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(NewNote)
