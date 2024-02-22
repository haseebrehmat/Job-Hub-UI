import Select from 'react-select'

export const MySelect = () => {
    const colourOptions = [
        {
            value: 'ocean1',
            label: (
                <label>
                    <input type='checkbox' className='text-cyan-400' /> Ocean
                </label>
            ),
        },
        { value: 'blue', label: 'Blue' },
        { value: 'purple', label: 'Purple' },
        { value: 'red', label: 'Red' },
        { value: 'orange', label: 'Orange' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'green', label: 'Green' },
        { value: 'forest', label: 'Forest' },
        { value: 'slate', label: 'Slate' },
        { value: 'silver', label: 'Silver' },
    ]
    return (
        <Select
            options={colourOptions}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            // onChange={this.handleChange}
            allowSelectAll
            // value={this.state.optionSelected}
        />
    )
}
