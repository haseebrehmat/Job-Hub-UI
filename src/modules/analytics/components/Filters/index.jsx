import { Button } from '@/components'
import { memo, useReducer } from 'react'

const Filters = () => {
    const [vals, dispatch] = useReducer((state, newState) => ({ ...state, ...newState }), {
        from: '',
        to: '',
    })

    return (
        <div className='border px-2 pt-10 pb-4 text-[#1E6570] mt-10 relative'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>Filteration</p>
            <div className='flex gap-4'>
                <span>Filter 1 {vals.from}</span>
                <span>Filter 2 {vals.to}</span>
            </div>
            <Button onClick={() => dispatch({ from: '', to: '' })} label='Apply' />
        </div>
    )
}

export default memo(Filters)
