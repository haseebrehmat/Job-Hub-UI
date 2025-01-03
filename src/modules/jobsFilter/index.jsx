import { useState, memo, useEffect } from 'react'
import Selector from './components/Selector'
import ClipLoader from 'react-spinners/ClipLoader'
import CustomSelector from '../../components/CustomSelector'
import { Paginated, CustomDilog, EmptyTable } from '@components'
import { Checkedbox, unCheckedbox } from '@icons'
import { jobsHeads } from '@constants/appliedJob'
import { baseURL } from '@utils/http'
import { toast } from 'react-hot-toast'
import { can, checkToken, dataForCsv } from '@/utils/helpers'
import { Filters, Badge } from '@/components'
import { fetchJobs, updateJobStatus, updateRecruiterStatus } from './api'
import JobPortalSearchBox from './components/JobPortalSearchBox'
import { GenerateCSV } from '@modules/jobsFilter/components'

const JobsFilter = memo(() => {
    const apiUrl = `${baseURL}api/job_portal/`
    const [data, setData] = useState([])
    const [currentCompany, setCurrentCompany] = useState([])
    const [pagesCount, setPagesCount] = useState([])
    const jobDetailsUrl = `${apiUrl}job_details/`

    const defaultFilterState = {
        techStacData: [],
        jobSourceData: [],
        jobTypeData: [],
        techStackSelector: [],
        jobSourceSelector: 'all',
        jobTypeSelector: 'all',
        jobVisibilitySelector: 'all',
        stats: { total_jobs: 0, filtered_jobs: 0 },
        jobStatusChoice: {},
        dates: { from_date: '', to_date: '' },
        jobTitle: '',
        techStackData: [],
        ordering: '-job_posted_date',
    }

    const [filterState, setFilterState] = useState(defaultFilterState)

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
    }

    const [jobsFilterParams, setJobsFilterParams] = useState(defaulJobsFiltersParams)

    const error = true
    const [recordFound, setRecordFound] = useState(true)

    const generateParamsString = () => {
        const params = new URLSearchParams()
        let params_count = 0

        Object.entries(jobsFilterParams).forEach(([key, value]) => {
            params.append(key, value)
            params_count++
        })
        return params_count > 0 ? params.toString() : ''
    }

    const handleTechStackSelector = techStackSelectorData => {
        setFilterState({ ...filterState, techStackSelector: techStackSelectorData })
    }

    const fetchJobsData = async url => {
        setData([])

        const {
            jobsData,
            status,
            total_jobs,
            filtered_jobs,
            job_status_choice,
            tech_keywords_count_list,
            job_source_count_list,
            total_job_type,
            num_pages,
            detail,
        } = await fetchJobs(`${url}?${generateParamsString()}`)

        const { techStackSelector } = filterState
        if (status === 'success') {
            setFilterState({
                ...filterState,
                stats: { ...filterState?.stats, total_jobs, filtered_jobs },
                jobStatusChoice: job_status_choice,
                techStackData: tech_keywords_count_list,
                jobSourceData: job_source_count_list,
                jobTypeData: total_job_type,
                techStackSelector: techStackSelector
                    .map(({ value }) => {
                        const updated_tech_count = tech_keywords_count_list.find(tech => tech.name === value)
                        return (
                            updated_tech_count && {
                                label: `${updated_tech_count.name} (${updated_tech_count.value})`,
                                value: updated_tech_count.name,
                            }
                        )
                    })
                    .filter(Boolean),
            })
            setData(jobsData)
            if (jobsData.length === 0) {
                setRecordFound(false)
            } else {
                setRecordFound(true)
            }
            setPagesCount(num_pages)
        } else {
            setRecordFound(false)
            toast.error(detail)
        }
    }

    const updateParams = () => {
        const { jobSourceSelector, jobTypeSelector, ordering, jobVisibilitySelector, dates, techStackSelector } =
            filterState
        const { from_date, to_date } = dates
        const tech_keywords = techStackSelector.map(obj => obj.value).join(',')
        setJobsFilterParams({
            ...jobsFilterParams,
            tech_keywords,
            job_source: jobSourceSelector !== 'all' ? jobSourceSelector : '',
            page: 1,
            ordering,
            job_visibility: jobVisibilitySelector,
            from_date,
            to_date,
            job_type: jobTypeSelector !== 'all' ? jobTypeSelector : '',
            search: filterState?.jobTitle,
        })
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
            updateParams()
            toast.success(detail)
        } else {
            toast.error(detail)
            setTimeout(() => {
                location.reload()
            }, 2000)
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

    return (
        <div className='my-2  h-screen text-[#048C8C] '>
            <div className='flex p-3 items-center py-2 justify-between '>
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
                {data ? GenerateCSV(dataForCsv(data)) : ''}
            </div>
            <div className='p-3 border'>
                <div className='grid grid-cols-3 -my-2 gap-3'>
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
                        <Selector
                            data={filterState?.jobSourceData}
                            selectorValue={filterState?.jobSourceSelector}
                            handleSelectChange={e =>
                                setFilterState({ ...filterState, jobSourceSelector: e.target.value })
                            }
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
                    <div className='flex space-x-4 my-2 grid-flow-col '>
                        <div>
                            <p className='font-medium text-2xl '>Total :</p>
                            <p className='font-medium text-2xl '>Filtered :</p>
                        </div>
                        <div className='justify-center  grid-flow-row '>
                            <div className=' h-8 '>
                                <Badge label={filterState?.stats?.total_jobs?.toString()} type='enabled' />
                            </div>
                            <div>
                                <Badge label={filterState?.stats?.filtered_jobs?.toString()} type='enabled' />
                            </div>
                        </div>
                    </div>
                    <div>{ }</div>
                    <div className='flex justify-end px-4 align-baseline'>
                        <div className='my-6'>
                            <Filters apply={() => updateParams()} clear={() => resetFilters()} />
                        </div>
                    </div>
                </div>
            </div>
            <table className='table-auto w-full table text-xl text-left mt-6 text-[#048C8C] '>
                <thead className='text-lg uppercase border tex border-[#048C8C] '>
                    <tr>
                        {jobsHeads?.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
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
                                } border-b border-[#006366] border-opacity-30`}
                                key={key}
                            >
                                <td className='p-5 w-96'>{item?.job_title}</td>
                                <td className='p-5'>{item?.company_name}</td>
                                <td className='p-5 capitalize'>
                                    <a
                                        className='underline focus:text-black focus:text-lg'
                                        target='_blank'
                                        rel='noreferrer'
                                        href={item?.job_source_url}
                                    >
                                        {item?.job_source}
                                    </a>
                                </td>
                                <td className='p-5'>{item?.tech_keywords}</td>
                                <td className='p-5'>{item?.job_type}</td>
                                <td className='p-5'>{item?.job_posted_date.slice(0, 10)}</td>
                                <td className='p-2'>
                                    {can('apply_job') ? (
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
                                    ) : null}
                                </td>
                                {CustomModal}
                                <td className='p-5'>
                                    <span className='flex justify-center'>
                                        {!item?.block ? (
                                            <button
                                                className=''
                                                onClick={() => {
                                                    setCurrentCompany([item?.company_name, 'add/'])
                                                    openModal()
                                                }}
                                            >
                                                {unCheckedbox}
                                            </button>
                                        ) : (
                                            <button
                                                className=' '
                                                onClick={() => {
                                                    setCurrentCompany([item?.company_name, 'remove/'])
                                                    openModal()
                                                }}
                                            >
                                                {Checkedbox}
                                            </button>
                                        )}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No Jobs found yet!' />
                    )}
                </tbody>
            </table>
            {data?.length === 0 && recordFound && (
                <div className='flex justify-center my-2'>
                    <ClipLoader color='#36d7b7' size={60} />
                </div>
            )}

            <Paginated
                page={jobsFilterParams?.page}
                setPage={pageNumber => {
                    setJobsFilterParams({ ...jobsFilterParams, page: pageNumber })
                }}
                pages={pagesCount}
            />
        </div>
    )
})

export default JobsFilter
