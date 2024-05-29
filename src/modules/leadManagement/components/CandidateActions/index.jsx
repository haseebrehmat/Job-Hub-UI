import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { can } from '@utils/helpers'
import { CANDIDATE_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon } from '@icons'

const CandidateActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='flex items-center'>
            {can('delete_user') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/candidate_management/candidate/${id}/`}
                    refetch={mutate}
                    perm={CANDIDATE_DELETION}
                >
                    <Tooltip text='Delete candidate'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
            {can('edit_user') && (
                <Tooltip text='Edit candidate'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
                </Tooltip>
            )}
        </div>
    )
})

export default memo(CandidateActions)
