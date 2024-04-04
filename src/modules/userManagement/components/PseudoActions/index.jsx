import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, DeleteDialog, Tooltip } from '@components'

import { can } from '@utils/helpers'
import { PSEUDO_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon, CreateIcon } from '@icons'

const PseudoActions = memo(({ id, edit, mutate }) => {
    const redirect = useNavigate()

    const [show, setShow] = useState(false)

    const goToVerticals = () => redirect(`/pseudo/${id}/verticals`)

    return (
        <div className='flex items-center'>
            <Tooltip text='Add vertical'>
                <Button classes='bg-transparent border-0 !px-0' icon={CreateIcon} onClick={goToVerticals} />
            </Tooltip>
            {can('edit_user') && (
                <Tooltip text='Edit pseudo'>
                    <Button classes='bg-transparent border-0 !px-0' icon={EditIcon} onClick={() => edit()} />
                </Tooltip>
            )}
            {can('delete_user') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/auth/user/${id}/`}
                    refetch={mutate}
                    perm={PSEUDO_DELETION}
                >
                    <Tooltip text='Delete pseudo'>
                        <Button
                            classes='bg-transparent border-0 !px-0'
                            icon={TrashIcon}
                            onClick={() => setShow(true)}
                        />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
})

export default memo(PseudoActions)
