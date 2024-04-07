import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { ActionButtons, SkillActions, SkillForm } from '@modules/pseudos/components'
import { fetchSkills } from '@modules/pseudos/api'

import { CreateIcon } from '@icons'

const Experiences = ({ id }) => {
    const [skill, setSkill] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/experience/?id=${id}`, fetchSkills)

    const handleClick = values => {
        setSkill(values)
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
                            <SkillActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
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
                    <span className='ml-2 text-gray-500'>No experiences found yet!</span>
                )}
            </div>
            <ActionButtons mutate={mutate} classes='mt-4 !w-1/3' />
            {show && <SkillForm show={show} setShow={setShow} mutate={mutate} skill={skill} id={id} />}
        </div>
    )
}

export default memo(Experiences)
