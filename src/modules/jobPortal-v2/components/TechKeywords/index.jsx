import { memo } from 'react'

import { Button } from '@components'

import { TechSTack } from '@icons'

const TechKeywords = ({ keywords }) =>
    keywords ? (
        <Button
            label={`Stacks: ${Array.from({ length: 5 }, () => ` ${keywords}`)}`}
            icon={TechSTack}
            fit
            classes='!rounded-full !py-0.5 !pr-2.5 !gap-0.5 !text-neutral-600 tracking-wider !text-xs !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize'
        />
    ) : null

export default memo(TechKeywords)
