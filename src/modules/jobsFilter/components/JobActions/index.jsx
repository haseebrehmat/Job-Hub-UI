import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { REGION_DELETION } from '@constants/allowDeletion'
import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const JobActions = memo(({ id, edit, mutate = null }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='flex ml-1'>
            {can('view_region') && (
                <Tooltip text='Edit job'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
                </Tooltip>
            )}
            {can('view_region') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/candidate_managements/regions/${id}/`}
                    refetch={mutate}
                    perm={REGION_DELETION}
                >
                    <Tooltip text='Delete job'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
})

export default memo(JobActions)
