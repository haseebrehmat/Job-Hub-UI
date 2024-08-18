import { memo } from 'react'

import { formatDate } from '@utils/helpers'
import { avatarPlaceholder } from '@constants/profile'

const LeadNote = ({ note, actions = null, editForm = null, options = {} }) => (
    <div className='flex gap-x-2.5 pb-2 border-b mb-2' key={note.id}>
        <img
            alt={note?.user?.name || 'Guest'}
            src={note?.user?.avatar ?? avatarPlaceholder}
            onError={e => (e.target.src = avatarPlaceholder)}
            className='h-9 w-9 rounded-full object-cover shadow-sm'
        />
        <div className='flex flex-col w-full gap-y-1'>
            <div className='flex gap-x-6 items-center'>
                <span className='text-sm text-gray-900 capitalize'>{note?.user?.name || 'guest'}</span>
                <span className='text-xs text-gray-600'>{formatDate(note?.updated_at)}</span>
                {note?.user?.id === options?.user?.user_id &&
                    !(options?.note?.id && options?.note?.id === note?.id) &&
                    actions}
            </div>
            {options?.note?.id && options?.note?.id === note?.id ? (
                editForm
            ) : (
                <span className='text-black'>{note.message}</span>
            )}
        </div>
    </div>
)

export default memo(LeadNote)
