import { memo, useReducer } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import useSWR from 'swr'
import { toast } from 'react-hot-toast'

import { useMutate } from '@/hooks'

import { Loading } from '@components'

import { fetchNotes, saveNote } from '@modules/leadManagement/api'
import { NoteCreateForm, NoteEditForm, NoteActions, LeadNoteSearch } from '@modules/leadManagement/components'

import { decodeJwt, formatDate } from '@utils/helpers'
import { MAX_FILE_SIZE, avatarPlaceholder } from '@constants/profile'
import { NOTE_INITIAL_STATE } from '@constants/leadManagement'

const emojis = ['\u{1F604}', '\u{1F970}', '\u{1F602}', '\u{1F60D}', '\u{1F44D}', '\u{2764}', '\u{1F44C}', '\u{274C}']

const LeadNotes = () => {
    const user = decodeJwt()
    const { id } = useParams()
    const { state } = useLocation()

    const [note, setNote] = useReducer((prev, next) => ({ ...prev, ...next }), NOTE_INITIAL_STATE)

    const { data, isLoading, mutate } = useSWR(
        `/api/lead_managament/lead_activity_notes/?lead=${id}&status=${state.status || note.status}&phase=${
            state.phase || note.phase
        }`,
        fetchNotes
    )

    const { handleSubmit, trigger } = useMutate(
        `/api/lead_managament/lead_activity_notes${note.id ? `/${note.id}/` : '/'}`,
        saveNote,
        { lead: id },
        null,
        async formVals => trigger({ ...formVals, id: note.id, notes: note.id ? note.edit : note.msg, file: note.file }),
        null,
        () => mutate() && setNote({ id: null, msg: '', edit: '' })
    )

    const fileUpload = e => {
        const file = e.target.files[0]
        if (file.size > MAX_FILE_SIZE) {
            toast.error(`File size is too large. Max size: ${Math.ceil(MAX_FILE_SIZE / (1024 * 1024))} MBs.`)
            e.target.value = null
        } else {
            setNote({ file })
        }
    }

    if (isLoading) return <Loading />

    return (
        <div className='px-4'>
            <LeadNoteSearch dispatch={setNote} />
            <div className='border pt-6 text-[#1E6570] mt-8 relative border-cyan-200 rounded-lg'>
                <p className='-mt-10 absolute px-3 mx-3 border bg-[#EDFDFB] text-lg tracking-widest border-cyan-200'>
                    New<span className='text-sm'> Note</span>
                </p>
                <div className='px-2 pb-5 md:px-4'>
                    <NoteCreateForm handleSubmit={handleSubmit} note={note} setNote={setNote} user={user} />
                    <div className='flex gap-3 mt-2'>
                        <div className='flex items-center gap-3 border rounded-3xl w-fit px-2 border-cyan-500 ml-14'>
                            {emojis.map(emoji => (
                                <span
                                    onClick={() => setNote({ msg: note.msg + emoji })}
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
                                className='block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:text-white file:font-semibold file:bg-[#329988] hover:file:bg-[#4ab9a7]'
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div className='border pt-8 text-[#1E6570] mt-8 relative border-cyan-200 rounded-lg'>
                <p className='-mt-12 absolute px-3 mx-3 border bg-[#EDFDFB] text-lg tracking-widest border-cyan-200'>
                    Recent<span className='text-sm'> Notes</span>
                </p>
                <div className='px-2 md:px-4'>
                    {data?.length > 0 ? (
                        data?.map(row => (
                            <div className='flex gap-x-2.5 pb-2 border-b mb-2' key={row.id}>
                                <img
                                    alt={row?.user?.name || 'Guest'}
                                    src={row?.user?.avatar ?? avatarPlaceholder}
                                    onError={e => (e.target.src = avatarPlaceholder)}
                                    className='h-9 w-9 rounded-full object-cover shadow-sm'
                                />
                                <div className='flex flex-col w-full gap-y-1'>
                                    <div className='flex gap-x-6 items-center'>
                                        <span className='text-sm text-gray-900 capitalize'>
                                            {row?.user?.name || 'guest'}
                                        </span>
                                        <span className='text-xs text-gray-600'>{formatDate(row?.updated_at)}</span>
                                        {row?.user?.id === user?.user_id && !(note.id && note.id === row?.id) && (
                                            <NoteActions row={row} note={note} setNote={setNote} mutate={mutate} />
                                        )}
                                    </div>
                                    {note.id && note.id === row?.id ? (
                                        <NoteEditForm handleSubmit={handleSubmit} note={note} setNote={setNote} />
                                    ) : (
                                        <span className='text-black'>{row.message}</span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-sm text-gray-600 pl-14 pt-2 pb-2'>No notes added yet...</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(LeadNotes)
