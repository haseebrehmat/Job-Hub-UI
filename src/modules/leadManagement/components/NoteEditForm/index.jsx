import { memo, useMemo, useState } from 'react'

import { Textarea, Button } from '@components'
import { EMOJIS } from '@constants/leadManagement'

const NoteEditForm = ({ note, handleSubmit, setNote }) => {
    const [showEmo, setShowEmo] = useState(false)
    const handleEditChange = e => setNote({ edit: e.target.value })

    const memoized = useMemo(
        () => (
            <form onSubmit={handleSubmit}>
                <Textarea ph='Type your notes' rows={2} value={note.edit} onChange={handleEditChange} />
                {note.edit.length > 0 && note.id && (
                    <div className='space-x-2 float-right'>
                        <Button label='Update' classes='!py-1' type='submit' fit fill />
                        <Button label='Cancel' classes='!py-1' fit onClick={() => setNote({ id: null, edit: '' })} />
                    </div>
                )}
            </form>
        ),
        [note]
    )
    return (
        <>
            {memoized}
            <div className='relative w-fit -mt-8'>
                <span className='border-2 rounded-2xl px-1 py-1.5 cursor-pointer' onClick={() => setShowEmo(!showEmo)}>
                    {EMOJIS[0]}
                </span>
                {showEmo && (
                    <div className='absolute top-9 left-0 z-10 flex flex-wrap items-center gap-3 border rounded-3xl w-72 p-3 bg-white shadow-xl  border-slate-300'>
                        {EMOJIS.map(emoji => (
                            <span
                                onClick={() => setNote({ edit: `${note?.edit} ${emoji}` })}
                                className='cursor-pointer'
                                key={emoji}
                            >
                                {emoji}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default memo(NoteEditForm)
