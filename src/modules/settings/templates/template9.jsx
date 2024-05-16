import { memo } from 'react'

import { formatDate4 } from '@utils/helpers'

import { ResumeSvgs as svgs } from '@svgs'

const Template9 = ({ data: dev, hide, names }) => (
    <div className='p-8'>
        <div className='flex flex-row w-fit space-x-6'>
            <div className='flex flex-col mb-10'>
                {hide.name && dev?.basic?.name && (
                    <p className='text-indigo-900 text-5xl font-bold'>{dev?.basic?.name}</p>
                )}
                {hide.designation && dev?.basic?.designation && (
                    <p className='text-indigo-900 text-3xl font-medium '>{dev?.basic?.designation}</p>
                )}
                {hide.summary && dev?.summary?.length > 0 && (
                    <div className='flex items-baseline justify-start mt-2'>
                        <p className='text-gray-700 text-sm break-words'>{dev?.summary ?? 'no summary'}</p>
                    </div>
                )}
            </div>
        </div>
        <div className='flex flex-row w-fit space-x-6'>
            <div className='w-1/4'>
                <div className='mb-10'>
                    <div className='flex flex-row align-baseline gap-2'>
                        <p className='text-lg text-center mt-3 font-bold text-indigo-900'>Contact</p>
                    </div>
                    <hr className='mb-6 border-gray-300' />

                    {(hide.phone || hide.email || hide.address) && (
                        <div className='flex flex-col mt-6 space-y-4'>
                            {hide.phone && dev?.basic?.phone && (
                                <div className='flex flex-row space-x-2'>
                                    <p className='text-indigo-900 font-extrabold'>-</p>
                                    <p className='text-gray-800 text-sm '>{dev?.basic?.phone}</p>
                                </div>
                            )}
                            {hide.email && dev?.basic?.email && (
                                <div className='flex flex-row space-x-2'>
                                    <p className='text-indigo-900 font-extrabold'>-</p>
                                    <p className='text-gray-800 text-sm '>{dev?.basic?.email}</p>
                                </div>
                            )}
                            {hide.address && dev?.basic?.address && (
                                <div className='flex flex-row space-x-2'>
                                    <p className='text-indigo-900 font-extrabold'>-</p>
                                    <p className='text-gray-800 text-sm '>{dev?.basic?.address}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {hide.skill && dev?.skills?.all?.length > 0 && (
                    <div className='mb-10'>
                        <div className='flex flex-row align-baseline gap-2'>
                            <p className='text-lg text-center mt-3 font-bold text-indigo-900'>{names.skill}</p>
                        </div>
                        <hr className='mb-6 border-gray-300' />
                        <div className='flex flex-col'>
                            <div className='grid grid-col-1'>
                                <div className='flex flex-row text-sm'>
                                    <div className=''>
                                        {dev?.skills?.all.map(({ name }, index) => (
                                            <div className='inline-block' key={index}>
                                                <span className='pr-4 text-sm text-gray-800'>{name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='w-3/4 px-6'>
                {hide.experience && dev?.experience?.length > 0 && (
                    <div className='mb-10 '>
                        <div className='flex flex-row align-baseline gap-2'>
                            <p className='text-lg text-center mt-3 font-bold text-indigo-900'>{names.experience}</p>
                        </div>
                        <hr className='mb-6 border-gray-300' />
                        <div className='flex flex-col'>
                            <div className='grid grid-cols-1 gap-8'>
                                {dev?.experience.map(({ company, title, from, to, description }, index) => (
                                    <div className='flex flex-row text-sm' key={index}>
                                        <div className='w-[30%]'>
                                            <p className='text-gray-900 text-lg'>
                                                {formatDate4(from)} to {formatDate4(to)}
                                            </p>
                                        </div>
                                        <div className='w-[80%]'>
                                            <p className='font-bold text-lg'>{title}</p>
                                            <p className='italic'>{company}</p>
                                            <p className='text-gray-700 break-words'>
                                                {description ?? 'no description'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {hide.education && dev?.education?.length > 0 && (
                    <div className='mb-10'>
                        <div className='flex flex-row align-baseline gap-2'>
                            <p className='text-lg text-center mt-3 font-bold text-indigo-900'>{names.education}</p>
                        </div>
                        <hr className='mb-6 border-gray-300' />
                        <div className='flex flex-col'>
                            <div className='grid grid-col-1 gap-8'>
                                {dev?.education.map(({ degree, institute }, index) => (
                                    <div className='flex flex-row text-sm' key={index}>
                                        <div className='w-[30%]'>{}</div>
                                        <div className='w-[80%]'>
                                            <div className='flex flex-col'>
                                                <p className='font-bold text-xl'>{degree}</p>
                                                <p className='text-gray-700'>{institute}</p>
                                            </div>{' '}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
)

export default memo(Template9)
