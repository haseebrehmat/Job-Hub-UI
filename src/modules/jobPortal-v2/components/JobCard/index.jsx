import { memo } from 'react'

import { Button } from '@components'

import { JobCardFooter, JobCardHead, JobSourceAndType, TechKeywords } from '@modules/jobPortal-v2/components'

import { formatDate } from '@utils/helpers'

import { CompanyIcon, DateTimeIcon, SalaryIcon } from '@icons'

const JobCard = ({ job = null }) =>
    job ? (
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
                    <JobSourceAndType job={job} />
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
                <JobCardFooter job={job} />
            </div>
        </div>
    ) : null

export default memo(JobCard)
