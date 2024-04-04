import { memo } from 'react'

import { Button, Drawer, Badge } from '@components'
import { JobSource, TechSTack } from '@icons'

const JobDetail = ({ show, setShow }) => (
    <Drawer show={show} setShow={setShow} w='520px'>
        <div className='max-w-4xl p-6 bg-white border border-gray-300  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex'>
                <svg
                    className='w-10 h-10 mb-2'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        d='M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z'
                        clipRule='evenodd'
                    />
                    <path d='M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z' />
                </svg>
                <div className='flex flex-col'>
                    <p className='text-lg  font-semibold  text-gray-900 mx-2 flex items-baseline'>
                        {show.company}{' '}
                        <p className='text-sm  text-gray-500 mx-2'>
                            {show.company_type ? '( recruiter )' : '( non-recruiter )'}
                        </p>{' '}
                    </p>
                    <p className='text-xs -mt-1 text-gray-500 mx-2'>{show.date}</p>
                </div>
            </div>
            <div className='flex gap-2 ml-1 mt-2'>
                <div className='flex'>
                    {JobSource}{' '}
                    <p className='text-base text-gray-600 dark:text-white mx-2'>
                        {' '}
                        <Badge label={show.job_source} font_size='lg' />
                    </p>
                </div>
                <div className='flex'>
                    {TechSTack}{' '}
                    <p className='text-base text-gray-600 dark:text-white mx-2'>
                        {' '}
                        <Badge label={show.tech_stack} type='success' />
                    </p>
                </div>
            </div>
            <a className=' ' target='_blank' rel='noreferrer' href={show.job_url}>
                <h5 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mt-3 hover:text-[#10868a]'>
                    {show.job_title}
                    <span className='text-base text-gray-500 dark:text-white mx-2'>( {show.job_type} based )</span>
                </h5>
            </a>
            <p className='font-normal text-gray-500 dark:text-gray-400'>{show.job_description}</p>
            <div className='pt-4 space-y-2'>
                <Button label='Cancel' onClick={() => setShow({ ...show, showJObDescription: false })} />
            </div>
        </div>
    </Drawer>
)

export default memo(JobDetail)
