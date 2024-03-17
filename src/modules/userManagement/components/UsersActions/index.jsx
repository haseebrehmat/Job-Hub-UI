import { memo, useState } from 'react'

import { Button, DeleteDialog } from '@components'

import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const UsersActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='flex items-center'>
            {can('delete_user') && (
                <DeleteDialog show={show} setShow={setShow} url={`api/auth/user/${id}/`} refetch={mutate}>
                    <Button classes='bg-transparent border-0 px-0' icon={TrashIcon} onClick={() => setShow(true)} />
                </DeleteDialog>
            )}
            {can('edit_user') && (
                <Button classes='bg-transparent border-0 px-0' icon={EditIcon} onClick={() => edit()} />
            )}
        </div>
    )
})

export default memo(UsersActions)
