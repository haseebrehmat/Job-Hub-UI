import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { STATUS_DELETION } from '@constants/allowDeletion'
import { can } from '@utils/helpers'

import { TrashIcon } from '@icons'

const CompanyStatusActions = memo(({ id, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 pl-2 mr-1 flex'>
            {can('remove_company_status') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/profile/generic_skill/${id}/`}
                    refetch={mutate}
                    perm={STATUS_DELETION}
                >
                    <Tooltip text='Delete status'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
})

export default memo(CompanyStatusActions)
