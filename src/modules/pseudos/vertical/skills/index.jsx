import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { ActionButtons, SkillActions, SkillForm } from '@modules/pseudos/components'
import { fetchSkills } from '@modules/pseudos/api'

import { CreateIcon } from '@icons'

const Skills = ({ id }) => {
    const [skill, setSkill] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/skill/?id=${id}`, fetchSkills)

    const handleClick = values => {
        setSkill(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    const flag = data?.length > 0 && !error

    return (
        <div className='max-w-full overflow-x-auto mb-2 px-1'>
            <div className='flex items-center space-x-4 py-4'>
                <Button label='Add Skll' fit icon={CreateIcon} onClick={() => handleClick(null)} />
            </div>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                {flag ? (
                    data?.map((row, idx) => (
                        <div className='bg-white rounded-md p-4 border relative' key={idx}>
                            <h2 className='text-lg'>{row?.name ?? 'Not Specified'}</h2>
                            <SkillActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            <div className='flex items-center mt-2'>
                                <div className='w-full bg-gray-200 rounded-lg overflow-hidden shadow-inner'>
                                    <div className='bg-[#4f9d9b] h-2' style={{ width: `${row.level * 20}%` }} />
                                </div>
                                <div className='ml-2'>{row?.level ?? 0}/5</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='ml-2 text-gray-500'>No skills found yet!</span>
                )}
            </div>
            <ActionButtons mutate={mutate} classes='mt-4 !w-1/3' />
            {show && <SkillForm show={show} setShow={setShow} mutate={mutate} skill={skill} id={id} />}
        </div>
    )
}

export default memo(Skills)
