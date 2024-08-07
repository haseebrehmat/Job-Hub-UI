import { useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { REGION_DELETION } from '@constants/allowDeletion'
import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const TrendsActions = ({ row, edit, mutate }) => {
    const [show, setShow] = useState(false)
    return (
        <div className='pl-2 mr-1 flex'>
            {can('edit_trend_analytics') && (
                <Tooltip text='Edit region'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit(row)} />
                </Tooltip>
            )}
            {can('delete_trend_analytics') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`/api/job_portal/trends_analytics/${row.id}/`}
                    refetch={mutate}
                    perm={REGION_DELETION}
                >
                    <Tooltip text='Delete region'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
}

export default TrendsActions
