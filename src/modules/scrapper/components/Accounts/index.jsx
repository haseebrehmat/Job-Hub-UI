import { memo, useState } from 'react'
import useSWR from 'swr'

import { Button, EmptyTable, Loading } from '@components'

import { JobSourceLinkActions, AccountForm } from '@modules/scrapper/components'
import { fetchAccounts } from '@modules/scrapper/api'

import { can } from '@utils/helpers'
import { ACCOUNTS_HEADS } from '@constants/scrapper'

import { CreateIcon } from '@icons'

const Accounts = () => {
    const [account, setAccount] = useState()
    const [show, setShow] = useState(false)

    const { data, isLoading, error, mutate } = useSWR('/api/job_scraper/accounts/', fetchAccounts)

    const handleClick = (values = null) => {
        setAccount(values)
        setShow(true)
    }

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14'>
            <div className='flex items-center space-x-4 pb-6'>
                {can('create_scrapper_account') && (
                    <Button label='Create New Account' fit icon={CreateIcon} onClick={() => handleClick()} />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {ACCOUNTS_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {data?.accounts?.length > 0 && !error ? (
                        data?.accounts?.map(row => (
                            <tr className='border-b border-[#006366] border-opacity-30 hover:bg-gray-100' key={row.id}>
                                <td className='px-3 py-6'>{row.id}</td>
                                <td className='px-3 py-6'>{row.email}</td>
                                <td className='px-3 py-6'>{row.password}</td>
                                <td className='px-3 py-6 float-right'>
                                    {can(['edit_scrapper_account', 'delete_scrapper_account']) && (
                                        <JobSourceLinkActions
                                            id={row?.id}
                                            edit={() => handleClick(row)}
                                            mutate={mutate}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No job source links / urls found yet!' />
                    )}
                </tbody>
            </table>
            {can(['edit_scrapper_account', 'delete_scrapper_account']) && show && (
                <AccountForm show={show} setShow={setShow} mutate={mutate} account={account} />
            )}
        </div>
    )
}

export default memo(Accounts)
