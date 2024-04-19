import { memo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useSWRImmutable from 'swr/immutable'

import { useMutate } from '@/hooks'

import { CustomSelector, TextEditor, Loading, Button } from '@components'

import { ResumeSelect } from '@modules/jobsFilter/components'
import { fetchUserVerticals, applyJob } from '@modules/jobsFilter/api'

import { parseVerticals, decodeJwt, parseSelectedVertical } from '@utils/helpers'

const ApplyForJob = () => {
    const { user_id } = decodeJwt()
    const { id } = useParams()
    const redirect = useNavigate()

    const [pdfBlob, setPdfBlob] = useState(null)
    const [verticalId, setVerticalId] = useState(null)

    const { data: data1, isLoading: isLoading1 } = useSWRImmutable(
        `/api/profile/user_vertical/?user_id=${user_id}`,
        fetchUserVerticals
    )
    const { data: data2, isLoading: isLoading2 } = useSWRImmutable(
        `/api/profile/generate/cover_letter/?vertical_id=${verticalId}&job_id=${id}`,
        verticalId ? fetchUserVerticals : null
    )

    const { values, wait, handleSubmit, trigger, setFieldValue } = useMutate(
        '/api/job_portal/job_status/',
        applyJob,
        { status: 1, vertical_id: verticalId, job: id, cover_letter: '', resume: pdfBlob },
        null,
        async formValues => trigger({ ...formValues }),
        null,
        () => redirect('jobs-portal')
    )

    if (isLoading1 || isLoading2 || wait) return <Loading />
    return (
        <div className='max-w-full mb-14 px-5'>
            <form onSubmit={handleSubmit}>
                <div className='flex gap-5'>
                    <div className='flex flex-col space-y-4 w-1/2 bg-[#edfdfb] p-5 border border-gray-200 rounded-lg h-full md:mt-8'>
                        <div className='z-50'>
                            <p className='italic text-gray-600 py-2'>Select Vertical</p>
                            <CustomSelector
                                options={parseVerticals(data1)}
                                selectorValue={parseSelectedVertical(values.vertical_id, data1)}
                                handleChange={({ value }) => {
                                    setVerticalId(value)
                                    setFieldValue('vertical_id', value)
                                }}
                                placeholder='Select vertical'
                            />
                        </div>
                        {verticalId && (
                            <>
                                <TextEditor
                                    init={data2?.cover_letter ?? `Here your cover letter ${id}`}
                                    name='cover_letter'
                                    onChange={text => setFieldValue('cover_letter', text)}
                                />
                                <Button label='Apply' type='submit' fill fit classes='px-8 md:px-12 !rounded-full' />
                            </>
                        )}
                    </div>
                    <div className='xs:w-1/2'>
                        {verticalId && <ResumeSelect vertical={verticalId} setResume={setPdfBlob} />}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default memo(ApplyForJob)
