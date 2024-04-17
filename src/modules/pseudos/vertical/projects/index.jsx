import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { ActionButtons, ProjectActions, ExperienceForm } from '@modules/pseudos/components'
import { fetchProjects } from '@modules/pseudos/api'

import { formatDate2 } from '@utils/helpers'

import { CreateIcon } from '@icons'

const Projects = ({ id }) => {
    const [experience, setExperience] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/experience/?id=${id}`, fetchProjects)

    const handleClick = values => {
        setExperience(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-2 px-1'>
            <div className='flex items-center space-x-4 py-4'>
                <Button label='Add Project' fit icon={CreateIcon} onClick={() => handleClick(null)} />
            </div>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                {data?.length > 0 && !error ? (
                    data?.map((row, idx) => (
                        <div className='bg-white rounded-md p-4 border relative' key={idx}>
                            <h2 className='text-lg'>{row?.designation ?? 'Not Specified'}</h2>
                            <ProjectActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            <div className='flex flex-col mt-2'>
                                <div className='ml-2 font-semibold'>{row?.company_name ?? 'Not Specified'}</div>
                                <div className='ml-2 text-sm italic'>
                                    From {formatDate2(row?.start_date) ?? 'N/A'} to{'  '}
                                    {formatDate2(row?.end_date) ?? 'N/A'}
                                </div>
                                <div className='ml-2 mt-2 text-gray-600'>{row?.description ?? 'Not description'}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='ml-2 text-gray-500'>No projects found yet!</span>
                )}
            </div>
            <ActionButtons mutate={mutate} classes='mt-4 !w-1/3' />
            {show && <ExperienceForm show={show} setShow={setShow} mutate={mutate} experience={experience} id={id} />}
        </div>
    )
}

export default memo(Projects)
