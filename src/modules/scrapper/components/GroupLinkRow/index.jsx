import { memo } from 'react'

import { Badge } from '@components'

import { can } from '@utils/helpers'

import { UptoIcon, EditIcon, TrashIcon } from '@icons'

const GroupLinkRow = ({ row = null, actions = false, status = false }) => (
    <div className='mt-2 flex justify-between items-center p-3 bg-slate-100 border border-[#338d8c] border-opacity-40 rounded-lg hover:bg-cyan-50'>
        <span className='capitalize'>{row?.job_source ?? 'N/A'}</span>
        <span>{row?.job_type ?? 'N/A'}</span>
        {status && <span>{row?.status ? <Badge label={row?.status} /> : '--'}</span>}
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
            {actions && can(['edit_job_source_link', 'delete_job_source_link']) && (
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
