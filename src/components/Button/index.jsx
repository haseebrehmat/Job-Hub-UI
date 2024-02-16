import React, { memo } from 'react'

const Button = memo(({ label, type = 'button', onClick = null, disabled = false, fit = false, icon = null }) => (
    <button
        type={type}
        className={`w-${
            fit ? 'fit' : 'full'
        } text-[#048C8C] border border-cyan-600 font-medium rounded-lg text-sm px-2 py-2 text-center ${
            icon ? 'flex items-center justify-center' : 'hover:text-white hover:bg-[#048C8C]'
        }`}
        onClick={onClick}
        disabled={disabled}
    >
        {icon && <span className='mx-1'>{icon}</span>}
        {label}
    </button>
))

export default Button
