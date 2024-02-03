import React, { memo } from 'react'

const button = memo(({ label, type = 'button', onClick = null }) => (
    <button
        type={type}
        className='w-full text-[#048C8C] border border-cyan-600 font-medium rounded-lg text-sm px-5 py-2 text-center'
        onClick={onClick}
    >
        {label}
    </button>
))

export default button
