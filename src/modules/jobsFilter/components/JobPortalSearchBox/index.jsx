import { memo } from 'react'

import { Input } from '@components'

const JobPortalSearchBox = ({ value, setQuery, handleEnter }) => {
    const handleChange = e => {
        setQuery(e.target.value)
    }

    return (
        <div className='relative hidden md:block'>
            <Input ph='Search' value={value} onChange={handleChange} onKeyDown={handleEnter} />
        </div>
    )
}

export default memo(JobPortalSearchBox)
