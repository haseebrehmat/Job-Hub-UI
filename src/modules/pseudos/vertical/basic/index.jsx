import { memo, useState } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Input, Textarea, Loading } from '@components'

import { ActionButtons, Hobbies, RegionsDropdown } from '@modules/pseudos/components'
import { fetchBasicInfo, updateBasicInfo } from '@modules/pseudos/api'

import { verticalBasicInfoSchema } from '@utils/schemas'
import { BASIC_INFO_INPUTS } from '@constants/pseudos'

const Basic = ({ id }) => {
    const [hobbies, setHobbies] = useState([])
    const [regions, setRegions] = useState([])
    const { data, isLoading, mutate } = useSWR(`/api/profile/vertical/${id}/`, fetchBasicInfo)
    const { values, errors, handleSubmit, handleChange, trigger } = useMutate(
        `/api/profile/vertical/${id}/`,
        updateBasicInfo,
        {
            name: data?.name || '',
            email: data?.email || '',
            phone: data?.phone || '',
            designation: data?.designation || '',
            portfolio: data?.portfolio || '',
            address: data?.address || '',
            description: data?.description || '',
            summary: data?.summary || '',
            identity: data?.identity || '',
        },
        verticalBasicInfoSchema,
        async formValues => trigger({ ...formValues, vertical_id: id, hobbies, regions: regions.map(r => r.value) }),
        null,
        () => mutate()
    )

    if (isLoading) return <Loading />
    return (
        <div className='py-4 px-1'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-3'>
                    {BASIC_INFO_INPUTS.map(input => (
                        <div key={input.name}>
                            <span className='text-xs font-semibold'>
                                {input.label}
                                {input.required && '*'}
                            </span>
                            <Input
                                name={input.name}
                                type={input.type}
                                value={values[input.name]}
                                onChange={handleChange}
                                ph={input.ph}
                            />
                            {errors[input.name] && <small className='__error'>{errors[input.name]}</small>}
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-2 gap-5 pt-3'>
                    <div>
                        <span className='text-xs font-semibold'>Address</span>
                        <Textarea
                            rows={2}
                            name='address'
                            value={values.address}
                            onChange={handleChange}
                            ph='Enter vertical address'
                        />
                        {errors.address && <small className='__error'>{errors.address}</small>}
                    </div>
                    <div>
                        <span className='text-xs font-semibold'>Description</span>
                        <Textarea
                            rows={2}
                            name='description'
                            value={values.description}
                            onChange={handleChange}
                            ph='Enter vertical description'
                        />
                        {errors.description && <small className='__error'>{errors.description}</small>}
                    </div>
                </div>
                <div>
                    <span className='text-xs font-semibold'>Summary</span>
                    <Textarea
                        rows={5}
                        name='summary'
                        value={values.summary}
                        onChange={handleChange}
                        ph='Enter vertical summary'
                    />
                    {errors.summary && <small className='__error'>{errors.summary}</small>}
                </div>
                <div className='flex gap-4 items-center'>
                    <RegionsDropdown value={data?.regions} set={setRegions} />
                    <Hobbies hobbies={data?.hobbies} setHobbies={setHobbies} />
                </div>
                <ActionButtons form mutate={mutate} />
            </form>
        </div>
    )
}

export default memo(Basic)
