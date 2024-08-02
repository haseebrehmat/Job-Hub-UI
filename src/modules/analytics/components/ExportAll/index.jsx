import { memo, useState } from 'react'

import { Button } from '@components'

import { htmlToPng } from '@utils/helpers'
import { GRAPHS_DIVS_IDS } from '@constants/analytics'

import { DownloadIcon2 } from '@icons'

const ExportAll = () => {
    const [exporting, setExporting] = useState(false)

    const handleClick = async () => {
        setExporting(true)
        const exportDiv = document.getElementById('export-div')
        GRAPHS_DIVS_IDS.forEach(id => {
            const div = document.getElementById(id)
            exportDiv.appendChild(div.cloneNode(true))
        })
        await htmlToPng(exportDiv, { name: 'single_export' })
        setExporting(false)
        exportDiv.innerHTML = ''
    }

    return (
        <Button
            icon={DownloadIcon2}
            label={exporting ? 'Exporting...' : 'Export ALL'}
            loading={exporting}
            onClick={handleClick}
            classes='!pl-2 !pr-3 whitespace-nowrap !rounded-full'
            disabled={exporting}
        />
    )
}

export default memo(ExportAll)
