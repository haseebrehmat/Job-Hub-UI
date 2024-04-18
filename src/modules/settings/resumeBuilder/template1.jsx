import { memo } from 'react'

import { formatDate4 } from '@utils/helpers'
import { avatarPlaceholder } from '@constants/profile'

import { svgs } from './svgs'

const Template1 = ({ data: dev }) => (
    <div className='p-8 bg-white shadow-2xl border-2 rounded-lg md:w-[21cm] md:max-h-[29.7cm] w-full h-full'>
        <div className='flex items-center'>
            <img src={dev?.basic?.avatar ?? avatarPlaceholder} alt='Profile' className='w-28 h-w-28 rounded-full' />
            <div className='flex items-center justify-between w-full'>
                <div className='ml-4'>
                    <h2 className='text-xl font-bold'>{dev?.basic?.name ?? 'no name'}</h2>
                    <p className='text-gray-600'>{dev?.basic?.title ?? 'no title'}</p>
                </div>
                <div className='ml-4 text-end'>
                    <p className='text-sm py-0.5 text-gray-800'>{dev?.basic?.email ?? 'no email'}</p>
                    <p className='text-sm py-0.5 text-gray-800'>{dev?.basic?.phone ?? 'no phone'}</p>
                    <p className='text-sm py-0.5 text-gray-800'>{dev?.basic?.address ?? 'no address'}</p>
                </div>
            </div>
        </div>
        <hr className='my-6 border-2' />
        <div className='grid grid-cols-2'>
            <div>
                <h3 className='text-lg font-bold'>Summary</h3>
                <p className='text-gray-600 text-sm'>{dev?.summary ?? ''}</p>
            </div>
            <div className='ml-4'>
                <h3 className='text-lg font-bold mb-2'>Skills</h3>
                <div className='ml-4 space-y-1.5'>
                    {dev?.skills?.map(({ name, level }, index) => (
                        <div className='flex items-center justify-between' key={index}>
                            <span>{name}</span>
                            <div className='flex space-x-3'>
                                <span
                                    className={`w-5 h-5 rounded-full ${level >= 1 ? 'bg-blue-400' : 'bg-gray-400'}`}
                                />
                                <span
                                    className={`w-5 h-5 rounded-full ${level >= 2 ? 'bg-blue-400' : 'bg-gray-400'}`}
                                />
                                <span
                                    className={`w-5 h-5 rounded-full ${level >= 3 ? 'bg-blue-400' : 'bg-gray-400'}`}
                                />
                                <span
                                    className={`w-5 h-5 rounded-full ${level >= 4 ? 'bg-blue-400' : 'bg-gray-400'}`}
                                />
                                <span
                                    className={`w-5 h-5 rounded-full ${level >= 5 ? 'bg-blue-400' : 'bg-gray-400'}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <hr className='my-6 border-2' />
        <div className='grid grid-cols-2'>
            {dev?.experience?.length > 0 && (
                <div>
                    <h3 className='text-lg font-bold'>Experience</h3>
                    <div className='flex flex-col'>
                        {dev?.experience.map(({ company, title, from, to, description }, index) => (
                            <div className='ml-4 mt-4' key={index}>
                                <h4 className='text-md font-bold'>{title}</h4>
                                <p className='text-gray-600'>
                                    {company} ({formatDate4(from)} -- {formatDate4(to)})
                                </p>
                                <div className='ml-4'>{description ?? 'no description'}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {dev?.education?.length > 0 && (
                <div className='ml-4'>
                    <h3 className='text-lg font-bold'>Education</h3>
                    <div className='flex flex-col'>
                        {dev?.education.map(({ institute, degree, from, to, grade }, index) => (
                            <div className='ml-4 mt-4' key={index}>
                                <h4 className='text-md font-bold'>{degree}</h4>
                                <p className='text-gray-600'>
                                    {institute} ({formatDate4(from)} -- {formatDate4(to)})
                                </p>
                                <span>{grade}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
        <hr className='my-6 border-2' />
        <div className='grid grid-cols-2'>
            <div className='flex flex-col space-y-1'>
                {dev?.hobbies?.length > 0 && (
                    <div>
                        <h3 className='text-lg font-bold'>Hobbies</h3>
                        <div className='ml-4'>
                            {dev?.hobbies.map((name, index) => (
                                <div className='inline-block' key={index}>
                                    <span className='pr-2'>{name}</span>
                                    <span className='pr-2 text-gray-400 text-2xl'>
                                        {dev?.hobbies.length !== index + 1 && '|'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {Object.entries(dev?.links)?.length > 0 && (
                    <div>
                        <h3 className='text-lg font-bold mt-4 mb-3'>Social Links</h3>
                        <div className='ml-4'>
                            {Object.entries(dev?.links).map(([name, url], index) => (
                                <div className='inline-block mr-6 opacity-60' key={index}>
                                    <a href={url} target='_blank' className='w-10 h-10' rel='noreferrer'>
                                        {name in svgs ? svgs[name] : svgs.other}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className='ml-4'>
                {dev?.languages?.length > 0 && (
                    <div>
                        <h3 className='text-lg font-bold mb-2'>Languages</h3>
                        <div className='ml-4 space-y-2'>
                            {dev?.languages.map(({ name, level }, index) => (
                                <div className='flex items-center justify-between' key={index}>
                                    <span>{name}</span>
                                    <div className='flex space-x-3'>
                                        <span
                                            className={`w-5 h-5 rounded-full ${
                                                level >= 1 ? 'bg-blue-400' : 'bg-gray-400'
                                            }`}
                                        />
                                        <span
                                            className={`w-5 h-5 rounded-full ${
                                                level >= 2 ? 'bg-blue-400' : 'bg-gray-400'
                                            }`}
                                        />
                                        <span
                                            className={`w-5 h-5 rounded-full ${
                                                level >= 3 ? 'bg-blue-400' : 'bg-gray-400'
                                            }`}
                                        />
                                        <span
                                            className={`w-5 h-5 rounded-full ${
                                                level >= 4 ? 'bg-blue-400' : 'bg-gray-400'
                                            }`}
                                        />
                                        <span
                                            className={`w-5 h-5 rounded-full ${
                                                level >= 5 ? 'bg-blue-400' : 'bg-gray-400'
                                            }`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
)

export default memo(Template1)
