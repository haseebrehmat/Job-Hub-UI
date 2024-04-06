import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable, Button, Paginated } from '@components'

import { PseudoForm, PseudoActions } from '@modules/pseudos/components'
import { fetchPseudos } from '@modules/pseudos/api'

import { can } from '@utils/helpers'
import { PSEUDO_HEADS } from '@constants/pseudos'

import { CreateIcon, EditIcon } from '@icons'

const Pseudos = () => {
    const [query, setQuery] = useState('')
    const [pseudo, setPseudo] = useState()
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR('/api/profile/pseudo/', fetchPseudos)

    const handleClick = (values = null) => {
        setPseudo(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={query} setQuery={setQuery} />
                {can('create_user') && (
                    <Button label='Create Pseudo' fit icon={CreateIcon} onClick={() => handleClick()} />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {PSEUDO_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.pseudos?.length > 0 && !error ? (
                        data?.pseudos?.map((row, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{row?.name}</td>
                                <td className='px-3 py-6'>
                                    {row?.verticals.length > 0
                                        ? row?.verticals.map(v => (
                                              <div
                                                  className='inline-flex items-center justify-center rounded-full bg-[#4f9d9b] text-white px-3 py-1 m-1 cursor-pointer hover:bg-[#346e6c] transition duration-200'
                                                  key={v.id}
                                              >
                                                  <Link to={`/vertical/${v.id}`} className='flex items-center'>
                                                      <span className='mr-2'>{v.name}</span>
                                                      {EditIcon}
                                                  </Link>
                                              </div>
                                          ))
                                        : '-'}
                                </td>
                                <td className='px-3 py-6 float-right'>
                                    {can(['edit_user', 'delete_user']) && (
                                        <PseudoActions id={row?.id} edit={() => handleClick(row)} mutate={mutate} />
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No pseudo found yet!' />
                    )}
                </tbody>
            </table>
            {data?.users?.length > 24 && (
                <div className='w-full'>
                    <Paginated pages={data?.pages ?? Math.ceil(data.total / 25)} setPage={setPage} page={page} />
                </div>
            )}
            {can('edit_user') && show && <PseudoForm show={show} setShow={setShow} mutate={mutate} pseudo={pseudo} />}
        </div>
    )
}

export default memo(Pseudos)
