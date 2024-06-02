import { memo } from 'react'

const LeadFilters = ({ selected = null }) => {
    console.log(selected)
    return <small>Filters here</small>
}

export default memo(LeadFilters)
