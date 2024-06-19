import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable, Paginated } from '@components'

import { BlockOrUnblock } from '@modules/jobComapnies/components'
import { fetchUsers } from '@modules/userManagement/api'

import { can } from '@utils/helpers'
import { JOB_COMPANIES_HEADS } from '@constants/jobCompanies'

const JobCompanies = () => {
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)

    const { data, error, isLoading } = useSWR(`/api/auth/user/?page=${page}&search=${query}`, fetchUsers)

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={query} setQuery={setQuery} />
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {JOB_COMPANIES_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.users?.length > 0 && !error ? (
                        data?.users?.map((row, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{row?.email}</td>
                                <td className='px-3 py-6'>{row?.username}</td>
                                <td className='px-3 py-6 float-right'>
                                    {can(['edit_user', 'delete_user']) && <BlockOrUnblock />}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={4} msg='No job companies found yet!' />
                    )}
                </tbody>
            </table>
            {data?.users?.length > 24 && (
                <div className='w-full'>
                    <Paginated pages={data?.pages ?? Math.ceil(data.total / 25)} setPage={setPage} page={page} />
                </div>
            )}
        </div>
    )
}

export default memo(JobCompanies)
