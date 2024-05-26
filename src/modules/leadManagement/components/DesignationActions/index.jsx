import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { GENERIC_SKILL_DELETION } from '@constants/allowDeletion'
import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const DesignationActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 pl-2 mr-1 flex'>
            {can('edit_generic_skill') && (
                <Tooltip text='Edit desgination'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
                </Tooltip>
            )}
            {can('delete_generic_skill') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`/api/candidate_management/designation/${id}/`}
                    refetch={mutate}
                    perm={GENERIC_SKILL_DELETION}
                >
                    <Tooltip text='Delete desgination'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
})

export default memo(DesignationActions)