import Multiselect from '@khanacademy/react-multi-select'
import { useState } from 'react'

export const MySelect = ({ options, handleChange }) => {
    const [selected, setSelected] = useState([])
    const handleSelectedChanged = option => {
        handleChange(option)
        setSelected(option)
    }
    return (
        <Multiselect
            options={options}
            onSelectedChanged={handleSelectedChanged}
            selected={selected}
            overrideStrings={{
                selectSomeItems: 'Select Tech Stacks',
                allItemsAreSelected: 'All items selected',
                selectAll: 'Select all',
                search: 'Search',
            }}
        />
    )
}
