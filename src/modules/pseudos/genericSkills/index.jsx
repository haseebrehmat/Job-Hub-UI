import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import { Loading, Button, Searchbox, Paginated } from '@components'

import { SkillActions, SkillForm } from '@modules/pseudos/components'
import { fetchPseudos } from '@modules/pseudos/api'

import { CreateIcon, BackToIcon } from '@icons'

const GenericSkills = () => {
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [skill, setSkill] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/pseudo/?search=${query}`, fetchPseudos)

    const handleClick = values => {
        setSkill(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center py-6 justify-between'>
                <div className='flex space-x-4 items-center'>
                    <Searchbox query={query} setQuery={setQuery} />
                    <Button label='Create Generic Skill' fit icon={CreateIcon} onClick={() => handleClick()} />
                </div>
                <Link to='/pseudos'>
                    <Button label='Back to pseudos' icon={BackToIcon} />
                </Link>
            </div>
            <div className='border border-[#048C8C] p-4'>
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                    {data?.length > 0 && !error ? (
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
            </div>
            {data?.users?.length > 24 && (
                <div className='w-full'>
                    <Paginated pages={data?.pages ?? Math.ceil(data.total / 25)} setPage={setPage} page={page} />
                </div>
            )}
            {show && <SkillForm show={show} setShow={setShow} mutate={mutate} skill={skill} />}
        </div>
    )
}

export default memo(GenericSkills)
