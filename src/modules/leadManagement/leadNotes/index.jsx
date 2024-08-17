import { memo, useReducer } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Loading } from '@components'

import { fetchNotes, saveNote } from '@modules/leadManagement/api'
import { NoteCreateForm, NoteEditForm, NoteActions } from '@modules/leadManagement/components'

import { decodeJwt, formatDate } from '@utils/helpers'
import { avatarPlaceholder } from '@constants/profile'
import { NOTE_INITIAL_STATE } from '@constants/leadManagement'

const LeadNotes = () => {
    const user = decodeJwt()
    const { id } = useParams()
    const { state } = useLocation()

    const [note, setNote] = useReducer((prev, next) => ({ ...prev, ...next }), NOTE_INITIAL_STATE)

    const { data, isLoading, mutate } = useSWR(
        `/api/lead_managament/lead_activity_notes/?lead=${id}&status=${state.status}&phase=${state.phase}`,
        fetchNotes
    )

    const { handleSubmit, trigger } = useMutate(
        `/api/lead_managament/lead_activity_notes${note.id ? `/${note.id}/` : '/'}`,
        saveNote,
        null,
        null,
        async () => trigger({ id: note.id, notes: note.id ? note.edit : note.msg, lead: id }),
        null,
        () => mutate() && setNote({ id: null, msg: '', edit: '' })
    )

    if (isLoading) return <Loading />

    return (
        <div className='px-4'>
            {/* <h6>Filters Here...</h6> */}
            <div className='border pt-6 text-[#1E6570] mt-4 relative border-cyan-200 rounded-lg'>
                <p className='-mt-10 absolute px-3 mx-3 border bg-[#EDFDFB] text-lg tracking-widest border-cyan-200'>
                    New<span className='text-sm'> Note</span>
                </p>
                <div className='px-2 pb-10 md:px-4'>
                    <NoteCreateForm handleSubmit={handleSubmit} note={note} setNote={setNote} user={user} />
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
                        <div className='text-sm text-gray-600 pl-14 pt-2'>No notes added yet...</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(LeadNotes)
