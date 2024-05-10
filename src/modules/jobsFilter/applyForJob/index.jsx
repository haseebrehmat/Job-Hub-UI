import { memo, useMemo, useState, useReducer } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useSWRImmutable from 'swr/immutable'

import { useMutate } from '@/hooks'

import { CustomSelector, TextEditor, Loading, Button } from '@components'

import { ResumeSelect, VerticalSelect } from '@modules/jobsFilter/components'
import { fetchUserVerticals, applyJob } from '@modules/jobsFilter/api'

import { UPLOAD_RESUME_OPTIONS } from '@constants/jobPortal'

const ApplyForJob = () => {
    const { id } = useParams()
    const redirect = useNavigate()

    const [vals, setVals] = useReducer((prev, next) => ({ ...prev, ...next }), {
        verticalId: null,
        teamId: null,
        coverLetter: `Here your cover letter ${id}`,
    })
    const [pdfBlob, setPdfBlob] = useState(null)
    const [resumeType, setResumeType] = useState(null)
    const [resumePDF, setResumePDF] = useState('')

    const { data: data2, isLoading: isLoading2 } = useSWRImmutable(
        `/api/profile/generate/cover_letter/?vertical_id=${vals.verticalId}&job_id=${id}`,
        vals.verticalId ? fetchUserVerticals : null
    )

    const { wait, handleSubmit, trigger } = useMutate(
        '/api/job_portal/job_status/',
        applyJob,
        { status: 1, job: id, resume: pdfBlob, resume_type: resumeType?.value },
        null,
        async formValues => {
            trigger({
                ...formValues,
                cover_letter: vals.coverLetter,
                vertical_id: vals.verticalId,
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

    useMemo(() => setVals({ coverLetter: data2?.cover_letter }), [data2])

    if (isLoading2 || wait) return <Loading />
    return (
        <div className='max-w-full mb-14 px-5'>
            <form onSubmit={handleSubmit}>
                <div className='flex gap-5'>
                    <div className='flex flex-col space-y-4 w-1/2 bg-[#edfdfb] p-5 border border-gray-200 rounded-lg h-full md:mt-8'>
                        <div className='z-50'>
                            <VerticalSelect jobId={id} vId={vals.verticalId} teamId={vals.teamId} setVals={setVals} />
                            {vals.verticalId && (
                                <>
                                    <p className='text-gray-600 pt-2 pb-1'>Resume Type</p>
                                    <CustomSelector
                                        options={UPLOAD_RESUME_OPTIONS}
                                        placeholder='Select Resume Type'
                                        handleChange={value => {
                                            setResumeType(value)
                                        }}
                                        required
                                    />
                                </>
                            )}
                        </div>
                        {vals.verticalId && (
                            <>
                                <TextEditor
                                    init={data2?.cover_letter ?? `Here your cover letter ${id}`}
                                    value={vals.coverLetter}
                                    onChange={text => setVals({ coverLetter: text })}
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
                        {vals.verticalId &&
                            resumeType &&
                            (resumeType?.value === 'automatic' ? (
                                <ResumeSelect vertical={vals.verticalId} setResume={setPdfBlob} />
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
