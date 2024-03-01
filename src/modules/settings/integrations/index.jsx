import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Badge, Searchbox, EmptyTable, Button } from '@components'

import { IntegrationForm, FilterForm } from '@modules/settings/components'
import { fetchIntegrations } from '@modules/settings/api'

import { integrations_head, apiStatus } from '@constants/settings'
import { CreateIcon, ActionsIcons, FilterIcon } from '@icons'

const Integrations = () => {
    const [query, setQuery] = useState()
    const [company, setCompany] = useState()
    const [mutateShow, setMutateShow] = useState(false)
    const [filterShow, setFilterShow] = useState(false)
    const { data, error, isLoading, mutate } = useSWR('/api/auth/integration/', fetchIntegrations)
    console.log(data)
    const handleMutate = ({ name, status, id }) => {
        setCompany({ name, status, id })
        setMutateShow(!mutateShow)
    }
    const handleFilter = ({ name, status, id }) => {
        // setCompany({ name, status, id })
        setFilterShow(!filterShow)
    }
    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={query} setQuery={setQuery} />
                <Button
                    label='Filter'
                    fit
                    icon={FilterIcon}
                    onClick={() => handleFilter({ name: '', status: true, user: '' })}
                />
                <Button
                    label='Add Integration'
                    fit
                    icon={CreateIcon}
                    onClick={() => handleMutate({ name: '', status: true, user: '' })}
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
                                <td className='px-3 py-6 float-right' onClick={() => handleMutate(comp)}>
                                    {ActionsIcons}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No company intigrations found yet!' />
                    )}
                </tbody>
            </table>
            {mutateShow && (
                <IntegrationForm show={mutateShow} setShow={setMutateShow} mutate={mutate} company={company} />
            )}
            {filterShow && <FilterForm show={filterShow} setShow={setFilterShow} mutate={mutate} company={company} />}
        </div>
    )
}

export default memo(Integrations)
