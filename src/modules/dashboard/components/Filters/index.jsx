import { memo, useState } from 'react'
import { useFormik } from 'formik'
import SlidingPane from 'react-sliding-pane'

import { Input, Button } from '@components'

import { filtersSchema } from '@utils/schemas'
import { today } from '@constants/dashboard'
import { NavbarSearchIcon, ResetIcon, FilterIcon } from '@icons'
import 'react-sliding-pane/dist/react-sliding-pane.css'

const Filters = ({ filters, setFilters }) => {
    const [show, setShow] = useState(false)

    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: { from_date: filters.from_date, to_date: filters.to_date },
        validationSchema: filtersSchema,
        onSubmit: async formValues => {
            setFilters(formValues)
            setShow(false)
        },
    })

    const toggleFilters = () => setShow(true)
    const resetFilters = () => {
        setFilters({ from_date: '', to_date: '' })
        setShow(false)
    }

    return (
        <>
            <div className='grid grid-cols-2 gap-3 max-w-fit'>
                <div className='relative hidden md:block'>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                        {NavbarSearchIcon}
                    </div>
                    <form>
                        <Input name='bd' ph='Search' />
                    </form>
                </div>
                <div className='flex space-x-3'>
                    <Button label='Filter' fit icon={FilterIcon} onClick={toggleFilters} />
                    <Button fit icon={ResetIcon} onClick={resetFilters} />
                </div>
            </div>
            <SlidingPane isOpen={show} from='right' width='250px' onRequestClose={() => setShow(!show)} hideHeader>
                <div className='text-[#048C8C] p-3 h-full'>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-flow-row gap-2'>
                            <p className='font-medium text-xl'>Filters</p>
                            {/* <Input name='bd' ph='BD' /> */}
                            <span className='text-sm'>From</span>
                            <Input
                                name='from_date'
                                type='date'
                                value={values.from_date}
                                onChange={handleChange}
                                max={today}
                            />
                            <span className='text-sm'>To</span>
                            <Input
                                name='to_date'
                                type='date'
                                value={values.to_date || today}
                                onChange={handleChange}
                                max={today}
                            />
                            {errors.from_date && (
                                <small className='ml-2 text-sm text-red-400'>{errors.from_date}</small>
                            )}
                            {errors.to_date && <small className='ml-2 text-sm text-red-400'>{errors.to_date}</small>}
                            <Button label='Apply' type='submit' />
                        </div>
                    </form>
                </div>
            </SlidingPane>
        </>
    )
}

export default memo(Filters)
