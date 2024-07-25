import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { can } from '@utils/helpers'

import { TrashIcon, EditIcon, Checkedbox, unCheckedbox } from '@icons'

const JobActions = memo(({ id, expired = false, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <span className='flex justify-center'>
            {!expired ? (
                <Tooltip text='Mark as expired'>
                    <button onClick={() => console.log('Mark as expired')}>{unCheckedbox}</button>
                </Tooltip>
            ) : (
                <Tooltip text='Unmark as active'>
                    <button onClick={() => console.log('Unmark as active')}>{Checkedbox}</button>
                </Tooltip>
            )}
            <div className='flex ml-1'>
                {can('edit_job') && (
                    <Tooltip text='Edit job'>
                        <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
                    </Tooltip>
                )}
                {can('delete_job') && (
                    <DeleteDialog
                        show={show}
                        setShow={setShow}
                        url={`api/candidate_managements/regions/${id}/`}
                        refetch={mutate}
                        perm={false}
                    >
                        <Tooltip text='Delete job'>
                            <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                        </Tooltip>
                    </DeleteDialog>
                )}
            </div>
        </span>
    )
})

export default memo(JobActions)
