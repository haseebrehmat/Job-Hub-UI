import { memo, useState } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Button, CustomSelector } from '@components'

import { fetchCompanies } from '@modules/userManagement/api'
import { saveDesignation } from '@modules/leadManagement/api'

import { parseComapnies } from '@utils/helpers'

const ExposedForm = ({ mutate, candidates = [], dispatch = null }) => {
    const [selectedCompanies, setSelectedCompanies] = useState([])
    const { data, isLoading, error } = useSWR('/api/auth/company/', fetchCompanies)
    const { handleSubmit, trigger } = useMutate(
        `/api/candidate_management/designation/`,
        saveDesignation,
        { companies: selectedCompanies, candidates },
        null,
        async formValues => trigger({ ...formValues, companies: selectedCompanies.map(({ value }) => value) }),
        null,
        () => {
            mutate()
            dispatch({ ids: [] })
        }
    )

    return isLoading ? (
        <span>Loading Companies...</span>
    ) : error ? (
        <small>Failed to load companies</small>
    ) : (
        <form onSubmit={handleSubmit} className='grid grid-flow-col'>
            <div className='flex items-center gap-x-3'>
                <div className='w-full md:w-96'>
                    <CustomSelector
                        name='members'
                        options={parseComapnies(data?.companies)}
                        handleChange={obj => setSelectedCompanies(obj)}
                        selectorValue={selectedCompanies}
                        isMulti
                        placeholder='Select companies'
                    />
                </div>
                {selectedCompanies.length > 0 && candidates.length > 0 && (
                    <>
                        <Button label='Expose' type='submit' fill fit />
                        <Button label='Clear' fit onClick={() => dispatch({ ids: [] })} />
                    </>
                )}
            </div>
        </form>
    )
}

export default memo(ExposedForm)
