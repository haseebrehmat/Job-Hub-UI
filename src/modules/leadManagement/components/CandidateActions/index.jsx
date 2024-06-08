import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip, Checkbox } from '@components'

import { can } from '@utils/helpers'
import { CANDIDATE_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon } from '@icons'

const CandidateActions = memo(({ row, edit, mutate }) => {
    const [show, setShow] = useState(false)
    const [check, setCheck] = useState({ [row?.id]: row?.allowed_status })

    return (
        <div className='flex items-center'>
            {can('edit_candidate') && (
                <Tooltip text={`${check[row?.id] ? 'Deny' : 'Allow'} Leads`}>
                    <Checkbox onChange={() => setCheck({ [row?.id]: !check[row?.id] })} checked={check[row?.id]} />
                </Tooltip>
            )}
            {can('delete_candidate') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/candidate_management/candidate/${row?.id}/`}
                    refetch={mutate}
                    perm={CANDIDATE_DELETION}
                >
                    <Tooltip text='Delete candidate'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
            {can('edit_candidate') && (
                <Tooltip text='Edit candidate'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit(row)} />
                </Tooltip>
            )}
        </div>
    )
})

export default memo(CandidateActions)
