import { memo } from 'react'

import { Button } from '@components'

import { ResetIcon } from '@icons'
import { Filters as FilterSvg } from '@svgs'

const Filters = ({ apply = null, clear = null }) => (
    <div className='flex space-x-4 h-fit'>
        <Button label='Filter' fit svg={FilterSvg} onClick={apply} />
        <Button fit icon={ResetIcon} onClick={clear} />
    </div>
)

export default memo(Filters)
