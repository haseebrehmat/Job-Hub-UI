import { memo } from 'react'

import { Badge } from '@components'

import { UptoIcon, EditIcon, TrashIcon } from '@icons'

const GroupLinkRow = ({ row = null, actions = false, status = false }) => (
    <div className='mt-2 flex justify-between items-center p-3 bg-slate-100 border border-[#338d8c] border-opacity-40 rounded-lg hover:bg-cyan-50'>
        <span>{row?.source ?? 'N/A'}</span>
        <span>{row?.type ?? 'N/A'}</span>
        {status && <span>{row?.status ? <Badge text={row?.status} /> : '--'}</span>}
        <span className='flex items-center gap-2'>
            <a
                href={row?.link ?? '#'}
                target='_blank'
                rel='noreferrer'
                className='flex w-fit items-center gap-1.5 border border-[#4ab9a7] rounded-full px-2'
            >
                <span className='animate-ping'>{UptoIcon}</span>
                <span>Visit link</span>
            </a>
            {actions && (
                <>
                    <span className='flex w-fit justify-center items-center gap-1.5 border border-[#4ab9a7] rounded-full px-2'>
                        <span>{EditIcon}</span>
                        <span>Edit</span>
                    </span>
                    <span className='flex w-fit justify-center items-center gap-1.5 border border-[#4ab9a7] rounded-full px-2'>
                        <span>{TrashIcon}</span>
                        <span>Delete</span>
                    </span>
                </>
            )}
        </span>
    </div>
)

export default memo(GroupLinkRow)
