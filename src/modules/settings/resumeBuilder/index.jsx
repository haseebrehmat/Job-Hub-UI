import { memo } from 'react'

import Template1 from './template1'

const ResumeBuilder = () => {
    console.log('ResumeBuilder')

    return (
        <div className='flex flex-col'>
            <Template1 />
        </div>
    )
}

export default memo(ResumeBuilder)
