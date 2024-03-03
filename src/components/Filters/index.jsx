import { memo } from 'react'

import { Button } from '@components'

import { ResetIcon, FilterIcon } from '@icons'

const Filters = ({ apply = null, clear = null }) => (
    <div className='flex space-x-4 h-fit'>
        <Button label='Filter' fit icon={FilterIcon} onClick={apply} />
        <Button fit icon={ResetIcon} onClick={clear} />
    </div>
)

export default memo(Filters)
