import { memo, useState } from 'react'

import { Button } from '@components'

import { DownloadIcon2 } from '@icons'

const ExportAll = () => {
    const [exporting, setExporting] = useState(false)

    return (
        <Button
            icon={DownloadIcon2}
            label={exporting ? 'Exporting...' : 'Export ALL'}
            loading={exporting}
            onClick={() => setExporting(true)}
            fit
        />
    )
}

export default memo(ExportAll)
