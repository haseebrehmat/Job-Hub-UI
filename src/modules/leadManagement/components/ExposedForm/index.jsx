import { memo } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Button, CustomSelector } from '@components'

import { fetchCompanies } from '@modules/userManagement/api'
import { saveDesignation } from '@modules/leadManagement/api'

import { designationSchema } from '@utils/schemas'
import { parseComapnies } from '@utils/helpers'

const ExposedForm = ({ mutate, candidates = [], dispatch = null }) => {
    const { data, isLoading, error } = useSWR('/api/auth/company/', fetchCompanies)

    const { values, errors, handleSubmit, trigger, setFieldValue } = useMutate(
        `/api/candidate_management/designation/`,
        saveDesignation,
        { companies: [], candidates },
        designationSchema,
        async formValues => trigger({ ...formValues }),
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
                        handleChange={obj => setFieldValue('companies', obj)}
                        selectorValue={values.companies}
                        isMulti
                        placeholder='Select companies'
                    />
                    {errors.companies && <small className='__error'>{errors.companies}</small>}
                </div>
                {values.companies.length > 0 && candidates.length > 0 && (
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
