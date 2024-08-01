import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Button, Tooltip } from '@components'

import { SeePassIcon, AssignCandidateIcon } from '@icons'

const LeadActions = ({ lead, dispatch = null }) => (
    <div className='flex items-center justify-end gap-1'>
        <Tooltip text='View lead Details'>
            <Button
                classes='_icon-btn'
                icon={SeePassIcon}
                onClick={() => dispatch({ draggable: lead?.id, show: true })}
            />
        </Tooltip>
        <Tooltip text='Assign Candidate'>
            <Link to={`/assign-candidate/${lead?.id}`} state={{ candidate: lead?.candidate?.id }}>
                {AssignCandidateIcon}
            </Link>
        </Tooltip>
    </div>
)

export default memo(LeadActions)
