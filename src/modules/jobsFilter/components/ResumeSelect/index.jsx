import { memo, useState, useRef, useEffect } from 'react'
import useSWR from 'swr'
import html2pdf from 'html2pdf.js'

import { Button, Loading } from '@components'

import Template1 from '@modules/settings/resumeBuilder/template1'
import Template2 from '@modules/settings/resumeBuilder/template2'
import { fetchProfile } from '@modules/profile/api'

import { SelectedIcon } from '@icons'

const ResumeSelect = ({ vertical, setResume }) => {
    const [tab, setTab] = useState(0)
    const templateRefs = [useRef(null), useRef(null)]
    const [selectedDiv, setSelectedDiv] = useState(templateRefs[0])

    const { data, isLoading } = useSWR(`/api/profile/resume/${vertical}/`, fetchProfile)

    const handleClick = (index, ref) => {
        setTab(index)
        setSelectedDiv(ref)
    }

    useEffect(() => {
        const options = {
            margin: 0.25,
            filename: 'resume.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        }
        html2pdf()
            .set(options)
            .from(selectedDiv?.current?.innerHTML)
            .output('blob')
            .then(blob => setResume(blob))
    }, [vertical, selectedDiv, data])

    if (isLoading) return <Loading />
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-row mb-5 gap-5'>
                <Button
                    label='Template 1'
                    fit
                    fill={tab === 0}
                    icon={tab === 0 && SelectedIcon}
                    classes={`md:px-6 rounded-none ${tab !== 0 && 'border-gray-200'}`}
                    onClick={() => handleClick(0, templateRefs[0])}
                />
                <Button
                    label='Template 2'
                    fit
                    fill={tab === 1}
                    icon={tab === 1 && SelectedIcon}
                    classes={`md:px-6 rounded-none ${tab !== 1 && 'border-gray-200'}`}
                    onClick={() => handleClick(1, templateRefs[1])}
                />
            </div>
            {tab === 0 && (
                <div ref={templateRefs[0]} className='w-full'>
                    <Template1 data={data.profile} />
                </div>
            )}
            {tab === 1 && (
                <div ref={templateRefs[1]}>
                    <Template2 data={data.profile} />
                </div>
            )}
        </div>
    )
}

export default memo(ResumeSelect)
