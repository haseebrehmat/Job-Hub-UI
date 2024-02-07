import { memo } from 'react'

import { Limits, Pagination } from '@components'

const TableNavigate = memo(({ data, handleClick }) => (
    <nav className='flex items-center justify-between p-4' aria-label='Table navigation'>
        <Limits total={data?.total} />
        <Pagination handleClick={handleClick} next={!data?.next} prev={!data?.prev} />
    </nav>
))

export default TableNavigate
