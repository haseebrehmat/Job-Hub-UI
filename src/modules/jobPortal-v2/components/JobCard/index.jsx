import { memo } from 'react'

import { useVisitedJobsStore } from '@/stores'

import { Button } from '@components'

import { JobCardHead, TechKeywords } from '@modules/jobPortal-v2/components'

import { formatDate, timeSince } from '@utils/helpers'

import { UptoIcon, SiteIcon, UserAppliedJobIcon, CompanyIcon, DateTimeIcon, SalaryIcon } from '@icons'

const JobCard = ({ job = null }) => {
    const [setVisitedJobs] = useVisitedJobsStore(state => [state.setVisitedJobs])

    return job ? (
        <div
            className={`rounded-lg border  border-slate-300 ${
                job?.block ? 'bg-[#d9d5d5] bg-opacity-40 shadow-sm' : 'bg-slate-50'
            }  overflow-hidden hover:bg-white hover:border-[#338d8c] p-3 hover:-skew-x-1 hover:shadow-lg`}
        >
            <JobCardHead job={job} />
            <div className='pl-1.5'>
                <div className='flex gap-3 flex-wrap pt-3.5'>
                    <Button
                        label={job?.company_name}
                        icon={CompanyIcon}
                        fit
                        classes='!rounded-full !py-0.5 !pr-2.5 !gap-0.5 !text-neutral-600 tracking-wider !text-xs !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !uppercase'
                    />
                    <Button
                        label={formatDate(job?.job_posted_date)}
                        icon={DateTimeIcon}
                        fit
                        classes='!rounded-full !py-0.5 !pr-2.5 !gap-0.5 !text-neutral-600 tracking-wider !text-xs !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize'
                    />
                    <a
                        className='!rounded-full !py-0.5 !px-2.5 !gap-2 !text-neutral-600 tracking-wider !text-xs border !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize inline-flex items-center'
                        target='_blank'
                        rel='noreferrer'
                        href={job?.job_source_url}
                        onClick={() => setVisitedJobs(job?.id)}
                    >
                        {SiteIcon} {job?.job_source}
                    </a>
                    <Button
                        label={job?.job_type}
                        icon={UserAppliedJobIcon}
                        fit
                        classes='!rounded-full !py-0.5 !pr-2.5 !gap-0.5 !text-neutral-600 tracking-wider !text-xs !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize'
                    />
                    {job?.salary_max && (
                        <Button
                            label={`Max Salary: ${job?.salary_max} / ${job?.salary_format}`}
                            icon={SalaryIcon}
                            fit
                            classes='!rounded-full !py-0.5 !pr-2.5 !gap-0.5 !text-neutral-600 tracking-wider !text-xs !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize'
                        />
                    )}
                    <TechKeywords keywords={job?.tech_keywords} />
                </div>
                <div className='flex items-center justify-between mt-2 mr-1.5'>
                    <span className='text-slate-500 font-semibold -skew-x-3 pl-2'>
                        {timeSince(job?.job_posted_date)}
                    </span>
                    {job?.total_vertical > 0 ? (
                        <div className='flex items-center gap-2'>
                            <span className='text-sm border rounded px-2 p-0.5 text-[#338d8c] border-[#55bf84] font-mono'>
                                {job?.total_vertical} / <strong>{job?.remaining_vertical}</strong>
                            </span>
                            <div className='flex items-center gap-2 px-2 py-1 border text-[#338d8c] border-[#4ab9a7] rounded-full hover:border-2'>
                                <Button
                                    label='Apply Now'
                                    fit
                                    classes='!rounded-full !border-0 !p-0 hover:!bg-white hover:!text-[#338d8c]'
                                />
                                <span>{UptoIcon}</span>
                            </div>
                        </div>
                    ) : (
                        <small className='text-xs text-slate-500 border py-0.5 px-1.5 border-slate-500 rounded-full'>
                            No vertical assigned
                        </small>
                    )}
                </div>
            </div>
        </div>
    ) : null
}

export default memo(JobCard)
