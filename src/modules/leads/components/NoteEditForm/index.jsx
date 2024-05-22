import { memo, useMemo } from 'react'

import { Textarea, Button } from '@components'

const NoteEditForm = ({ note, handleSubmit, setNote }) => {
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
    return memoized
}

export default memo(NoteEditForm)
