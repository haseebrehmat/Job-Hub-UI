import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Button, Tooltip } from '@components'

import { can } from '@utils/helpers'

import { SeePassIcon, AssignCandidateIcon } from '@icons'

const LeadActions = ({ lead, dispatch = null }) => (
    <div className='absolute top-0 right-0 pl-2 mr-1 flex'>
        {can('edit_designation') && (
            <Tooltip text='Assign Candidate'>
                <Link to={`/assign-candidate/${lead?.id}`} state={{ candidate: lead?.candidate?.id }}>
                    {AssignCandidateIcon}
                </Link>
            </Tooltip>
        )}
        {can('delete_designation') && (
            <Tooltip text='View lead Details'>
                <Button
                    classes='_icon-btn'
                    icon={SeePassIcon}
                    onClick={() => dispatch({ draggable: lead?.id, show: true })}
                />
            </Tooltip>
        )}
    </div>
)

export default memo(LeadActions)
