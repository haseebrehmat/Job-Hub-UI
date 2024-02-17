import { useState, memo, useEffect } from 'react'
import Selector from './components/Selector'
import ReactPaginate from 'react-paginate'
import ClipLoader from 'react-spinners/ClipLoader'
import toast from 'react-hot-toast'
import jwt_decode from 'jwt-decode'

const JobsFilter = memo(() => {
    const apiUrl = `${import.meta.env.VITE_SCRAPPER_API_URL}api/job_portal/`
    const role = jwt_decode(localStorage.getItem('token')).role
    const [data, setData] = useState([])
    const [pagesCount, setPagesCount] = useState([])
    const [techStackData, setTechStackData] = useState([])
    const [jobSourceData, setJobSourceData] = useState([])
    const [jobTypeData, setJobTypeData] = useState([])
    const [jobSourceSelector, setJobSourceSelector] = useState('all')
    const [techStackSelector, setTechStack] = useState('all')
    const [jobTypeSelector, setJobTypeSelector] = useState('all')
    const [stats, setStats] = useState({ total_jobs: 0, filtered_jobs: 0 })
    const [jobStatusChoice, setJobStatusChoice] = useState({})
    // YYYY-MM-DD
    const [dates, setDates] = useState({ from_date: '', to_date: '' })
    const jobDetailsUrl = `${apiUrl}job_details/`
    const [jobTitle, setJobTitle] = useState('')
    const [ordering, setOrdering] = useState('job_posted_date')
    const [sortBy, setSortBy] = useState('asc')
    const [jobsFilterParams, setJobsFilterParams] = useState({
        job_source: '',
        tech_keywords: '',
        page: 1,
        from_date: '',
        to_date: '',
        job_type: '',
        ordering,
        search: '',
    })

    const resetFilters = () => {
        setJobSourceSelector('all')
        setTechStack('all')
        setJobTypeSelector('all')
        setDates({ from_date: '', to_date: '' })
        setJobTitle('')
        setOrdering('job_posted_date')
        setSortBy('asc')
    }

    const [recordFound, setRecordFound] = useState(true)

    const fetchJobsData = url => {
        let params = new URLSearchParams()
        let params_count = 0
        for (let i in jobsFilterParams) {
            if (jobsFilterParams[i] !== '') {
                params.append(i, jobsFilterParams[i])
                params_count += 1
            }
        }
        url = params_count > 0 ? `${url}?${params.toString()}` : url
        setData([])
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token').slice(1, -1)}`,
            },
        })
            .then(resp => {
                if (!resp.ok) {
                    throw Error(resp)
                }
                return resp.json()
            })
            .then(resp => {
                setStats({
                    ...stats,
                    total_jobs: resp.total_jobs,
                    filtered_jobs: resp.filtered_jobs,
                })
                setData(resp.data)
                if (resp.data.length === 0) {
                    setRecordFound(false)
                } else {
                    setRecordFound(true)
                }
                setJobStatusChoice(resp.job_status_choice)
                setTechStackData(resp.tech_keywords_count_list)
                setJobSourceData(resp.job_source_count_list)
                setJobTypeData(resp.total_job_type)
                setPagesCount(resp.links.num_pages)
            })
            .catch(error => {
                setRecordFound(false)
            })
    }

    const handleJobSource = event => {
        setJobSourceSelector(event.target.value)
    }

    const handleTechStack = event => {
        setTechStack(event.target.value)
    }

    const handleJobType = event => {
        setJobTypeSelector(event.target.value)
    }

    const updateParams = title => {
        const job_source = jobSourceSelector !== 'all' ? jobSourceSelector : ''
        const tech_keyword = techStackSelector !== 'all' ? techStackSelector : ''
        const job_type = jobTypeSelector !== 'all' ? jobTypeSelector : ''
        setJobsFilterParams({
            ...jobsFilterParams,
            tech_keywords: tech_keyword,
            job_source,
            page: 1,
            ordering: sortBy === 'asc' ? ordering : `-${ordering}`,
            from_date: dates.from_date,
            to_date: dates.to_date,
            job_type,
            search: title,
        })
    }

    const runJobFilter = () => {
        updateParams('')
    }

    useEffect(() => {
        fetchJobsData(jobDetailsUrl)
    }, [jobsFilterParams])

    const updateJobStatus = id => {
        fetch(`${apiUrl}job_status/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token').slice(1, -1)}`,
            },
            body: JSON.stringify({ status: 1, job: data[id].id }),
        })
            .then(resp => {
                if (!resp.ok) {
                    throw Error(resp)
                }
                return resp.json()
            })
            .then(resp => {
                const temp_data = data.map((item, key) => (key === id ? { ...item, job_status: 1 } : item))
                setData(temp_data)
                toast.success('Job applied successfully!')
            })
            .catch(error => {
                const temp_data = data.map((item, key) => (key === id ? { ...item, job_status: 1 } : item))
                setData(temp_data)
                toast.error('This job is already applied!')
            })
    }
    const handlePageClick = async data => {
        setJobsFilterParams({
            ...jobsFilterParams,
            page: data.selected + 1,
        })
    }

    return (
        <div className='my-2'>
            <h3 className='text-center py-2 pl-4 text-[#006366] font-bold text-lg'>Jobs Portal</h3>
            <div className='p-3 border'>
                <div className='flex'>
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
                        className='px-4 py-2 block rounded bg-blue-500 text-white'
                        onClick={() => {
                            updateParams(jobTitle)
                        }}
                    >
                        Search
                    </button>
                </div>

                <div className='grid grid-cols-4 gap-3'>
                    <div className='my-2'>
                        From
                        <input
                            className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                            type='date'
                            value={dates.from_date}
                            onChange={event => setDates({ ...dates, from_date: event.target.value })}
                        />
                    </div>
                    <div className='my-2'>
                        To
                        <input
                            className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                            type='date'
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
                        Tech Stack
                        <Selector
                            data={techStackData}
                            selectorValue={techStackSelector}
                            handleSelectChange={handleTechStack}
                        />
                    </div>
                    <div className='my-2'>
                        Order By
                        <select
                            value={ordering}
                            onChange={e => setOrdering(e.target.value)}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                            <option value='job_posted_date'>Posted Date</option>
                            <option value='job_title'>Job Title</option>
                            <option value='job_type'>Job Type</option>
                            <option value='company_name'>Company</option>
                        </select>
                    </div>

                    <div className='my-2'>
                        Sort By
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                            <option value='asc'>Ascending</option>
                            <option value='desc'>Descending</option>
                        </select>
                    </div>
                </div>

                <div className='flex justify-center space-x-5 my-2'>
                    <div>
                        <h3>Total Jobs: {stats.total_jobs}</h3>
                    </div>
                    <div>
                        <h3>Filtered Jobs: {stats.filtered_jobs}</h3>
                    </div>
                </div>
                <div className='col-md-4 col-12 flex justify-center space-x-5'>
                    <button className='px-4 py-2 block rounded bg-green-800 text-white'>Check Status</button>
                    <button className='px-4 py-2 block rounded bg-gray-500 text-white' onClick={resetFilters}>
                        Reset
                    </button>
                    <button className='px-4 py-2 block rounded bg-blue-500 text-white' onClick={runJobFilter}>
                        Filter
                    </button>
                </div>
            </div>

            <table className='border border-slate-400 table-auto w-full text-sm border-collapse my-2'>
                <thead className='bg-slate-50 dark:bg-slate-700'>
                    <tr className='w-1/2 border border-slate-300 dark:border-slate-600 font-semibold text-slate-900 dark:text-slate-200 text-left'>
                        <th className='p-2'>Job Title</th>
                        <th className='d-sm-table-cell d-none'>Company</th>
                        <th>Job Source</th>
                        <th>Tech Stack</th>
                        <th>Job Type</th>
                        <th>Date Posted</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 &&
                        data.map((item, key) => (
                            <tr
                                className='border border-slate-300 dark:border-slate-700  text-slate-500 dark:text-slate-400'
                                key={key}
                            >
                                <td className='text-start p-2 rounded text-sm shadow-sm'>{item.job_title}</td>
                                <td className='d-sm-table-cell d-none text-start'>{item.company_name}</td>
                                <td>
                                    <a href={item.job_source_url}>{item.job_source}</a>
                                </td>
                                <td>{item.tech_keywords}</td>
                                <td>{item.job_type}</td>
                                <td>{item.job_posted_date.slice(0, 10)}</td>
                                <td>
                                    {item.job_status === 0 ? (
                                        <button
                                            disabled={role === 'TL'}
                                            className='block rounded px-2 py-1 bg-green-700 text-white'
                                            onClick={() => updateJobStatus(key)}
                                        >
                                            {jobStatusChoice[item.job_status]}
                                        </button>
                                    ) : (
                                        jobStatusChoice[item.job_status]
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {data.length === 0 && recordFound && (
                <div className='flex justify-center my-2'>
                    <ClipLoader color='#36d7b7' size={60} />
                </div>
            )}

            {recordFound && (
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='Next'
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    pageCount={Math.ceil(pagesCount)}
                    previousLabel='Previous'
                    renderOnZeroPageCount={null}
                    containerClassName='flex justify-center my-2'
                    pageLinkClassName='bg-white border-gray-300 text-gray-500 hover:bg-blue-900 hover:text-white relative inline-flex items-center px-2 py-1 border text-sm font-medium'
                    previousClassName='bg-blue-500 text-white border-gray-300 hover:bg-blue-900 hover:text-white relative inline-flex items-center px-2 py-1 border text-sm font-medium'
                    nextClassName='bg-blue-500 text-white border-gray-300 hover:bg-blue-900 hover:text-white relative inline-flex items-center px-2 py-1 border text-sm font-medium'
                    breakLinkClassName='bg-white border-gray-300 text-gray-500 hover:bg-blue-900 hover:text-white relative inline-flex items-center px-2 py-1 border text-sm font-medium'
                    activeLinkClassName='bg-green-700 text-white'
                    activeClassName='active'
                />
            )}

            {!recordFound && <p className='text-center fs-4 text-danger'>Record not found!</p>}
        </div>
    )
})

export default JobsFilter
