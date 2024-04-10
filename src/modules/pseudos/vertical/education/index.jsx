import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { ActionButtons, ExperienceActions, ExperienceForm } from '@modules/pseudos/components'
import { fetchExperiences } from '@modules/pseudos/api'

import { CreateIcon } from '@icons'

const Education = ({ id }) => {
    const [experience, setExperience] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/experience/?id=${id}`, fetchExperiences)

    const handleClick = values => {
        setExperience(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    const flag = data?.length > 0 && !error

    return (
        <div className='max-w-full overflow-x-auto mb-2 px-1'>
            <div className='flex items-center space-x-4 py-4'>
                <Button label='Add Experience' fit icon={CreateIcon} onClick={() => handleClick(null)} />
            </div>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                {flag ? (
                    data?.map((row, idx) => (
                        <div className='bg-white rounded-md p-4 border relative' key={idx}>
                            <h2 className='text-lg'>{row?.designation ?? 'Not Specified'}</h2>
                            <ExperienceActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            <div className='flex flex-col mt-2'>
                                <div className='ml-2 font-semibold'>{row?.company_name ?? 'Not Specified'}</div>
                                <div className='ml-2 text-sm italic'>
                                    From {row?.start_date ?? 'N/A'} To {row?.end_date ?? 'N/A'}
                                </div>
                                <div className='ml-2 mt-2 text-gray-600'>{row?.description ?? 'Not description'}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='ml-2 text-gray-500'>No education history found yet!</span>
                )}
            </div>
            <ActionButtons mutate={mutate} classes='mt-4 !w-1/3' />
            {show && <ExperienceForm show={show} setShow={setShow} mutate={mutate} experience={experience} id={id} />}
        </div>
    )
}

export default memo(Education)
