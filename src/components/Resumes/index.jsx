import { memo, useState, useRef, useEffect } from 'react'
import html2pdf from 'html2pdf.js'

import { Button } from '@components'

import { Template1, Template2, Template3, Template4 } from '@modules/settings/templates'

import { RESUME_PDF_OPTIONS } from '@constants/jobPortal'

import { SelectedIcon, DownloadIcon } from '@icons'

const Resumes = ({ data, hide, names, set = null }) => {
    const templateRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]
    const [tab, setTab] = useState(0)
    const [selectedDiv, setSelectedDiv] = useState(templateRefs[0])

    const templatesArray = [
        <Template1 data={data} hide={hide} names={names} />,
        <Template2 data={data} hide={hide} names={names} />,
        <Template3 data={data} hide={hide} names={names} />,
        <Template4 data={data} hide={hide} names={names} />,
    ]

    const setBlob = reference =>
        set
            ? html2pdf()
                  .set(RESUME_PDF_OPTIONS)
                  .from(reference?.current?.innerHTML)
                  .output('blob')
                  .then(blob => set(blob))
            : null
    const handleClick = (index, ref) => {
        setTab(index)
        setSelectedDiv(ref)
        setBlob(ref)
    }
    const downloadPdf = () => html2pdf().set(RESUME_PDF_OPTIONS).from(selectedDiv.current?.innerHTML).outputPdf().save()

    useEffect(() => {
        setBlob(selectedDiv)
    }, [])

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-row mb-5 gap-5'>
                {Array.from({ length: templatesArray.length }).map((_, i) => (
                    <Button
                        key={i}
                        label={`Template ${i + 1}`}
                        fit
                        fill={tab === i}
                        icon={tab === i && SelectedIcon}
                        classes={`md:px-6 rounded-none ${tab !== i && 'border-gray-200'}`}
                        onClick={() => handleClick(i, templateRefs[i])}
                    />
                ))}
            </div>
            <div className='p-8 bg-white shadow-2xl border-2 rounded-lg'>
                {templatesArray.map(
                    (component, index) =>
                        tab === index && (
                            <div className='__template-wrapper' key={index} ref={templateRefs[index]}>
                                {component}
                            </div>
                        )
                )}
            </div>
            <Button label='Download' icon={DownloadIcon} fit fill onClick={downloadPdf} classes='!m-4' />
        </div>
    )
}

export default memo(Resumes)
