import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Badge, Tooltip } from '@components'

import { CurrentPhaseIcon, LeadVerticalIcon, AssignCandidateIcon } from '@icons'

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
        <div className='flex items-center justify-end gap-2'>
            <Tooltip text='Assign Candidate'>
                <Link to={`/assign-candidate/${lead?.id}`}>{AssignCandidateIcon}</Link>
            </Tooltip>
            <Badge label={lead?.applied_job?.tech_stack} classes='text-xs' />
        </div>
    </div>
)

export default memo(LeadCard)
