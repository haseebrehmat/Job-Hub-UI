import { memo } from 'react'

import { Badge } from '@components'

import { CurrentPhaseIcon } from '@icons'

const LeadCard = ({ lead, dispatch }) => (
    <div
        className='bg-white text-gray-500 border border-[#048C8C] rounded-md p-2'
        onClick={() => dispatch({ show: true, draggable: lead?.id })}
    >
        <h2 className='text-sm capitalize'>{lead?.applied_job?.title}</h2>
        <h2 className='capitalize italic py-2'>{lead?.applied_job?.company}</h2>
        <h2 className='flex'>
            <span>{CurrentPhaseIcon}</span>
            <span className='text-xs'>{lead?.phase_name ?? 'not set'}</span>
        </h2>
        <h2 className='text-right'>
            <Badge label={lead?.applied_job?.tech_stack} />
        </h2>
    </div>
)

export default memo(LeadCard)
