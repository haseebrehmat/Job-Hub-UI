import { memo, useMemo, useState } from 'react'
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
    const [coverLetter, setCoverLetter] = useState(`Here your cover letter ${id}`)

    const [resumeType, setResumeType] = useState(null)
    const uploadResumeOptions = [
        { label: 'Choose resume from templates', value: 'automatic' },
        { label: 'Upload resume manually', value: 'manual' },
    ]

    const [resumePDF, setResumePDF] = useState('')
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
        {
            status: 1,
            vertical_id: verticalId,
            job: id,
            resume: pdfBlob,
            resume_type: resumeType?.value,
        },
        null,
        async formValues => {
            trigger({
                ...formValues,
                cover_letter: coverLetter,
                resume:
                    resumeType?.value === 'automatic'
                        ? pdfBlob
                        : resumeType?.value === 'manual' && resumePDF
                        ? resumePDF
                        : null,
            })
        },
        null,
        () => redirect('/jobs-portal')
    )

    useMemo(() => setCoverLetter(data2?.cover_letter), [data2])

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
                            {verticalId && (
                                <>
                                    <p className='italic text-gray-600 py-2'>Resume Type</p>
                                    <CustomSelector
                                        options={uploadResumeOptions}
                                        placeholder='Select Resume Type'
                                        handleChange={value => {
                                            setResumeType(value)
                                        }}
                                        required
                                    />
                                </>
                            )}
                        </div>
                        {verticalId && (
                            <>
                                <TextEditor
                                    init={data2?.cover_letter ?? `Here your cover letter ${id}`}
                                    value={coverLetter}
                                    onChange={text => setCoverLetter(text)}
                                />
                                {resumeType && (
                                    <Button
                                        label='Apply'
                                        type='submit'
                                        fill
                                        fit
                                        classes='px-8 md:px-12 !rounded-full'
                                    />
                                )}{' '}
                            </>
                        )}
                    </div>
                    <div className='xs:w-1/2'>
                        {verticalId &&
                            resumeType &&
                            (resumeType?.value === 'automatic' ? (
                                <ResumeSelect vertical={verticalId} setResume={setPdfBlob} />
                            ) : (
                                <div className='bg-[#edfdfb] p-5 border border-gray-200 text-center rounded-lg md:mt-8 border-1 text-gray-600'>
                                    <p>Upload Resume in PDF</p>
                                    <p className='my-3'>
                                        <input
                                            type='file'
                                            accept='.pdf'
                                            name='resume'
                                            onChange={e => {
                                                setResumePDF(e.target.files[0])
                                            }}
                                            required
                                        />
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default memo(ApplyForJob)
