import { memo } from 'react'

const Input = memo(
    ({ name, type = 'text', onChange = null, onBlur = null, value = undefined, ph = '', classes = null }) => (
        <div>
            <input
                type={type}
                name={name}
                className={`bg-gray-50 border border-cyan-600 text-gray-900 sm:text-sm rounded-lg focus:ring-[#048C8C] focus:border-[#048C8C] block w-full p-2.5 ${classes}`}
                placeholder={ph}
                required=''
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    )
)

export default Input
