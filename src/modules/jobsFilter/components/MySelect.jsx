import React, { useState } from 'react'
import Select, { components } from 'react-select'
import './styles.css'

const VALUE_LIMIT = 2

const chipStyles = {
    fontSize: '14px',
    color: '#048C8C',
    boxShadow: '0 0 0 1px #048C8C',
    fontWeight: 'bold',
    background: '#EDFFFB',
    borderRadius: '2px',
    padding: '4px 8px',
    margin: '2px',
}

const MultiValue = props => {
    const { index, getValue } = props
    const hiddenLength = getValue().length - VALUE_LIMIT

    return index < VALUE_LIMIT ? (
        <components.MultiValue {...props} />
    ) : index === VALUE_LIMIT ? (
        <div style={chipStyles}>{`+${hiddenLength}`}</div>
    ) : null
}

export default function MySelect() {
    const [selectedOptions, setSelectedOptions] = useState()

    const optionList = [
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'blue', label: 'Blue' },
        { value: 'white', label: 'White' },
        { value: 'white1', label: 'White1' },
    ]

    const ClearIndicator = props => (
        <div {...props.innerProps}>
            <img width={32} height={32} src='./src/assets/svgs/re.svg' alt='Clear Indicator' />
        </div>
    )

    const styles = {
        control: (base, state) => ({
            ...base,
            borderRadius: 5,
            fontSize: 16,
            color: '#048C8C',
            borderColor: state.isFocused ? '#0EB3AD' : '#0EB3AD',
            boxShadow: state.isFocused ? '0 0 0 1px #048C8C' : '',
            '&:hover': {
                borderColor: '#048C8C',
            },
        }),
        placeholder: base => ({
            ...base,
            color: '#048C8C',
        }),
        option: (provided, state) => ({
            ...provided,
            marginBottom: 2.1,
            fontWeight: 'bold',
            borderRadius: 5,
            marginLeft:2.5,
            width: '98%',
            color: '#048C8C',
            borderColor: '#006366',
            boxShadow: state.isSelected ? '0 0 0 1px #0EB3AD' : '0 0 0 0.1px #006366',
            backgroundColor: state.isSelected ? '#EDFFFB' : 'white',
            '::after': {
                content: state.isSelected ? '"\u2713"' : '""',
                marginLeft:'80%',
                backgroundColor: 'transparent',
            },
        }),
        multiValue: (base, state) => ({
            ...base,
            fontSize: '16px',
            color: '#048C8C',
            boxShadow: '0 0 0 1px #048C8C',
            background: '#EDFFFB',
            borderRadius: '2px',
            padding: '1px 5px',
        }),
    }

    function handleSelect(data) {
        setSelectedOptions(data)
    }
    return (
        <div className='app'>
            <div className='dropdown-container'>
                <Select
                    components={{ ClearIndicator, MultiValue }}
                    options={optionList}
                    maxMenuHeight={200}
                    placeholder='Search Tech'
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable
                    isMulti
                    maxSelectedItems={1}
                    hideSelectedOptions={false}
                    styles={styles}
                    backgroundColor='transparent'
                />
            </div>
        </div>
    )
}
