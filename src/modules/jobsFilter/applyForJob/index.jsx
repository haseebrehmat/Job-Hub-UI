import { memo, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import html2pdf from 'html2pdf.js'

import { CustomSelector, TextEditor, Button } from '@components'

import Template1 from '@modules/settings/resumeBuilder/template1'
import Template2 from '@modules/settings/resumeBuilder/template2'
import { devProfile } from '@modules/settings/resumeBuilder/devProfile'

import { parsePlatform } from '@utils/helpers'
import { SOCIAL_PLATFORM_OPTIONS } from '@constants/pseudos'

import { SelectedIcon } from '@icons'

const ApplyForJob = () => {
    const { id } = useParams()
    const templateRefs = [useRef(null), useRef(null)]
    const [selectedDiv, setSelectedDiv] = useState(templateRefs[0])
    const [tab, setTab] = useState(0)
    const [pdfBlob, setPdfBlob] = useState(null)

    const handleClick = (index, ref) => {
        setTab(index)
        setSelectedDiv(ref)
    }

    useMemo(() => {
        const options = {
            margin: 0.25,
            filename: 'resume.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        }
        html2pdf()
            .set(options)
            .from(selectedDiv?.current?.innerHTML)
            .output('blob')
            .then(blob => setPdfBlob(blob))
    }, [selectedDiv])

    return (
        <div className='max-w-full mb-14 px-5'>
            <div className='flex gap-5'>
                <div className='flex flex-col space-y-4 w-1/2 bg-[#edfdfb] p-5 border border-gray-200 rounded-lg h-full'>
                    <div className='z-20'>
                        <p className='italic text-gray-600 py-2'>Select Vertical</p>
                        <CustomSelector
                            options={SOCIAL_PLATFORM_OPTIONS}
                            selectorValue={parsePlatform('facebook')}
                            handleChange={({ value }) => console.log(value)}
                            placeholder='Select vertical'
                        />
                    </div>
                    <TextEditor init={`Here your cover letter ${id}`} onChange={text => console.log(text)} />
                </div>
                <div className='xs:w-1/2'>
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
                                <Template1 data={devProfile} />
                            </div>
                        )}
                        {tab === 1 && (
                            <div ref={templateRefs[1]}>
                                <Template2 data={devProfile} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ApplyForJob)
