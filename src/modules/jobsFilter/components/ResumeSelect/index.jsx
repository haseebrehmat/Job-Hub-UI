import { memo, useState, useRef, useEffect } from 'react'
import useSWR from 'swr'
import html2pdf from 'html2pdf.js'

import { Button, Loading } from '@components'

import { Template1, Template2, Template3 } from '@modules/settings/templates'
import { fetchProfile } from '@modules/profile/api'

import { RESUME_PDF_OPTIONS } from '@constants/jobPortal'

import { SelectedIcon, DownloadIcon } from '@icons'

const ResumeSelect = ({ vertical, setResume }) => {
    const [tab, setTab] = useState(0)
    const templateRefs = [useRef(null), useRef(null), useRef(null)]
    const [selectedDiv, setSelectedDiv] = useState(templateRefs[0])

    const { data, isLoading } = useSWR(`/api/profile/resume/${vertical}/`, fetchProfile)

    const handleClick = (index, ref) => {
        setTab(index)
        setSelectedDiv(ref)
    }

    const downloadPdf = () => html2pdf().set(RESUME_PDF_OPTIONS).from(selectedDiv.current?.innerHTML).outputPdf().save()

    useEffect(() => {
        html2pdf()
            .set(RESUME_PDF_OPTIONS)
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
                <Button
                    label='Template 3'
                    fit
                    fill={tab === 2}
                    icon={tab === 2 && SelectedIcon}
                    classes={`md:px-6 rounded-none ${tab !== 2 && 'border-gray-200'}`}
                    onClick={() => handleClick(2, templateRefs[2])}
                />
            </div>
            <div className='p-8 bg-white shadow-2xl border-2 rounded-lg'>
                {tab === 0 && (
                    <div ref={templateRefs[0]} className='md:w-[21cm] md:min-h-[29.7cm] w-full h-full'>
                        <Template1 data={data.profile} />
                    </div>
                )}
                {tab === 1 && (
                    <div ref={templateRefs[1]} className='md:w-[21cm] md:min-h-[29.7cm] w-full h-full'>
                        <Template2 data={data.profile} />
                    </div>
                )}
                {tab === 2 && (
                    <div ref={templateRefs[2]} className='md:w-[21cm] md:min-h-[29.7cm] w-full h-full'>
                        <Template3 data={data.profile} />
                    </div>
                )}
            </div>
            <Button label='Download' icon={DownloadIcon} fit fill onClick={downloadPdf} classes='!m-4' />
        </div>
    )
}

export default memo(ResumeSelect)
