import { memo } from 'react'
import useSWRMutation from 'swr/mutation'

import { Button } from '@components'

import { syncNow } from '@modules/scrapper/api'

import { RunScrapperIcon } from '@icons'

const SyncNow = () => {
    const { trigger, isMutating } = useSWRMutation('/api/job_scraper/sync/', syncNow, {
        shouldRetryOnError: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    return (
        <Button
            label={isMutating ? 'Running....' : 'Run Scrapper Now'}
            fit
            icon={RunScrapperIcon}
            onClick={() => trigger()}
            disabled={isMutating}
        />
    )
}

export default memo(SyncNow)
