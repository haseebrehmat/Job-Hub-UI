import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Badge, Searchbox, EmptyTable, Filters, Button } from '@components'

import { IntegrationForm } from '@modules/settings/components'
import { fetchIntegrations } from '@modules/settings/api'

import { integrations_head, apiStatus } from '@constants/settings'

import { CreateIcon, ActionsIcons } from '@icons'

const Integrations = () => {
    const [query, setQuery] = useState()
    const [company, setCompany] = useState()
    const [show, setShow] = useState(false)
    const { data, error, isLoading, mutate } = useSWR('/api/auth/integration/', fetchIntegrations)
    console.log(data)
    const handleClick = ({ name, status, id }) => {
        setCompany({ name, status, id })
        setShow(!show)
    }
    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={query} setQuery={setQuery} />
                <Filters />
                <Button
                    label='Add Integration'
                    fit
                    icon={CreateIcon}
                    onClick={() => handleClick({ name: '', status: true, user: '' })}
                />
            </div>
            <table className='table-auto w-full  text-sm text-left text-[#048C8C] '>
                <thead className='text-xs uppercase border border-[#048C8C] '>
                    <tr>
                        {integrations_head.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.integrations?.length > 0 && !error ? (
                        data.integrations.map((comp, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={comp.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{comp.company?.name}</td>
                                <td className='px-3 py-6'>{comp?.api_key}</td>
                                <td className='px-1 py-6'>
                                    <Badge
                                        label={apiStatus[comp?.status ? 0 : 1]}
                                        type={comp?.status ? 'enabled' : 'disabled'}
                                    />
                                </td>
                                <td className='px-3 py-6 float-right' onClick={() => handleClick(comp)}>
                                    {ActionsIcons}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No company intigrations found yet!' />
                    )}
                </tbody>
            </table>
            {show && <IntegrationForm show={show} setShow={setShow} mutate={mutate} company={company} />}
        </div>
    )
}

export default memo(Integrations)
