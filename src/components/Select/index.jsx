import { memo } from 'react'
import Select from 'react-select'

const customStyles = {
    control: provided => ({
        ...provided,
        border: '1px solid #048C8C',
        boxShadow: '0 0 0 1px #048C8C',
        '&:hover': {
            border: '1px solid #048C8C',
        },
    }),
}

const SelectBox = memo(({ options, selected = '', handleChange }) => (
    <Select options={options} styles={customStyles} defaultValue={selected} onChange={value => handleChange(value)} />
))

export default SelectBox
