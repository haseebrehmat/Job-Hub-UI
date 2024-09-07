import { memo } from 'react'

import { UptoIcon } from '@icons'

const GroupLinkRow = ({ source = null, type = null, link = null }) => (
    <div className='mt-2 flex justify-between items-center p-3 bg-slate-100 border border-[#338d8c] border-opacity-40 rounded-lg hover:bg-cyan-50'>
        <span>{source ?? 'N/A'}</span>
        <span>{type ?? 'N/A'}</span>
        <a
            href={link ?? '#'}
            target='_blank'
            rel='noreferrer'
            className='flex w-fit items-center gap-1.5 border border-[#4ab9a7] rounded-full px-2'
        >
            <span className='animate-ping'>{UptoIcon}</span>
            <span>Visit link</span>
        </a>
    </div>
)

export default memo(GroupLinkRow)
