import { memo, useReducer } from 'react'

import { useMutate } from '@/hooks'

import { CustomSelector, Textarea, Button, DeleteDialog } from '@components'

import { saveNote } from '@modules/leads/api'

import {
    decodeJwt,
    parseSelectedStatus,
    parseStatuses,
    parseStatusPhases,
    parseSelectedStatusPhase,
    formatDate,
} from '@utils/helpers'
import { avatarPlaceholder } from '@constants/profile'

const Notes = ({ lead = null, notes = [], status = null, error = null, loading = true, mutate, dispatch = null }) => {
    const user = decodeJwt()
    const [note, setNote] = useReducer((prev, next) => ({ ...prev, ...next }), {
        id: null,
        msg: '',
        edit: '',
        show: false,
        status: '',
        phase: '',
    })
    const { handleSubmit, trigger } = useMutate(
        `/api/lead_managament/lead_activity_notes${note.id ? `/${note.id}/` : '/'}`,
        saveNote,
        {},
        null,
        async () => trigger({ id: note.id, notes: note.id ? note.edit : note.msg, lead: lead?.id }),
        null,
        () => mutate() && setNote({ id: null, msg: '', edit: '' })
    )

    const handleChange = e => setNote({ id: null, msg: e.target.value, edit: '' })
    const handleEditChange = e => setNote({ edit: e.target.value })
    const filterNotes = () => dispatch({ status: note.status, phase: note.phase })
    const clearFilters = () => setNote({ status: '', phase: '' }) && dispatch({ status: '', phase: '' })

    return lead ? (
        <div className='border p-2'>
            <p className='text-lg'>Recent Notes</p>
            <hr />
            <div className='flex items-center justify-between mt-2 p-2 text-sm bg-cyan-50'>
                <div className='flex gap-2.5 items-center w-full'>
                    <span>Show:</span>
                    {loading ? (
                        <span>Loading...</span>
                    ) : error ? (
                        <span>Error to Load statuses</span>
                    ) : (
                        <>
                            <div className='w-1/4'>
                                <CustomSelector
                                    options={parseStatuses(status)}
                                    handleChange={({ value }) => setNote({ status: value, phase: '' })}
                                    selectorValue={parseSelectedStatus(note.status, status)}
                                    placeholder='Select Status'
                                />
                            </div>
                            <div className='w-1/4'>
                                <CustomSelector
                                    options={parseStatusPhases(note.status, status)}
                                    handleChange={({ value }) => setNote({ phase: value })}
                                    selectorValue={parseSelectedStatusPhase(note.phase, note.status, status)}
                                    placeholder='Select Phase'
                                />
                            </div>
                        </>
                    )}
                </div>
                <Button label='Get' fit classes='!float-right !py-1' onClick={filterNotes} />
                <Button label='Clear' fit classes='!float-right !py-1 ml-1.5' onClick={clearFilters} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-[auto_1fr] pt-2.5 gap-x-2.5'>
                    <img
                        alt={user?.username}
                        src={user?.file_url ?? avatarPlaceholder}
                        onError={e => (e.target.src = avatarPlaceholder)}
                        className='h-12 w-12 rounded-full object-cover shadow-sm'
                    />
                    <Textarea name='notes' ph='Type your notes' rows={2} value={note.msg} onChange={handleChange} />
                </div>
                {note.msg.length > 0 && !note.id && (
                    <div className='mt-2 space-x-2 float-right'>
                        <Button label='Save' classes='!py-1' type='submit' fit fill />
                        <Button label='Clear' classes='!py-1' fit onClick={() => setNote({ id: null, msg: '' })} />
                    </div>
                )}
            </form>
            <div className='pt-3 pl-3'>
                {notes?.length > 0 ? (
                    notes?.map(row => (
                        <div className='flex gap-x-2.5 pb-3.5' key={row.id}>
                            <img
                                alt={row?.user?.name || 'Guest'}
                                src={row?.user?.avatar ?? avatarPlaceholder}
                                onError={e => (e.target.src = avatarPlaceholder)}
                                className='h-9 w-9 rounded-full object-cover shadow-sm'
                            />
                            <div className='flex flex-col w-full gap-y-1'>
                                <div className='flex gap-x-6 items-center w-full'>
                                    <span className='text-sm text-gray-900 capitalize'>
                                        {row?.user?.name || 'guest'}
                                    </span>
                                    <span className='text-xs text-gray-600'>{formatDate(row?.updated_at)}</span>
                                </div>
                                {note.id && note.id === row?.id ? (
                                    <form onSubmit={handleSubmit}>
                                        <Textarea
                                            ph='Type your notes'
                                            rows={2}
                                            value={note.edit}
                                            onChange={handleEditChange}
                                        />
                                        {note.edit.length > 0 && note.id && (
                                            <div className='space-x-2 float-right'>
                                                <Button label='Update' classes='!py-1' type='submit' fit fill />
                                                <Button
                                                    label='Cancel'
                                                    classes='!py-1'
                                                    fit
                                                    onClick={() => setNote({ id: null, edit: '' })}
                                                />
                                            </div>
                                        )}
                                    </form>
                                ) : (
                                    <>
                                        <span>{row.message}</span>
                                        {row?.user?.id === user?.user_id && (
                                            <span className='flex gap-x-2 font-semibold text-gray-500'>
                                                <small
                                                    className='underline cursor-pointer'
                                                    onClick={() =>
                                                        setNote({ id: row?.id, edit: row?.message, msg: '' })
                                                    }
                                                >
                                                    Edit
                                                </small>
                                                <DeleteDialog
                                                    show={note.show}
                                                    setShow={val => setNote({ show: val })}
                                                    url={`/api/lead_managament/lead_activity_notes/${row?.id}/`}
                                                    refetch={mutate}
                                                    perm
                                                >
                                                    <small
                                                        className='underline cursor-pointer'
                                                        onClick={() => setNote({ show: true })}
                                                    >
                                                        Delete
                                                    </small>
                                                </DeleteDialog>
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-sm text-gray-600 pl-14 pt-2'>No notes added yet...</div>
                )}
            </div>
        </div>
    ) : null
}

export default memo(Notes)
