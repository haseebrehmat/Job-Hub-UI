import { memo } from 'react'

import { Button, Drawer, Badge } from '@components'
import { JobSource, TechSTack } from '@icons'

const JobDetail = ({ show, setShow, values }) => (
    <Drawer show={show} setShow={setShow} w='920px'>
        <div className='max-w-4xl p-6 bg-white border border-gray-300  rounded-lg shadow'>
            <div className='flex mt-4'>
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
                    <div className='text-lg  font-semibold  text-gray-900 flex items-baseline'>
                        {values.company}
                        <span className='text-sm  text-gray-500 mx-2'>
                            {values.company_type ? '( recruiter )' : '( non-recruiter )'}
                        </span>
                    </div>

                    <p className='text-xs -mt-1 text-gray-500'>{values.date}</p>
                </div>
            </div>
            <div className='flex gap-2 ml-1 mt-2'>
                <div className='flex'>
                    {JobSource}{' '}
                    <p className='text-base text-gray-600 '>
                        {' '}
                        <Badge label={values.job_source} />
                    </p>
                </div>
                <div className='flex'>
                    {TechSTack}{' '}
                    <p className='text-base text-gray-600 '>
                        {' '}
                        <Badge label={values.tech_stack} type='success' />
                    </p>
                </div>
            </div>
            <a className=' ' target='_blank' rel='noreferrer' href={values.job_url}>
                <h5 className='text-2xl font-semibold tracking-tight text-gray-900  hover:text-[#10868a]'>
                    {values.job_title}
                    <span className='text-base text-gray-500 '>( {values.job_type} based )</span>
                </h5>
            </a>
            <p className='font-normal text-gray-900'>
                {' '}
                <div dangerouslySetInnerHTML={{ __html: values.job_description }} />
            </p>
            <div className='mt-8 space-y-2 px-60'>
                <Button label='Cancel' onClick={() => setShow(false)} />
            </div>
        </div>
    </Drawer>
)
export default memo(JobDetail)
