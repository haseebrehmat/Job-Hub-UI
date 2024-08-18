import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { CustomSelector, Button, Input } from '@components'

import { fetchStatusPhases } from '@modules/appliedJobs/api'

import { parseSelectedStatus, parseStatuses, parseStatusPhases, parseSelectedStatusPhase, isset } from '@utils/helpers'
import { NOTE_FILTERS_INITIAL } from '@constants/leadManagement'

const LeadNoteSearch = ({ dispatch = null }) => {
    const { data, isLoading, error } = useSWR('/api/lead_managament/company_status_phases/', fetchStatusPhases)

    const [filter, setFilter] = useReducer((prev, next) => ({ ...prev, ...next }), NOTE_FILTERS_INITIAL)

    const clearFilters = () => dispatch(NOTE_FILTERS_INITIAL) && setFilter(NOTE_FILTERS_INITIAL)
    const applyFilters = () => dispatch({ status: filter.status, phase: filter.phase, query: filter.query })

    return (
        <div className='border pt-6 text-[#1E6570] mt-4 relative border-cyan-200 rounded-lg'>
            <p className='-mt-10 absolute px-3 mx-3 border bg-[#EDFDFB] tracking-widest border-cyan-200'>Filters</p>
            <div className='px-2 md:px-4'>
                <div className='flex items-center pb-4'>
                    <div className='flex gap-2.5 items-center w-full'>
                        <div className='w-1/5'>
                            <Input
                                value={filter.query}
                                onChange={e => setFilter({ query: e.target.value })}
                                ph='Enter keywords'
                            />
                        </div>
                        {isLoading ? (
                            <span>Loading...</span>
                        ) : error ? (
                            <span>Error to Load statuses</span>
                        ) : (
                            <>
                                <div className='w-1/4'>
                                    <CustomSelector
                                        options={parseStatuses(data)}
                                        handleChange={({ value }) => setFilter({ status: value, phase: '' })}
                                        selectorValue={parseSelectedStatus(filter.status, data)}
                                        placeholder='Select Status'
                                    />
                                </div>
                                {filter.status && (
                                    <div className='w-1/4'>
                                        <CustomSelector
                                            options={parseStatusPhases(filter.status, data)}
                                            handleChange={({ value }) => setFilter({ phase: value })}
                                            selectorValue={parseSelectedStatusPhase(filter.phase, filter.status, data)}
                                            placeholder='Select Phase'
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {dispatch && (
                        <>
                            {(isset(filter.status) || isset(filter.phase) || isset(filter.query)) && (
                                <Button label='Apply' fit classes='!py-1 px-3' onClick={applyFilters} />
                            )}
                            <Button label='Clear' fit classes='!py-1 ml-1.5' onClick={clearFilters} />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(LeadNoteSearch)
