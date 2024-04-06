import { memo } from 'react'
import { useParams } from 'react-router-dom'

import { useMutate } from '@/hooks'

import { Button, Input, Textarea } from '@components'

import { saveCompany } from '@modules/userManagement/api'

import { companySchema } from '@utils/schemas'
import { BASIC_INFO_INPUTS } from '@constants/pseudos'

const Basic = () => {
    const { id } = useParams()
    const { values, handleSubmit, handleChange, resetForm, trigger } = useMutate(
        `/api/auth/company${id ? `/${id}/` : '/'}`,
        saveCompany,
        { name: name || '', status },
        companySchema,
        async formValues => trigger({ ...formValues, id }),
        null,
        () => {
            if (!id) resetForm()
        }
    )

    return (
        <div className='py-4 px-1'>
            <form action={handleSubmit}>
                <p className='text-lg mb-2 italic'>{id}</p>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-3'>
                    {BASIC_INFO_INPUTS.map(input => (
                        <div key={input.name}>
                            <span className='text-xs font-semibold'>{input.label}*</span>
                            <Input
                                name={input.name}
                                type={input.type}
                                value={values[input.name]}
                                onChange={handleChange}
                                ph={input.ph}
                            />
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-2 gap-5 pt-3'>
                    <div>
                        <span className='text-xs font-semibold'>Address*</span>
                        <Textarea
                            rows={2}
                            name='address'
                            value={values.address}
                            onChange={handleChange}
                            ph='Enter vertical description'
                        />
                    </div>
                    <div>
                        <span className='text-xs font-semibold'>Description*</span>
                        <Textarea
                            rows={2}
                            name='description'
                            value={values.description}
                            onChange={handleChange}
                            ph='Enter vertical description'
                        />
                    </div>
                </div>
                <div className='pb-3'>
                    <span className='text-xs font-semibold'>Summary*</span>
                    <Textarea
                        rows={5}
                        name='summary'
                        value={values.description}
                        onChange={handleChange}
                        ph='Enter vertical description'
                    />
                </div>
                <div className='w-fit'>
                    <Button label={id ? 'Update' : 'Submit'} type='submit' fill classes='px-10' />
                </div>
            </form>
        </div>
    )
}

export default memo(Basic)
