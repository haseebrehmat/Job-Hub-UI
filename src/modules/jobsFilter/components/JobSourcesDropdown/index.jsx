import { memo, useMemo } from 'react'

import { CustomSelector, Input } from '@components'

import { parseJobSource } from '@utils/helpers'
import { JOB_SOURCE_OPTIONS } from '@constants/scrapper'

const JobSourcesDropdown = ({ value, error, set, onChange }) => {
    const renderJobSourcesAndInput = useMemo(() =>
        value === 'other' ? (
            <Input name='job_source' onChange={onChange} ph='Please enter job source' />
        ) : (
            <CustomSelector
                options={JOB_SOURCE_OPTIONS}
                selectorValue={parseJobSource(value)}
                handleChange={e => set('job_source', e.value)}
                placeholder='Select job source'
            />
        )
    )

    return (
        <div className='z-30'>
            <span className='text-xs font-semibold'>Job Source*</span>
            {renderJobSourcesAndInput}
            {error && <small className='_error'>{error}</small>}
        </div>
    )
}

export default memo(JobSourcesDropdown)
