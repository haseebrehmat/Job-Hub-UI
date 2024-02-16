import React, { memo } from 'react'

const Button = memo(({ label, type = 'button', onClick = null, disabled = false, fit = false }) => (
    <button
        type={type}
        className={`w-${
            fit ? 'fit' : 'full'
        } text-[#048C8C] border border-cyan-600 font-medium rounded-lg text-sm px-5 py-2 text-center hover:text-white hover:bg-[#048C8C]`}
        onClick={onClick}
        disabled={disabled}
    >
        {label}
    </button>
))

export default Button
