import { memo } from 'react'

import { devProfile as dev } from './devProfile'
import { svgs } from './svgs'

const Template2 = () => (
    <div className='flex flex-col items-center'>
        <p className='my-2 border-2 py-2 px-4 bg-white'>Template 2</p>
        <div className='p-12 bg-white shadow-2xl border-2 rounded-lg w-[24cm] min-h-[29.7cm]'>
            <div className='flex flex-col mb-5'>
                <p className='text-blue-900 text-6xl font-bold'>{dev.basic.name}</p>
                <p className='text-gray-500 text-3xl font-bold mt-2'>{dev.basic.title}</p>
            </div>
            <div className='flex items-baseline justify-start mb-3 mt-10'>
                <p className='text-blue-900 text-xl font-bold w-1/4'>Summary</p>
                <div className='flex flex-col w-3/4'>
                    <hr className='mb-3 border border-blue-900' />
                    <p className='text-gray-700 text-sm'>{dev.summary}</p>
                </div>
            </div>
            <div className='flex items-baseline justify-start my-3'>
                <p className='text-blue-900 text-xl font-bold w-1/4'>Experience</p>
                <div className='flex flex-col w-3/4'>
                    <hr className='mb-3 border border-blue-900' />
                    <div className='space-y-5'>
                        {dev.experience.map(({ company, title, from, to, description }, index) => (
                            <div className='grid grid-cols-2 text-sm' key={index}>
                                <div className='flex flex-col'>
                                    <p className='text-blue-900 font-bold'>{title}</p>
                                    <p className='italic'>{company}</p>
                                    <p className='text-gray-500'>
                                        {from} to {to}
                                    </p>
                                </div>
                                <p className='text-gray-700'>{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex items-baseline justify-start my-3'>
                <p className='text-blue-900 text-xl font-bold w-1/4'>Education</p>
                <div className='flex flex-col w-3/4'>
                    <hr className='mb-3 border border-blue-900' />
                    <div className='space-y-5'>
                        {dev.education.map(({ degree, from, to, institute, grade }, index) => (
                            <div className='grid grid-cols-2 text-sm' key={index}>
                                <div className='flex flex-col'>
                                    <p className='text-blue-900 font-bold'>{institute}</p>
                                    <p className='text-gray-500'>
                                        {from} to {to}
                                    </p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-blue-900 font-bold'>{degree}</p>
                                    <p className='text-gray-700'>{grade}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex items-baseline justify-start my-3'>
                <p className='text-blue-900 text-xl font-bold w-1/4'>Skills</p>
                <div className='flex flex-col w-3/4'>
                    <hr className='mb-3 border border-blue-900' />
                    <div>
                        {dev.skills.map(({ name }, index) => (
                            <div className='inline-block' key={index}>
                                <span className='pr-4'>{name}</span>
                                <span className='pr-4 text-gray-400 text-lg'>
                                    {dev.skills.length !== index + 1 && '|'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex items-baseline justify-start my-3'>
                <p className='text-blue-900 text-xl font-bold w-1/4'>Contact</p>
                <div className='flex flex-col w-3/4'>
                    <hr className='mb-3 border border-blue-900' />
                    <div className='grid grid-cols-2 mb-3 text-sm'>
                        <div className='flex gap-4 my-3'>
                            <span>{svgs.phone}</span>
                            <p className='text-gray-700'>{dev.basic.phone}</p>
                        </div>
                        <div className='flex gap-4 my-3'>
                            <span>{svgs.portfolio}</span>
                            <p className='text-gray-700'>{dev.basic.portfolio}</p>
                        </div>
                        <div className='flex gap-4 my-3'>
                            <span>{svgs.gmail}</span>
                            <p className='text-gray-700'>{dev.basic.email}</p>
                        </div>
                        <div className='flex gap-4 my-3'>
                            <span>{svgs.address}</span>
                            <p className='text-gray-700'>{dev.basic.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default memo(Template2)
