import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Badge, Searchbox, EmptyTable, Filters, Button } from '@components'

import { fetchCompanies } from '@modules/userManagement/api'

import { comapnyHeads, comapnyStatus } from '@constants/userManagement'

import { CreateIcon, ActionsIcons } from '@icons'

const Companies = () => {
    const [query, setQuery] = useState()
    const { data, error, isLoading } = useSWR([query], fetchCompanies)

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={query} setQuery={setQuery} />
                <Filters />
                <Button label='Create Company' fit icon={CreateIcon} />
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {comapnyHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.companies?.length > 0 && !error ? (
                        data.companies.map((company, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={company.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{company?.id}</td>
                                <td className='px-3 py-6'>{company?.name}</td>
                                <td className='px-3 py-6'>{company?.code}</td>
                                <td className='px-1 py-6'>
                                    <Badge
                                        label={comapnyStatus[company?.status ? 0 : 1]}
                                        type={company?.status ? 'enabled' : 'disabled'}
                                    />
                                </td>
                                <td className='px-3 py-6 float-right'>{ActionsIcons}</td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No companies found yet!' />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default memo(Companies)
