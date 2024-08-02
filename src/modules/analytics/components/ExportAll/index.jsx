import { memo, useState } from 'react'

import { Button } from '@components'

import { htmlToPng } from '@utils/helpers'

import { DownloadIcon2 } from '@icons'

const ExportAll = () => {
    const [exporting, setExporting] = useState(false)
    const handleClick = () => {
        setExporting(true)
        const jobTypeCountDiv = document.getElementById('job-type-counts')
        htmlToPng(jobTypeCountDiv, { name: 'job-type-counts' })
        setExporting(false)
    }

    return (
        <Button
            icon={DownloadIcon2}
            label={exporting ? 'Exporting...' : 'Export ALL'}
            loading={exporting}
            onClick={handleClick}
            classes='!pl-2 !pr-3 whitespace-nowrap !rounded-full'
        />
    )
}

export default memo(ExportAll)
