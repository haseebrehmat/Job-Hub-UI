import { useState, memo, useEffect } from 'react'
import Selector from './components/Selector'
import ReactPaginate from 'react-paginate'
import ClipLoader from 'react-spinners/ClipLoader'
import CustomSelector from '../../components/CustomSelector'
import { Loading, EmptyTable } from '@components'
import { TableNavigate, FilterForm } from '@modules/jobsFilter/components'
import { CreateIcon, ActionsIcons } from '@icons'
import { jobsHeads } from '@constants/appliedJob'
import { baseURL } from '@utils/http'
import { toast } from 'react-hot-toast'
import { can } from '@/utils/helpers'
import { Filters, Searchbox, Badge } from '@/components'

const JobsFilter = memo(() => {
    const apiUrl = `${baseURL}api/job_portal/`
    const [data, setData] = useState([])
    const [pagesCount, setPagesCount] = useState([])
    const [techStackData, setTechStackData] = useState([])
    const [jobSourceData, setJobSourceData] = useState([])
    const [jobTypeData, setJobTypeData] = useState([])
    const [jobSourceSelector, setJobSourceSelector] = useState('all')
    const [techStackSelector, setTechStack] = useState([])
    const [jobTypeSelector, setJobTypeSelector] = useState('all')
    const [jobVisibilitySelector, setJobVisibilitySelector] = useState('recruiter')
    const [stats, setStats] = useState({ total_jobs: 0, filtered_jobs: 0 })
    const [jobStatusChoice, setJobStatusChoice] = useState({})
    const [dates, setDates] = useState({ from_date: '', to_date: '' })
    const jobDetailsUrl = `${apiUrl}job_details/`
    const [jobTitle, setJobTitle] = useState('')
    const [ordering, setOrdering] = useState('job_posted_date')
    const [jobsFilterParams, setJobsFilterParams] = useState({
        job_source: '',
        tech_keywords: '',
        page: 1,
        from_date: '',
        to_date: '',
        job_type: '',
        ordering: 'job_posted_date',
        search: '',
        job_visibility: 'recruiter',
    })

    const error = true
    const [recordFound, setRecordFound] = useState(true)

    const fetchJobsData = async url => {
        const params = new URLSearchParams()
        let params_count = 0

        for (const i in jobsFilterParams) {
            if (jobsFilterParams[i] !== '') {
                params.append(i, jobsFilterParams[i])
                params_count += 1
            }
        }

        url = params_count > 0 ? `${url}?${params.toString()}` : url
        setData([])

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token').slice(1, -1)}`,
            },
        })
        const json = await response.json()

        if (response.ok) {
            setStats({
                ...stats,
                total_jobs: json.total_jobs,
                filtered_jobs: json.filtered_jobs,
            })
            setData(json.data)
            if (json.data.length === 0) {
                setRecordFound(false)
            } else {
                setRecordFound(true)
            }
            setJobStatusChoice(json.job_status_choice)
            setTechStackData(json.tech_keywords_count_list)
            setJobSourceData(json.job_source_count_list)
            setJobTypeData(json.total_job_type)
            setPagesCount(json.links.num_pages)
        } else {
            setRecordFound(false)
            toast.error(json.detail)
        }
    }

    const handleJobSource = event => {
        setJobSourceSelector(event.target.value)
    }

    const handleJobType = event => {
        setJobTypeSelector(event.target.value)
    }

    const updateParams = title => {
        const job_source = jobSourceSelector !== 'all' ? jobSourceSelector : ''
        const job_type = jobTypeSelector !== 'all' ? jobTypeSelector : ''
        const techStackValues = techStackSelector.map(obj => obj.value).join(',')
        setJobsFilterParams({
            ...jobsFilterParams,
            tech_keywords: techStackValues,
            job_source,
            page: 1,
            ordering,
            job_visibility: jobVisibilitySelector,
            from_date: dates.from_date,
            to_date: dates.to_date,
            job_type,
            search: title,
        })
    }

    const resetFilters = () => {
        setData([])
        setPagesCount([])
        setTechStackData([])
        setJobSourceData([])
        setJobTypeData([])
        setJobSourceSelector('all')
        setTechStack([])
        setJobTypeSelector('all')
        setJobVisibilitySelector('recruiter')
        setDates({ from_date: '', to_date: '' })
        setStats({ total_jobs: 0, filtered_jobs: 0 })
        setJobTitle('')
        setOrdering('job_posted_date')
        setJobsFilterParams({
            job_source: '',
            tech_keywords: '',
            page: 1,
            from_date: '',
            to_date: '',
            job_type: '',
            ordering: 'job_posted_date',
            search: '',
            job_visibility: 'recruiter',
        })
    }

    const runJobFilter = () => {
        updateParams('')
    }
    useEffect(() => {
        fetchJobsData(jobDetailsUrl)
    }, [jobsFilterParams])

    const updateJobStatus = async id => {
        const response = await fetch(`${apiUrl}job_status/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token').slice(1, -1)}`,
            },
            body: JSON.stringify({ status: 1, job: data[id].id }),
        })

        const json = await response.json()

        if (response.ok) {
            const temp_data = data.map((item, key) => (key === id ? { ...item, job_status: 1 } : item))
            setData(temp_data)
            toast.success(json.detail)
        } else {
            toast.error(json.detail)
            setTimeout(() => {
                location.reload()
            }, 2000)
        }
    }
    const formatOptions = options_arr =>
        options_arr.map(({ name, value }) => ({ label: `${name} (${value})`, value: name }))

    const [page, setPage] = useState(1)
    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))

    return (
        <div className='my-2 h-screen text-[#048C8C] '>
            <div className='flex items-center space-x-4 py-2'>
                <Searchbox query={jobTitle} setQuery={setJobTitle} />
                <Filters apply={() => runJobFilter()} clear={() => resetFilters()} />
                <div className='flex justify-center space-x-4 my-2 grid-flow-col '>
                    <div>
                        <p>Total :</p>
                        <p>Filtered :</p>
                    </div>
                    <div className='justify-center  grid-flow-row '>
                        <div>
                            <Badge label={stats.total_jobs} type='enabled' />
                        </div>
                        <div>
                            <Badge label={stats.filtered_jobs} type='enabled' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-3 border'>
                {/* <div className='flex'>
                    <input
                        type='text'
                        className='shadow appearance-none border w-full py-2 px-3 mx-2'
                        value={jobTitle}
                        onChange={event => {
                            setJobTitle(event.target.value)
                        }}
                        placeholder='Search'
                    />
                    <button
                        className='px-4 py-2 block rounded bg-blue-600 text-white'
                        onClick={() => {
                            updateParams(jobTitle)
                        }}
                    >
                        Search
                    </button>
                </div> */}

                <div className='grid grid-cols-3 -my-2 gap-3'>
                    <div className='my-2'>
                        From
                        <input
                            className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                            type='date'
                            max={new Date().toISOString().slice(0, 10)}
                            value={dates.from_date}
                            onChange={event => setDates({ ...dates, from_date: event.target.value })}
                        />
                    </div>
                    <div className='my-2'>
                        To
                        <input
                            className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                            type='date'
                            max={new Date().toISOString().slice(0, 10)}
                            value={dates.to_date}
                            onChange={event => setDates({ ...dates, to_date: event.target.value })}
                        />
                    </div>
                    <div className='my-2'>
                        Listings
                        <Selector
                            data={jobTypeData}
                            selectorValue={jobTypeSelector}
                            handleSelectChange={handleJobType}
                        />
                    </div>
                    <div className='my-2'>
                        Job Source
                        <Selector
                            data={jobSourceData}
                            selectorValue={jobSourceSelector}
                            handleSelectChange={handleJobSource}
                        />
                    </div>

                    <div className='my-2'>
                        Order By
                        <select
                            value={ordering}
                            onChange={e => setOrdering(e.target.value)}
                            className='bg-gray-50 text-gray-900 text-sm focus:[#048C8C]-500 focus:border-[#048C8C]-500 block w-full p-2.5 rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer'
                        >
                            <option value='job_posted_date'>Posted Date</option>
                            <option value='job_title'>Job Title</option>
                            <option value='job_type'>Job Type</option>
                            <option value='company_name'>Company</option>
                        </select>
                    </div>

                    <div className='my-2'>
                        Job Visibility
                        <select
                            value={jobVisibilitySelector}
                            onChange={e => setJobVisibilitySelector(e.target.value)}
                            className='bg-gray-50 text-gray-900 text-sm focus:[#048C8C]-500 focus:border-[#048C8C]-500 block w-full p-2.5 rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer'
                        >
                            <option value='recruiter'>Recruiter</option>
                            <option value='non-recruiter'>Non-Recruriter</option>
                        </select>
                    </div>
                    <div className='my-2'>
                        Tech Stack
                        <CustomSelector
                            className='mx-auto'
                            options={formatOptions(techStackData)}
                            handleChange={setTechStack}
                            selectorValue={techStackSelector}
                            isMulti
                            placeholder='Select Tech Stack'
                        />
                    </div>
                </div>
            </div>
            <table className='table-auto w-full  text-sm text-left mt-6 text-[#048C8C] '>
                <thead className='text-sm uppercase border tex border-[#048C8C] '>
                    <tr>
                        {jobsHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 && error ? (
                        data.map((item, key) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={key}>
                                <td className='px-3 py-0'>{item.job_title}</td>
                                <td className='px-3 py-0'>{item.company_name}</td>
                                <td className='px-3 py-0'>
                                    <a
                                        className='underline'
                                        target='_blank'
                                        rel='noreferrer'
                                        href={item.job_source_url}
                                    >
                                        {item.job_source}
                                    </a>
                                </td>
                                <td className='px-3 py-0'>{item.tech_keywords}</td>
                                <td className='px-3 py-0'>{item.job_type}</td>
                                <td className='px-3 py-0'>{item.job_posted_date.slice(0, 10)}</td>
                                <td className='px-1 py-0'>
                                    {can('change_job_status') ? (
                                        item.job_status === 0 ? (
                                            <button
                                                className='block rounded px-2 py-1 my-3 bg-[#10868a] text-white'
                                                onClick={() => updateJobStatus(key)}
                                            >
                                                {jobStatusChoice[item.job_status]}
                                            </button>
                                        ) : (
                                            <button className='block rounded px-2 py-1 my-3 text-gray-400 bg-[#ffffff] '>
                                                {jobStatusChoice[item.job_status]}
                                            </button>
                                        )
                                    ) : null}
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

            <TableNavigate data={data} page={page} handleClick={handleClick} />
            {/* {!recordFound && <p className='text-center fs-4 text-danger'>Record not found!</p>} */}
        </div>
    )
})

export default JobsFilter
