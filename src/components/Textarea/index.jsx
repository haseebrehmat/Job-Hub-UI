import { memo } from 'react'

const Textarea = memo(({ name, onChange = null, value, ph = '', classes = null, rows = 4 }) => (
    <textarea
        className={`w-full text-sm border border-cyan-600 outline-none p-2 rounded-lg text-gray-500 ${classes}`}
        name={name}
        onChange={onChange}
        placeholder={ph}
        defaultValue={value}
        rows={rows}
    />
))

export default Textarea
