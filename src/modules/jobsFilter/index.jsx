import React, { useState, memo, useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Selector from './components/Selector'
import CustomSelector from '../../components/CustomSelector'
import { Paginated, CustomDilog, EmptyTable, TextEditor, Loading } from '@components'
import { Checkedbox, unCheckedbox } from '@icons'
import { JOB_HEADS } from '@constants/jobPortal'
import { baseURL } from '@utils/http'
import { toast } from 'react-hot-toast'
import { can, formatDate, checkToken, dataForCsv, formatStringInPascal } from '@/utils/helpers'
import { Filters, Badge, Checkbox } from '@/components'
import { fetchJobs, downloadJobsData, updateJobStatus, updateRecruiterStatus } from './api'
import JobPortalSearchBox from './components/JobPortalSearchBox'
import { EditJobForm, GenerateCSV, JobActions, JobPortalAnalytics } from '@modules/jobsFilter/components'

const JobsFilter = memo(() => {
    const apiUrl = `${baseURL}api/job_portal/`
    const [data, setData] = useState([])
    const [currentCompany, setCurrentCompany] = useState([])
    const [pagesCount, setPagesCount] = useState([])
    const jobDetailsUrl = `${apiUrl}job_details/`
    const [jobIdForLastCV, setJobIdForLastCV] = useState('')

    const [job, setJob] = useReducer((prev, next) => ({ ...prev, ...next }), { show: false, data: {} })

    const defaultFilterState = {
        techStacData: [],
        jobSourceData: [],
        jobTypeData: [],
        techStackSelector: [],
        jobSourceSelector: [],
        jobTypeSelector: 'all',
        jobVisibilitySelector: 'all',
        stats: {
            total_job: '0',
            filtered_job: '0',
            recruiter_job: '0',
            non_recruiter_job: '0',
            today_uploaded_job: 0,
        },
        jobStatusChoice: {},
        dates: { from_date: '', to_date: '' },
        jobTitle: '',
        techStackData: [],
        ordering: '-job_posted_date',
        showCoverLetter: false,
        isLoading: true,
        blocked: false,
    }

    const [filterState, setFilterState] = useState(defaultFilterState)

    const navigate = useNavigate()
    const defaulJobsFiltersParams = {
        job_source: '',
        tech_keywords: '',
        from_date: '',
        to_date: '',
        job_type: '',
        ordering: '-job_posted_date',
        search: '',
        page: 1,
        job_visibility: 'all',
        blocked: false,
    }

    const [jobsFilterParams, setJobsFilterParams] = useState(defaulJobsFiltersParams)
    const error = true
    const generateParamsString = (params_list = jobsFilterParams) => {
        const params = new URLSearchParams()
        let params_count = 0

        Object.entries(params_list).forEach(([key, value]) => {
            params.append(key, value)
            params_count++
        })
        return params_count > 0 ? params.toString() : ''
    }

    const handleTechStackSelector = techStackSelectorData => {
        setFilterState({ ...filterState, techStackSelector: techStackSelectorData })
    }

    const updateSelectorCount = (selector, new_count_list) =>
        selector
            .map(({ value }) => {
                const updated_count = new_count_list.find(item => item.name === value)
                return (
                    updated_count && {
                        label: `${updated_count.name} (${updated_count.value})`,
                        value: updated_count.name,
                    }
                )
            })
            .filter(Boolean)

    const fetchJobsData = async url => {
        setFilterState(prevFilters => ({ ...prevFilters, isLoading: true }))
        setData([])
        const {
            jobsData,
            status,
            total_jobs,
            filtered_jobs,
            recruiter_jobs,
            non_recruiter_jobs,
            today_uploaded_jobs,
            job_status_choice,
            tech_keywords_count_list,
            job_source_count_list,
            total_job_type,
            num_pages,
            detail,
        } = await fetchJobs(`${url}?${generateParamsString()}`)
        const { techStackSelector, jobSourceSelector } = filterState
        if (status === 'success') {
            setFilterState({
                ...filterState,
                stats: {
                    total_job: total_jobs,
                    filtered_job: filtered_jobs,
                    non_recruiter_job: non_recruiter_jobs,
                    recruiter_job: recruiter_jobs,
                    today_uploaded_job: today_uploaded_jobs,
                },
                jobStatusChoice: job_status_choice,
                techStackData: tech_keywords_count_list,
                jobSourceData: job_source_count_list,
                jobTypeData: total_job_type,
                isLoading: false,
                techStackSelector: updateSelectorCount(techStackSelector, tech_keywords_count_list),
                jobSourceSelector: updateSelectorCount(jobSourceSelector, job_source_count_list),
            })
            setData(jobsData)
            setPagesCount(num_pages)
        } else {
            toast.error(detail)
            setFilterState({ ...filterState, isLoading: false })
        }
    }

    const getJobsParamsFromFilters = () => {
        const { jobSourceSelector, jobTypeSelector, ordering, jobVisibilitySelector, dates, techStackSelector, blocked } =
            filterState
        const { from_date, to_date } = dates
        const tech_keywords = techStackSelector.map(obj => obj.value).join(',')
        const selected_job_sources = jobSourceSelector.map(obj => obj.value).join(',')
        return {
            ...jobsFilterParams,
            tech_keywords,
            job_source: selected_job_sources,
            ordering,
            page: 1,
            job_visibility: jobVisibilitySelector,
            from_date,
            to_date,
            job_type: jobTypeSelector !== 'all' ? jobTypeSelector : '',
            search: filterState?.jobTitle,
            blocked,
        }
    }

    const updateParams = () => {
        setFilterState({ ...filterState, isLoading: true })
        setJobsFilterParams(getJobsParamsFromFilters())
    }

    const resetFilters = () => {
        setData([])
        setFilterState(defaultFilterState)
        setJobsFilterParams(defaulJobsFiltersParams)
    }

    useEffect(() => {
        fetchJobsData(jobDetailsUrl)
    }, [jobsFilterParams])

    const applyJob = async id => {
        const { status, detail } = await updateJobStatus(`${apiUrl}job_status/`, '1', data[id].id)
        if (status === 'success') {
            const temp_data = data?.map((item, key) => (key === id ? { ...item, job_status: '1' } : item))
            setData(temp_data)
            toast.success(detail)
        } else {
            toast.error(detail)
            setTimeout(() => {
                location.reload()
            }, 2000)
        }
    }

    const changeRecruiter = async (company, func) => {
        const { status, detail } = await updateRecruiterStatus(`${apiUrl}company/blacklist/${func}`, company)
        if (status === 'success') {
            fetchJobsData(jobDetailsUrl)
            toast.success(detail)
        } else {
            toast.error(detail)
        }
    }

    const formatOptions = options_arr =>
        options_arr?.map(({ name, value }) => ({ label: `${name} (${value})`, value: name }))

    const { CustomModal, openModal } = CustomDilog(
        'Please Confirm ',
        'Are you sure you want to change the state of recruiter',
        () => {
            checkToken()
            changeRecruiter(currentCompany[0], currentCompany[1])
        },
        'success'
    )

    const handleJobDetails = job => {
        navigate(`/job-details/${job.id}`, {
            state: {
                data: job,
                title: 'Job Details',
            },
        })
    }

    if (filterState?.isLoading) return <Loading />
    return (
        <div className='text-[#048C8C] px-2'>
            <div className='flex flex-col items-center mb-4 transform scale-[85%]'>
                <JobPortalAnalytics
                    job_sources={[
                        { type: 'Filtered', count: filterState?.stats?.filtered_job },
                        { type: 'Recruiters', count: filterState?.stats?.recruiter_job },
                        { type: 'Non Recruiters', count: filterState?.stats?.non_recruiter_job },
                        { type: 'Today Uploaded Jobs', count: filterState?.stats?.today_uploaded_job },
                    ]}
                    total={filterState?.stats?.total_job}
                />
            </div>
            <div className='px-8 border bg-slate-100 rounded-3xl py-2'>
                <div className='flex items-center py-2 justify-between mt-2'>
                    <JobPortalSearchBox
                        value={filterState?.jobTitle}
                        handleEnter={e => {
                            if (e.key === 'Enter') {
                                updateParams()
                            }
                        }}
                        setQuery={title => {
                            setFilterState({ ...filterState, jobTitle: title })
                        }}
                    />
                    <button
                        className='bg-[#10868a] hover:bg-[#209fa3] text-[#ffffff]  py-2 px-3 rounded inline-flex items-center'
                        onClick={() =>
                            downloadJobsData(
                                `${jobDetailsUrl}?${generateParamsString(getJobsParamsFromFilters())}&download=true`
                            )
                        }
                    >
                        Download CSV
                    </button>
                </div>
                <div className='grid grid-cols-3 my-2 gap-3'>
                    <div className='grid grid-cols-2  gap-3'>
                        <div className='my-2'>
                            From
                            <input
                                className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                                type='date'
                                max={new Date().toISOString().slice(0, 10)}
                                value={filterState?.dates?.from_date}
                                onChange={event =>
                                    setFilterState({
                                        ...filterState,
                                        dates: { ...filterState?.dates, from_date: event.target.value },
                                    })
                                }
                            />
                        </div>
                        <div className='my-2'>
                            To
                            <input
                                className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                                type='date'
                                max={new Date().toISOString().slice(0, 10)}
                                value={filterState?.dates?.to_date}
                                onChange={event =>
                                    setFilterState({
                                        ...filterState,
                                        dates: { ...filterState?.dates, to_date: event.target.value },
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='my-2'>
                        Listings
                        <Selector
                            data={filterState?.jobTypeData}
                            selectorValue={filterState?.jobTypeSelector}
                            handleSelectChange={e =>
                                setFilterState({ ...filterState, jobTypeSelector: e.target.value })
                            }
                        />
                    </div>
                    <div className='my-2'>
                        Job Source
                        <CustomSelector
                            className='mx-auto'
                            options={formatOptions(filterState?.jobSourceData)}
                            handleChange={value => setFilterState({ ...filterState, jobSourceSelector: value })}
                            selectorValue={filterState?.jobSourceSelector}
                            isMulti
                            placeholder='Select Job Source'
                        />
                    </div>
                    <div className='my-2'>
                        Order By
                        <select
                            value={filterState?.ordering}
                            onChange={e =>
                                setFilterState({
                                    ...filterState,
                                    ordering: e.target.value,
                                })
                            }
                            className='bg-gray-50 text-gray-900 text-sm focus:[#048C8C]-500 focus:border-[#048C8C]-500 block w-full p-2.5 rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer'
                        >
                            <option value='-job_posted_date'>Posted Date</option>
                            <option value='job_title'>Job Title</option>
                            <option value='job_type'>Job Type</option>
                            <option value='company_name'>Company</option>
                        </select>
                    </div>

                    <div className='my-2'>
                        Job Visibility
                        <select
                            value={filterState?.jobVisibilitySelector}
                            onChange={e => setFilterState({ ...filterState, jobVisibilitySelector: e.target.value })}
                            className='bg-gray-50 text-gray-900 text-sm focus:[#048C8C]-500 focus:border-[#048C8C]-500 block w-full p-2.5 rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer'
                        >
                            <option value='all'>All</option>
                            <option value='recruiter'>Recruiter</option>
                            <option value='non-recruiter'>Non-Recruiter</option>
                        </select>
                    </div>
                    <div className='my-2'>
                        Tech Stack
                        <CustomSelector
                            className='mx-auto'
                            options={formatOptions(filterState?.techStackData)}
                            handleChange={handleTechStackSelector}
                            selectorValue={filterState?.techStackSelector}
                            isMulti
                            placeholder='Select Tech Stack'
                        />
                    </div>
                </div>
                <div className='flex justify-between items-center mb-2'>
                    <div>
                        <Checkbox
                            label='Show Blocked Companies Jobs'
                            checked={filterState?.blocked}
                            onChange={e => setFilterState({ ...filterState, blocked: e.target.checked })}
                        />
                    </div>
                    <div>
                        <Filters apply={() => updateParams()} clear={() => resetFilters()} />
                    </div>
                </div>
            </div>

            <div className=''>
                <table className='table-auto w-full table text-lg text-left mt-4 border text-[#048C8C]'>
                    <thead className='text-md uppercase bg-[#edfdfb] border'>
                        <tr>
                            {JOB_HEADS?.map(heading => (
                                <th scope='col' className='px-3 py-2' key={heading}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data?.length > 0 && error ? (
                            data?.map((item, key) => (
                                <tr
                                    className={`${
                                        item?.block ? 'bg-[#d9d5d5]' : 'bg-white'
                                    } border-b border-[#006366] border-opacity-30 hover:bg-gray-100`}
                                    key={key}
                                >
                                    <td className='p-2 w-96'>
                                        <a
                                            className='hover:bg-gray-100 cursor-pointer underline underline-offset-4 font-semibold'
                                            onClick={() => handleJobDetails(item)}
                                            data-title='click to open Job description'
                                        >
                                            {item?.job_title &&
                                                item?.job_title.length > 0 &&
                                                formatStringInPascal(item.job_title)}
                                        </a>
                                    </td>
                                    <td className='p-2'>
                                        {item?.company_name &&
                                            item?.company_name.length > 0 &&
                                            formatStringInPascal(item.company_name)}
                                    </td>
                                    <td className='p-2 capitalize'>
                                        <a
                                            className='underline focus:text-black focus:text-lg'
                                            target='_blank'
                                            rel='noreferrer'
                                            href={item?.job_source_url}
                                        >
                                            {item?.job_source}
                                        </a>
                                    </td>
                                    <td className='p-2'>{item?.tech_keywords}</td>
                                    <td className='p-2'>{item?.job_type}</td>
                                    <td className='p-2'>{formatDate(item?.job_posted_date)}</td>
                                    <td>
                                        {can('apply_job') && item?.total_vertical > 0 && !jobsFilterParams.blocked ? (
                                            <Link
                                                to={`/apply-for-job/${item?.id}`}
                                                className='rounded bg-[#10868a] text-white text-sm inline-flex w-fit p-1'
                                            >
                                                Apply
                                                <span className='text-bold ml-0.5'>
                                                    ({item?.remaining_vertical ?? 0} / {item?.total_vertical ?? 0})
                                                </span>
                                            </Link>
                                        ) : (
                                            <small className='text-xs text-gray-500 border px-1.5 border-gray-500 rounded-lg'>
                                                {item?.total_vertical > 0
                                                    ? jobsFilterParams.blocked
                                                        ? 'blocked'
                                                        : 'unauthorized'
                                                    : 'no vertical'}
                                            </small>
                                        )}
                                        {/* {can('apply_job') ? (
                                            item?.job_status === '0' ? (
                                                <button
                                                    className='block rounded px-2 py-1 my-2 bg-[#10868a] text-white'
                                                    onClick={() => applyJob(key)}
                                                >
                                                    Apply
                                                </button>
                                            ) : (
                                                <button className='block rounded px-2 py-1 my-3 text-gray-400 bg-[#ffffff] '>
                                                    {filterState?.jobStatusChoice[item?.job_status]}
                                                </button>
                                            )
                                            ) : null} */}
                                    </td>
                                    {CustomModal}
                                    <td className='p-5'>
                                        <span className='flex justify-center'>
                                            {!item?.block ? (
                                                <button
                                                    onClick={() => {
                                                        setCurrentCompany([item?.company_name, 'add/'])
                                                        openModal()
                                                    }}
                                                >
                                                    {unCheckedbox}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setCurrentCompany([item?.company_name, 'remove/'])
                                                        openModal()
                                                    }}
                                                >
                                                    {Checkedbox}
                                                </button>
                                            )}
                                            <JobActions edit={() => setJob({ data: item, show: true })} id={item?.id} />
                                        </span>
                                    </td>
                                    {/* <td className='p-5'>
                                        <button
                                            className={`block rounded px-2 py-1 my-2 ${
                                                jobIdForLastCV === item?.id ? 'bg-[#083031]' : 'bg-[#10868a]'
                                            } text-white focus:bg-[#076366]`}
                                            onClick={() => {
                                                setJobIdForLastCV(item.id)
                                                generateLetter({
                                                    name: 'test user',
                                                    company: item?.company_name,
                                                    experience: '2 years',
                                                    job_des: item?.job_description,
                                                })
                                            }}
                                        >
                                            Generate
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <EmptyTable cols={8} msg='No Jobs found yet!' />
                        )}
                    </tbody>
                </table>
                <Paginated
                    page={jobsFilterParams?.page}
                    setPage={pageNumber => {
                        setJobsFilterParams({ ...jobsFilterParams, page: pageNumber })
                    }}
                    pages={pagesCount}
                />
            </div>
            {job.show && <EditJobForm job={job} set={setJob} />}
        </div>
    )
})

export default JobsFilter
