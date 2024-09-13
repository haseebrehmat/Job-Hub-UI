import { memo } from 'react'
import { Tooltip } from 'react-tooltip'

import { useJobPortalV2Store } from '@/stores'

import { Button } from '@components'

import { isset } from '@utils/helpers'

import { PaginateNext, PaginatePrev } from '@icons'

const NextAndPrev = () => {
    const [pagination, next, previous] = useJobPortalV2Store(state => [state?.pagination, state?.next, state?.previous])

    return (
        <div className='flex items-center gap-1 w-fit'>
            <Button
                icon={PaginatePrev}
                fit
                disabled={!isset(pagination?.previous)}
                classes={`page-previous !py-[8px] !m-0 !flex !items-center ${
                    isset(pagination?.previous) ? '' : 'bg-gray-300 cursor-not-allowed'
                }`}
                onClick={() => previous()}
            />
            <Tooltip anchorSelect='.page-previous' content='Previous' />
            <Button
                icon={PaginateNext}
                fit
                disabled={!isset(pagination?.next)}
                classes={`page-next !py-[8px] !m-0 !flex !items-center ${
                    isset(pagination?.next) ? '' : 'bg-gray-300 cursor-not-allowed'
                }`}
                onClick={() => next()}
            />
            <Tooltip anchorSelect='.page-next' content='Next' />
        </div>
    )
}

export default memo(NextAndPrev)
