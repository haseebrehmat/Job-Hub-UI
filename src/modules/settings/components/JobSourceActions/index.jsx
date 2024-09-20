import { memo, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { useDynamicJobSourcesStore } from '@/stores'

import { Button, DeleteDialog } from '@components'

import { DYNAMIC_JOB_SOURCE_DELETION } from '@constants/allowDeletion'
import { can, isset } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const JobSourceActions = memo(({ edit = null, id }) => {
    const [mutate] = useDynamicJobSourcesStore(state => [state?.mutator])

    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 pl-2 mr-1 flex'>
            {isset(edit) && can('edit_region') && (
                <>
                    <Button classes={`_icon-btn edit-${id}`} icon={EditIcon} onClick={() => edit()} />
                    <Tooltip anchorSelect={`.edit-${id}`} content='Edit Job Source' />
                </>
            )}
            {isset(id) && can('delete_region') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/candidate_management/regions/${id}/`}
                    refetch={mutate}
                    perm={DYNAMIC_JOB_SOURCE_DELETION}
                >
                    <Button classes={`_icon-btn del-${id}`} icon={TrashIcon} onClick={() => setShow(true)} />
                    <Tooltip anchorSelect={`.del-${id}`} content='Delete Job Source' />
                </DeleteDialog>
            )}
        </div>
    )
})

export default memo(JobSourceActions)
