import { useState, memo } from 'react'
import useSWR from 'swr'

import CustomSelector from '@components/CustomSelector'
import { Button, Drawer } from '@components'

import { parseComapnies } from '@utils/helpers'
import { fetchCompanies } from '@/modules/userManagement/api'

const FilterForm = ({ show, setShow, filters, setfilters }) => {
    const [values, setValues] = useState(filters)
    const { data, isLoading, error: companyError } = useSWR('/api/auth/company/', fetchCompanies)

    const handleChange = (type, obj) => setValues(preFilters => ({ ...preFilters, [type]: obj }))
    const [dates, setDates] = useState({ from_date: '', to_date: '' })

    const handleSubmit = () => {
        setfilters(values)
        setShow(!show)
    }

    // const renderCompanies = isLoading ? (
    //     <div>Loading companies....</div>
    // ) : companyError ? (
    //     <div className='text-red-500 text-xs'>Failed to fetch companies</div>
    // ) : (
    //     <CustomSelector
    //         options={parseComapnies(data?.companies)}
    //         handleChange={obj => handleChange('companies', obj)}
    //         selectorValue={values?.companies}
    //         isMulti
    //         placeholder='Company'
    //     />
    // )

    return (
        <Drawer show={show} setShow={setShow} w='420px'>
            <div className='grid grid-flow-row gap-2'>
                <p className='font-medium text-xl'>Filters</p>
                <hr className='mb-2' />
                <div className='mx-6 flex grid-flow-row space-x-36 '>
                    {' '}
                        <p>From</p>
                        <p>To</p>
                </div>
                <div className='mx-6 flex grid-flow-row space-x-4 '>
                    <input
                        className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                        type='date'
                        max={new Date().toISOString().slice(0, 10)}
                        value={dates.from_date}
                        onChange={event => setDates({ ...dates, from_date: event.target.value })}
                    />

                    <input
                        className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                        type='date'
                        max={new Date().toISOString().slice(0, 10)}
                        value={dates.to_date}
                        onChange={event => setDates({ ...dates, to_date: event.target.value })}
                    />
                </div>
                <span className='text-xs font-semibold'>Select Company*</span>
                {/* {renderCompanies} */}
                <span className='text-xs font-semibold'>Select Integration*</span>
                {/* <CustomSelector
                    options={integrationNames}
                    handleChange={obj => handleChange('integrations', obj)}
                    selectorValue={values.integrations}
                    isMulti
                    placeholder='Integration'
                /> */}
                <div className='pt-4 space-y-2'>
                    <Button label='Search' fill onClick={handleSubmit} />
                    <Button label='Cancel' onClick={() => setShow(false)} />
                </div>
            </div>
        </Drawer>
    )
}

export default memo(FilterForm)
