import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { ActionButtons, ExperienceActions, ExperienceForm } from '@modules/pseudos/components'
import { fetchOthers } from '@modules/pseudos/api'

import { CreateIcon } from '@icons'

const Others = ({ id }) => {
    const [experience, setExperience] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/other_section/?id=${id}`, fetchOthers)

    const handleClick = values => {
        setExperience(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-2 px-1'>
            <div className='flex items-center space-x-4 py-4'>
                <Button label='Add Experience' fit icon={CreateIcon} onClick={() => handleClick(null)} />
            </div>
            <div className='grid grid-cols-1 space-y-2'>
                {data?.length > 0 && !error ? (
                    data?.map((row, idx) => (
                        <div className='bg-white rounded-md p-3 border border-cyan-600 relative' key={idx}>
                            <h2 className='text-lg'>{row?.name ?? 'No Name'}</h2>
                            <ExperienceActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            <div className='ml-2 mt-1 text-gray-600'>{row?.value ?? 'Not detail'}</div>
                        </div>
                    ))
                ) : (
                    <span className='ml-2 text-gray-500'>No other sections found yet!</span>
                )}
            </div>
            <ActionButtons mutate={mutate} classes='mt-4 !w-1/3' />
            {show && <ExperienceForm show={show} setShow={setShow} mutate={mutate} experience={experience} id={id} />}
        </div>
    )
}

export default memo(Others)
