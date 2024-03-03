const Selector = props => {
    const { data, selectorValue, handleSelectChange } = props
    const countData = data.slice(0, 10)
    return (
        <select
            className='bg-gray-50 text-gray-900 text-sm focus:[#048C8C]-500 focus:border-[#048C8C]-500 block w-full p-2.5 rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer'
            value={selectorValue}
            onChange={handleSelectChange}
        >
            <option value='all'>All</option>
            {countData.length > 0 &&
                countData.map((item, key) => {
                    const { name, value } = item
                    return (
                        <option key={key} value={name}>
                            {name} ({value})
                        </option>
                    )
                })}
        </select>
    )
}

export default Selector
