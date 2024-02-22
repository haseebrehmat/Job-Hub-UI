import { memo, useState } from 'react'

import { Input } from '@components'

import { NavbarSearchIcon } from '@icons'

const Searchbox = ({ name = 'query', query, setQuery }) => {
    const [value, setValue] = useState(query)
    const handleChange = e => setValue(e.target.value)
    const handleClick = () => setQuery(value)

    return (
        <div className='relative hidden md:block'>
            <div
                className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'
                onClick={handleClick}
            >
                {NavbarSearchIcon}
            </div>
            <form>
                <Input name={name} ph='Search' value={value} onChange={handleChange} />
            </form>
        </div>
    )
}

export default memo(Searchbox)
