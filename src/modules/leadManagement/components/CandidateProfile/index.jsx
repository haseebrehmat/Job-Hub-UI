import { memo, useState } from 'react'

import { Badge } from '@components'

import { CandidateForm } from '@modules/leadManagement/components'
import { ResumeSvgs as svgs } from '@svgs'
import { can } from '@utils/helpers'

const CandidtaeProfile = ({ data, mutate }) => {
    const [show, setShow] = useState(false)
    return (
        <div className='p-6'>
            {console.log(data)}
            <div className='flex flex-col border rounded-lg overflow-hidden bg-white text-[#006366]'>
                <div className='grid grid-cols-1 sm:grid-cols-4'>
                    <div className='flex flex-col col-span-3'>
                        <div className='flex flex-cols-2 p-6'>
                            <div className='flex-shrink-0 w-fit mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0 shadow-xl'>
                                <img
                                    src='https://source.unsplash.com/100x100/?portrait?1'
                                    alt=''
                                    className='object-cover object-center w-full h-full rounded dark:bg-gray-500'
                                />
                            </div>
                            <div className='px-4 py-2'>
                                <div className='flex flex-row'>
                                    <p className='flex items-center'>
                                        <span className='font-semibold mr-3 text-lg uppercase'>name :</span>
                                        <span className='text-gray-800 text-md'>{data?.candidates?.name}</span>
                                    </p>
                                </div>
                                <div className='flex flex-row'>
                                    <p className='flex items-center'>
                                        <span className='font-semibold mr-3 text-lg uppercase'>Designation :</span>
                                        <span className='text-gray-800 text-md'>{data?.candidates?.designation}</span>
                                    </p>
                                </div>
                                <div className='flex flex-row'>
                                    <p className='flex items-center'>
                                        <span className='font-semibold mr-3 text-lg uppercase'>Company :</span>
                                        <span className='text-gray-800 text-md'>{data?.candidates?.company?.name}</span>
                                    </p>
                                </div>
                                <div className='flex flex-row'>
                                    <p className='flex items-center'>
                                        <span className='font-semibold mr-2 text-lg uppercase'>Experience :</span>
                                        <span className='text-gray-800 text-md'>
                                            {data?.candidates?.experience} Years
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-full relative'>
                            <div className='grid grid-cols-3 border divide-x bg-gray-100  py-3'>
                                <div className='text-xs flex flex-row items-center justify-center underline-offset-4 underline'>
                                    <span className='fill-teal-700 mr-3'>{svgs.gmail4}</span>
                                    {data?.candidates?.email}
                                </div>
                                <div className='uppercase text-sm flex flex-row items-center justify-center'>
                                    <span className='fill-teal-700 mr-3'>{svgs.phone4}</span>
                                    {data?.candidates?.phone}
                                </div>
                                <div
                                    className='uppercase text-sm flex flex-row items-center justify-center font-semibold hover:cursor-pointer hover:underline underline-offset-4'
                                    onClick={() => setShow(true)}
                                >
                                    <div className='mr-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='20px'
                                            viewBox='0 0 24 24'
                                            width='20px'
                                            fill='#006366'
                                        >
                                            <path d='M0 0h24v24H0z' fill='none' />
                                            <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' />
                                        </svg>
                                    </div>
                                    Edit
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col border-l  sm:h-full'>
                        <span className='font-semibold  text-xl uppercase mt-4 ml-4 '>Skills</span>
                        <div className='grid grid-rows-3 grid-flow-col gap-1 mt-3 px-4'>
                            {data?.candidates?.skills?.map((skill, idxx) => (
                                <div className='gap-2' key={idxx}>
                                    <Badge label={skill} type='success' />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {can('edit_candidate_profile') && show && (
                <CandidateForm show={show} setShow={setShow} mutate={mutate} candidate={data.candidates} />
            )}
        </div>
    )
}
export default memo(CandidtaeProfile)
