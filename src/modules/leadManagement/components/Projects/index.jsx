import { memo } from 'react'
import useSWR from 'swr'
import { useMutate } from '@/hooks'

import { Loading, Input, Badge } from '@/components'
import { fetchMyProjects, saveCandidateProjects } from '@modules/leadManagement/api'

const Projects = ({ data }) => {
    const {
        data: projects,
        isLoading,
        mutate,
    } = useSWR(`api/candidate_management/candidate_projects/${data?.candidates?.id}/`, fetchMyProjects)

    const { values, errors, handleSubmit, handleChange, trigger } = useMutate(
        `/api/candidate_management/candidate_projects${data?.candidates?.id}`,
        saveCandidateProjects,
        {
            name: '',
            description: '',
            tags: [],
        },
        null,
        async formValues => trigger({ ...formValues, id: data?.candidates?.id }),
        null,
        () => mutate()
    )
    console.log(projects)
    if (isLoading) return <Loading />
    return (
        <div className='text-[#006366] '>
            <div className='flex flex-row justify-center'>
                <div className='border border-1 p-3 m-2 text-center h-fit bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%] z-10'>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-md font-semibold uppercase'>Projects</p>
                    </div>
                </div>
                <div className='flex flex-col w-full px-8 bg-white border py-8 rounded-3xl -ml-8'>
                    <div className='flex flex-col-1 gap-2 mb-4'>
                        <Input value={values.name} onChange={handleChange} ph='Add a Tool...' />
                        <Input value={values.description} onChange={handleChange} ph='Add desription...' />
                    </div>
                    {projects?.data.map((item, index) => (
                        <div key={index}>
                            <div className='flex flex-row mb-4 bg-slate-100 p-4 rounded-xl items-center'>
                                <div className='flex flex-col'>
                                    <div className='text-md uppercase font-bold'>{item.name}</div>
                                    <div className='text-sm'>{item.description}</div>
                                    <div className='mt-2 space-x-1 flex flex-row'>
                                        {item?.tags?.length > 0 &&
                                            item?.tags?.map(tag => (
                                                <Badge
                                                    label={
                                                        <span className='inline-block'>
                                                            <span>{tag}</span>
                                                        </span>
                                                    }
                                                    type='success'
                                                    classes='border border-green-300'
                                                    key={tag}
                                                />
                                            ))}
                                    </div>
                                </div>
                                <div className='right'>
                                    <button
                                        type='button'
                                        onClick={() => handleTagRemove(tag)}
                                        className='ml-2 focus:outline-none hover:text-red-700'
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default memo(Projects)
