import { memo } from 'react'
import { useLocation } from 'react-router-dom'

import { Badge } from '@components'

import { JobSource, TechSTack, JobIcon, CompanyIcon } from '@icons'

import { formatDate } from '@/utils/helpers'

const JobDetail = () => {
    const location = useLocation()
    let values = ''
    if (location.state) {
        values = location.state.data
        console.log(values)
    }
    return (
        <div className='px-6'>
            <div className='flex flex-col border rounded-lg overflow-hidden bg-white text-[#006366]'>
                <div className='grid grid-cols-1 sm:grid-cols-4'>
                    <div className='flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center'>
                        <p className='text-7xl font-bold text-[#006366] rounded-full'>{JobIcon}</p>
                    </div>
                    <div className='flex flex-col sm:border-l col-span-3'>
                        <div className='flex flex-col space-y-4  p-6 '>
                            <div className='flex flex-row text-sm'>
                                <span className='mr-3'>{JobIcon}</span>
                                <p className='flex items-center  text-gray-500'>
                                    <span className='font-semibold mr-2 text-xs uppercase'>Title:</span>
                                    <span>Jane Doe</span>
                                </p>
                            </div>

                            <div className='flex flex-row text-sm'>
                                <span className='mr-3'>{CompanyIcon}</span>
                                <p className='flex items-center  text-gray-500'>
                                    <span className='font-semibold mr-2 text-xs uppercase'>Company:</span>
                                    <span>Cooking, Fishing, Darwing</span>
                                </p>
                            </div>

                            <div className='flex flex-row text-sm'>
                                <span className='mr-3'>{TechSTack}</span>
                                <p className='flex items-center  text-gray-500'>
                                    <span className='font-semibold mr-2 text-xs uppercase'>Date of birth:</span>
                                    <span>26 April 2022</span>
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col w-full relative bottom-0'>
                            <div className='grid grid-cols-3 border-t divide-x text-[#0ed3cf]  bg-gray-50 dark:bg-transparent py-3'>
                                <a className=' cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold'>
                                    <div className='mr-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='20px'
                                            viewBox='0 0 24 24'
                                            width='20px'
                                            fill='#0ed3cf'
                                        >
                                            <path d='M0 0h24v24H0z' fill='none' />
                                            <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
                                        </svg>
                                    </div>
                                    Update
                                </a>
                                <a className='cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold'>
                                    <div className='mr-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='20px'
                                            viewBox='0 0 24 24'
                                            width='20px'
                                            fill='#0ed3cf'
                                        >
                                            <path d='M0 0h24v24H0V0z' fill='none' />
                                            <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z' />
                                        </svg>
                                    </div>
                                    Remove
                                </a>
                                <a className='cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold'>
                                    <div className='mr-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='20px'
                                            viewBox='0 0 24 24'
                                            width='20px'
                                            fill='#0ed3cf'
                                        >
                                            <path d='M0 0h24v24H0z' fill='none' />
                                            <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' />
                                        </svg>
                                    </div>
                                    View
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col border rounded-lg overflow-hidden bg-white my-2 '>
                <div className='grid grid-cols-1'>
                    <div className='flex flex-col'>
                        <div className='flex flex-col space-y-4  p-6 text-gray-600'>
                            <div className='flex flex-row text-sm'>
                                <p className='flex items-center text-gray-500'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic
                                    typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                                    the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                                    with desktop publishing software like Aldus PageMaker including versions of Lorem
                                    Ipsum.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col w-full relative bottom-0'>
                            <div className='grid grid-cols-3 border-t divide-x text-gray-500  bg-gray-50 dark:bg-transparent py-3'>
                                <a className=' cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold'>
                                    <div className='mr-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='20px'
                                            viewBox='0 0 24 24'
                                            width='20px'
                                            fill='#64748b'
                                        >
                                            <path d='M0 0h24v24H0z' fill='none' />
                                            <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
                                        </svg>
                                    </div>
                                    Update
                                </a>
                                <a className='cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold'>
                                    <div className='mr-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='20px'
                                            viewBox='0 0 24 24'
                                            width='20px'
                                            fill='#64748b'
                                        >
                                            <path d='M0 0h24v24H0V0z' fill='none' />
                                            <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z' />
                                        </svg>
                                    </div>
                                    Remove
                                </a>
                                <a className='cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold'>
                                    <div className='mr-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='20px'
                                            viewBox='0 0 24 24'
                                            width='20px'
                                            fill='#64748b'
                                        >
                                            <path d='M0 0h24v24H0z' fill='none' />
                                            <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' />
                                        </svg>
                                    </div>
                                    View
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div className='p-6 px-10 '>
        //     <div className='flex mt-4 text-[#006366]'>
        //         {JobIcon}
        //         <div className='flex flex-col '>
        //             <div className='text-3xl  font-semibold  text-[#006366] flex items-baseline'>
        //                 {values?.company_name}
        //                 <span className='text-sm  text-gray-500 mx-2'>
        //                     {values?.block ? '( recruiter )' : '( non-recruiter )'}
        //                 </span>
        //             </div>

        //             <p className='text-xs mt-1 text-gray-500'>{formatDate(values?.job_posted_date)}</p>
        //         </div>
        //     </div>

        //     <div className='flex gap-6 ml-1 mt-2 mb-4'>
        //         <div className='flex gap-2'>
        //             {JobSource}{' '}
        //             <p className='text-base text-gray-600 '>
        //                 {' '}
        //                 <Badge label={values?.job_source} />
        //             </p>
        //         </div>
        //         <div className='flex gap-2'>
        //             {TechSTack}{' '}
        //             <p className='text-base text-gray-600 '>
        //                 {' '}
        //                 <Badge label={values?.tech_keywords} type='success' />
        //             </p>
        //         </div>
        //     </div>
        //     <hr />
        //     <a className=' ' target='_blank' rel='noreferrer' href={values?.job_source_url}>
        //         <h5 className='text-4xl font-semibold tracking-tight text-[#006366]  mt-4 hover:cursor-pointer hover:underline'>
        //             {values?.job_title}
        //             <span className='text-base text-gray-500 '>( {values?.job_type} based )</span>
        //         </h5>
        //     </a>
        //     <p className='font-normal text-gray-900 mt-2'>
        //         {' '}
        //         <div dangerouslySetInnerHTML={{ __html: values?.job_description }} />
        //     </p>
        // </div>
    )
}
export default memo(JobDetail)
