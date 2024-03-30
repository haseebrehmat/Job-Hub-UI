import { memo } from 'react'

import Template1 from './template1'
import Template2 from './template2'

const ResumeBuilder = () => {
    console.log('ResumeBuilder')

    return (
        <div className='flex flex-col'>
            <Template1 />
            <Template2 />
        </div>
    )
}

export default memo(ResumeBuilder)
