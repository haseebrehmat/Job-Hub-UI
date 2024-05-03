import { memo } from 'react'

import { formatDate4 } from '@utils/helpers'

const Template3 = ({ data: dev }) => (
    <>
        <div className='flex flex-col mb-2'>
            <p className='text-2xl text-center'>{dev?.basic?.name ?? 'no name'}</p>
            <p className='text-gray-500 text-md text-center'>{dev?.basic?.designation ?? 'no designation'}</p>
            <p className='text-gray-500 text-xs text-center -mt-2'>
                {dev?.basic?.phone ?? 'no phone'} <span className='font-bold text-lg mx-2'> . </span>
                {dev?.basic?.email ?? 'no email'} <span className='font-bold text-lg mx-2 '>.</span>
                {dev?.basic?.address ?? 'no address'}
            </p>
        </div>
        {dev?.summary?.length > 0 && (
            <div className='mb-10'>
                <p className=' text-lg text-center mb-3'>Summary</p>
                <div className='flex flex-col'>
                    <hr className='mb-3 border-black' />
                    <p className='text-gray-700 text-xs break-words'>{dev?.summary ?? 'no summary'}</p>
                </div>
            </div>
        )}
        {dev?.experience?.length > 0 && (
            <div className='mb-10'>
                <p className='text-lg text-center mb-3'>Professional Experience</p>
                <div className='flex flex-col'>
                    <hr className='mb-3  border-black' />
                    <div className='space-y-5'>
                        {dev?.experience.map(({ company, title, from, to, description }, index) => (
                            <div className='grid grid-cols-1 text-sm' key={index}>
                                <div className='flex flex-col'>
                                    <div className='flex justify-between text-sm'>
                                        <p className='text-gray-500 text-md'>{company}</p>
                                        <p className=' text-md'>location</p>
                                    </div>
                                    <div className='flex justify-between text-sm'>
                                        <p className=''>{title}</p>
                                        <p className='text-gray-500'>
                                            {formatDate4(from)} to {formatDate4(to)}
                                        </p>
                                    </div>

                                    <p className='text-gray-700 break-words text-xs'>
                                        {description ?? 'no description'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {dev?.projects?.length > 0 && (
            <div className='mb-10'>
                <p className='text-lg text-center mb-3'>Projects</p>
                <div className='flex flex-col '>
                    <hr className='mb-3 border-black' />
                    <div className='space-y-5'>
                        {dev?.projects?.map(({ name, title, repo, description }, index) => (
                            <div className='grid text-sm' key={index}>
                                <p className='font-bold'>{name}</p>
                                <p className='italic'>{title}</p>
                                <p className='text-gray-700 break-words text-xs'>{description ?? 'no description'}</p>
                                <p className='text-gray-500'>{repo ?? 'open source'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {dev?.skills?.length > 0 && (
            <div className='mb-10'>
                <p className='text-lg text-center mb-3'>Skills</p>
                <div className='flex flex-col'>
                    <hr className='mb-3 border-black' />
                    <div>
                        {dev?.skills.map(({ name }, index) => (
                            <div className='inline-block' key={index}>
                                <span className='pr-4 text-sm text-gray-800'>{name}</span>
                                <span className='pr-4 text-gray-600 text-sm'>
                                    {dev?.skills.length !== index + 1 && '|'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {dev?.education?.length > 0 && (
            <div className='mb-10'>
                <p className='text-lg text-center mb-3'>Education</p>
                <div className='flex flex-col'>
                    <hr className='mb-3 border-black' />
                    <div className='space-y-5'>
                        {dev?.education.map(({ degree, from, to, institute, grade }, index) => (
                            <div className='grid grid-cols-1 text-sm' key={index}>
                                <p className='text-lg text-gray-500'>{institute}</p>
                                <div className='flex justify-between text-sm'>
                                    <p className=''>{degree}</p>
                                    <p className='text-gray-500'>
                                        {formatDate4(from)} to {formatDate4(to)}
                                    </p>
                                </div>

                                <p className='text-gray-700'>Grade: {grade}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
)

export default memo(Template3)
