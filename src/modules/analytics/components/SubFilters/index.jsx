import { memo } from 'react'

import { Button } from '@components'

const SubFilters = ({ options = null, vals = null, set = null }) =>
    options && (
        <div className='flex mt-4 gap-3 border text-[#1E6570] p-4 flex-wrap'>
            {vals?.tab === 'quarterly'
                ? options?.months?.map(({ name, value }) => (
                      <Button
                          key={value}
                          label={name}
                          fit
                          classes='!rounded-full !px-2 !py-1'
                          onClick={() => set({ month: value })}
                          fill={vals.month === value}
                      />
                  ))
                : options?.weeks?.map(({ name, value }) => (
                      <Button
                          key={value}
                          label={name}
                          fit
                          classes='!rounded-full !px-2 !py-1'
                          onClick={() => set({ week: value })}
                          fill={vals.week === value}
                      />
                  ))}
        </div>
    )

export default memo(SubFilters)
