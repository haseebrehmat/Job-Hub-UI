import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Button, Tooltip } from '@components'

import { SeePassIcon, AssignCandidateIcon } from '@icons'

const LeadActions = ({ lead, dispatch = null }) => (
    <div className='pl-2 mr-1 flex'>
        <Tooltip text='Assign Candidate'>
            <Link to={`/assign-candidate/${lead?.id}`} state={{ candidate: lead?.candidate?.id }}>
                {AssignCandidateIcon}
            </Link>
        </Tooltip>
        <Tooltip text='View lead Details'>
            <Button
                classes='_icon-btn'
                icon={SeePassIcon}
                onClick={() => dispatch({ draggable: lead?.id, show: true })}
            />
        </Tooltip>
    </div>
)

export default memo(LeadActions)
