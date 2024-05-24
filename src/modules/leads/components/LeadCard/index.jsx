import { memo } from 'react'

import { Badge } from '@components'

import { CurrentPhaseIcon, LeadVerticalIcon } from '@icons'

const LeadCard = ({ lead, dispatch }) => (
    <div
        className='bg-white text-gray-500 border border-[#048C8C] rounded-md p-2'
        onClick={() => dispatch({ show: true, draggable: lead?.id })}
    >
        <p className='text-sm capitalize'>{lead?.applied_job?.title}</p>
        <p className='capitalize italic py-2'>{lead?.applied_job?.company}</p>
        <p className='flex space-x-1 mb-2'>
            {lead?.applied_job?.vertical_name && lead?.applied_job?.vertical_name?.length > 0 ? (
                <>
                    <span>{LeadVerticalIcon}</span>
                    <span className='text-xs capitalize'>{lead?.applied_job?.vertical_name}</span>
                </>
            ) : (
                <span className='text-xs capitalize'>N/A</span>
            )}
        </p>
        <p className='flex'>
            <span>{CurrentPhaseIcon}</span>
            <span className='text-xs'>{lead?.phase_name ?? 'not set'}</span>
        </p>
        <p className='text-right'>
            <Badge label={lead?.applied_job?.tech_stack} />
        </p>
    </div>
)

export default memo(LeadCard)
