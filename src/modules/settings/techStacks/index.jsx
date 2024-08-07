import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Button, Searchbox, EmptyTable } from '@components'

import { TechForm, TrendsActions } from '@modules/settings/components'

import { fetchTechStacks } from '@modules/settings/api'

import { can } from '@utils/helpers'
import { TECH_STACKS_HEADS, TRENDS_ANALYTICS_INITIAL_STATE } from '@constants/settings'

import { CreateIcon } from '@icons'

const TechStacks = () => {
    const { data, error, isLoading, mutate } = useSWR('api/job_portal/trends_analytics/', fetchTechStacks)

    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), TRENDS_ANALYTICS_INITIAL_STATE)
    const handleClick = values => dispatch({ show: !vals.show, trend: values })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                {can('create_trend_analytics') && (
                    <Button label='Create Trends Analytics' fit icon={CreateIcon} onClick={() => handleClick(null)} />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {TECH_STACKS_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.length > 0 && !error ? (
                        data?.data?.map((row, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{row?.category}</td>
                                <td className='px-3 py-6'>{row?.tech_stacks}</td>
                                <td className='px-3 py-6 '>
                                    {true && <TrendsActions row={row.id} edit={handleClick} mutate={mutate} />}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No candidates found yet!' />
                    )}
                </tbody>
            </table>
            {can('create_region') && vals.show && (
                <TechForm
                    show={vals.show}
                    setShow={show => dispatch({ show })}
                    mutate={mutate}
                    trend_analytics={vals.trend}
                    tech_stacks_options={data.tech_stacks}
                />
            )}
        </div>
    )
}

export default memo(TechStacks)
