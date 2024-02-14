import { memo, useState } from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

import { Input, Button } from '@components'
import { FilterIcon } from '@icons'

const Filters = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(true)
    const toggleFilters = () => setShow(true)

    return (
        <>
            <div className='grid grid-cols-2 gap-3 max-w-fit'>
                <Input name='bd' ph='BD' />
                <span className='flex gap-3'>
                    <Button label='Search' onClick={handleClick} fit />
                    <span
                        className='p-2 cursor-pointer max-w-fit border border-[#048C8C] rounded-lg'
                        onClick={toggleFilters}
                    >
                        {FilterIcon}
                    </span>
                </span>
            </div>
            <SlidingPane isOpen={show} from='right' width='250px' onRequestClose={() => setShow(!show)} hideHeader>
                <div className='text-[#048C8C] p-3 h-full'>
                    <div className='grid grid-flow-row gap-4'>
                        <p className='p-2 font-medium text-xl'>Filters</p>
                        <Input name='bd' ph='BD' />
                        <Input name='from' type='date' />
                        <Input name='to' type='date' />
                        <Button label='Apply' onClick={handleClick} />
                    </div>
                </div>
            </SlidingPane>
        </>
    )
}

export default memo(Filters)
