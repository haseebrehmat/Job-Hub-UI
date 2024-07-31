import { memo, useState } from 'react'

import { useMutate } from '@/hooks'
import { Button, DeleteDialog, Tooltip, Modal } from '@components'

import { allowCandidateForLeads, allowCandidateForLogin } from '@modules/leadManagement/api'

import { can, decodeJwt } from '@utils/helpers'
import { CANDIDATE_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon, SeePassIcon, AllowLogin, RestrictLogin } from '@icons'

const CandidateActions = ({ row, edit, mutate }) => {
    const user = decodeJwt()
    const [show, setShow] = useState(false)
    const [statusUpdate, setStatusUpdate] = useState(false)

    const { handleSubmit, trigger } = useMutate(
        '/api/candidate_management/candidate/',
        allowCandidateForLeads,
        { status: !row?.allowed_status, candidate: row?.id },
        null,
        async formValues => trigger({ ...formValues }),
        null,
        () => mutate()
    )
    const [loginStatusUpdate, setLoginStatusUpdate] = useState(false)

    const { handleSubmit: handleLoginSubmit, trigger: logintrigger } = useMutate(
        '/api/candidate_management/candidate/',
        allowCandidateForLogin,
        { login_status: !row?.allowed_login, candidate: row?.id },
        null,
        async formValues => logintrigger({ ...formValues }),
        null,
        () => mutate()
    )
    const flag = row?.company?.id === user?.company
    return (
        <div className='flex items-center'>
            {flag && (
                <>
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
                    {can('edit_candidate') && (
                        <Tooltip text={`${row?.allowed_login ? 'Allow' : 'Restrict'} Login`}>
                            <Button
                                classes='_icon-btn'
                                icon={row?.allowed_login ? RestrictLogin : AllowLogin}
                                onClick={() => setLoginStatusUpdate(true)}
                            />
                        </Tooltip>
                    )}
                </>
            )}
            {can('edit_candidate') && (
                <Tooltip text={`${row?.allowed_status ? 'Deny' : 'Allow'} Leads`}>
                    <Button classes='_icon-btn' icon={SeePassIcon} onClick={() => setStatusUpdate(true)} />
                </Tooltip>
            )}
            <Modal
                classes='!w-1/3'
                show={statusUpdate}
                setShow={setStatusUpdate}
                content={
                    <div className='w-full'>
                        <h3 className='mt-1'>
                            Are you sure to {row?.allowed_status ? 'deny' : 'allow'} this candidate
                            <span className='font-bold mx-2'>{row?.name}</span>to take leads?
                        </h3>
                        <div className='flex items-center mt-3 gap-3 float-right'>
                            <Button
                                classes='bg-red-500 border-red-500 hover:bg-red-600'
                                label='Confirm'
                                fill
                                onClick={() => {
                                    handleSubmit()
                                    setStatusUpdate(false)
                                }}
                            />
                            <Button label='Cancel' onClick={() => setStatusUpdate(false)} />
                        </div>
                    </div>
                }
            />
            <Modal
                classes='!w-1/3'
                show={loginStatusUpdate}
                setShow={setLoginStatusUpdate}
                content={
                    <div className='w-full'>
                        <h3 className='mt-1'>
                            Are you sure to {row?.allowed_login ? 'allow' : 'restrict'} login for <b>{row?.name}</b> ?
                        </h3>
                        <div className='flex items-center mt-3 gap-3 float-right'>
                            <Button
                                classes='bg-red-500 border-red-500 hover:bg-red-600'
                                label='Confirm'
                                fill
                                onClick={() => {
                                    handleLoginSubmit()
                                    setLoginStatusUpdate(false)
                                }}
                            />
                            <Button label='Cancel' onClick={() => setLoginStatusUpdate(false)} />
                        </div>
                    </div>
                }
            />
        </div>
    )
}

export default memo(CandidateActions)
