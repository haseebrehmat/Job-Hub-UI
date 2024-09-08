import { memo } from 'react'

import { Button } from '@components'

import { formatDate, isset, timeSince } from '@utils/helpers'

import {
    ActionsIcons,
    UptoIcon,
    RegionIcon,
    SiteIcon,
    UserAppliedJobIcon,
    CompanyIcon,
    DateTimeIcon,
    SalaryIcon,
    TechSTack,
    DoubleCheckIcon,
} from '@icons'

const JobCard = ({ job = null }) =>
    job ? (
        <div
            className={`rounded-lg border  border-slate-300 ${
                job?.block ? 'bg-[#d9d5d5] bg-opacity-40 shadow-sm' : 'bg-slate-50'
            }  overflow-hidden hover:bg-white hover:border-[#338d8c] p-3 hover:-skew-x-1 hover:shadow-lg`}
        >
            <div className='flex flex-col lg:flex-row items-start justify-between'>
                <div className='flex gap-3 items-start'>
                    <span className='bg-[#338d8c] h-14 w-14 rounded-lg text-white uppercase flex items-center justify-center text-xl'>
                        {job?.job_title?.substring(0, 1)}
                    </span>
                    <div className='flex flex-col text-gray-600 gap-y-0.5'>
                        <span className='text-lg capitalize font-semibold flex-wrap'>{job?.job_title}</span>
                        <span className='text-sm capitalize italic inline-flex items-center gap-1'>
                            {isset(job?.address) ? (
                                <>
                                    {RegionIcon} {job?.address}
                                </>
                            ) : (
                                'No Location'
                            )}
                        </span>
                    </div>
                </div>
                <div className='flex items-end text-[#338d8c] p-2 lg:p-0'>
                    <span className='inline-flex gap-1 items-center text-sm'>{DoubleCheckIcon} Visited</span>
                    <Button icon={ActionsIcons} fit classes='!border-0 !p-0' />
                </div>
            </div>
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
                    <Button
                        label={job?.job_source}
                        icon={SiteIcon}
                        fit
                        classes='!rounded-full !py-0.5 !pr-2.5 !gap-0.5 !text-neutral-600 tracking-wider !text-xs !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize'
                    />
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
                    <Button
                        label={`Stacks: ${Array.from({ length: 5 }, () => ` ${job?.tech_keywords}`)}`}
                        icon={TechSTack}
                        fit
                        classes='!rounded-full !py-0.5 !pr-2.5 !gap-0.5 !text-neutral-600 tracking-wider !text-xs !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize'
                    />
                </div>
                <div className='flex items-center justify-between mt-2 mr-1.5'>
                    <span className='text-slate-500 font-semibold -skew-x-3 pl-2'>
                        {timeSince(job?.job_posted_date)}
                    </span>
                    {job?.total_vertical >= 0 ? (
                        <div className='flex items-center gap-2 px-2 py-1 border text-[#338d8c] border-[#4ab9a7] rounded-full hover:border-2'>
                            <span className='text-sm'>
                                {job?.total_vertical} / <strong>{job?.remaining_vertical}</strong>
                            </span>
                            <Button
                                label='Apply Now'
                                fit
                                classes='!rounded-full !border-0 !p-0 hover:!bg-white hover:!text-[#338d8c]'
                            />
                            <span>{UptoIcon}</span>
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

export default memo(JobCard)
