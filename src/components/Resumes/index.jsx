import { memo, useState, useRef, useEffect } from 'react'
import html2pdf from 'html2pdf.js'

import { Button } from '@components'

import { Template1, Template2, Template3, Template4, Template5 } from '@modules/settings/templates'

import { devProfile } from '@modules/settings/resumeBuilder/devProfile'

import { RESUME_PDF_OPTIONS } from '@constants/jobPortal'

import { DownloadIcon } from '@icons'

const getTemplates = (data, hide, names) => [
    <Template1 data={data} hide={hide} names={names} />,
    <Template2 data={data} hide={hide} names={names} />,
    <Template3 data={data} hide={hide} names={names} />,
    <Template4 data={data} hide={hide} names={names} />,
    <Template5 data={data} hide={hide} names={names} />,
]

const Resumes = ({ data, hide, names, set = null }) => {
    const refs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
    const [tab, setTab] = useState(0)
    const setBlob = reference =>
        set
            ? html2pdf()
                  .set(RESUME_PDF_OPTIONS)
                  .from(reference?.current?.innerHTML)
                  .output('blob')
                  .then(blob => set(blob))
            : null

    const downloadPdf = () => html2pdf().set(RESUME_PDF_OPTIONS).from(refs[tab].current?.innerHTML).outputPdf().save()

    useEffect(() => {
        setBlob(refs[tab])
    }, [tab])

    return (
        <div className='w-fit'>
            <div className='flex flex-col-2 mx-auto'>
                <div className='w-[75%]'>
                    <div className='p-8 bg-white shadow-2xl border-2 rounded-lg h-screen overflow-y-auto'>
                        {getTemplates(data, hide, names).map(
                            (component, index) =>
                                tab === index && (
                                    <div key={index}>
                                        <div className='__template-wrapper' ref={refs[index]}>
                                            {component}
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                    <div>
                        <Button label='Download' icon={DownloadIcon} fit fill onClick={downloadPdf} classes='!m-4' />
                    </div>
                </div>
                <div className='w-[30%] border-2 rounded-lg h-screen'>
                    <div className='bg-[#048C8C] border-2 rounded-lg py-4 text-center text-white text-xl font-semibold'>
                        Templates
                    </div>
                    <div className='h-[90%] grid 2xl:grid-cols-2 xl:grid-cols-1 3xl:grid-cols-3 hide_scrollbar overflow-y-auto gap-y-56'>
                        {getTemplates(devProfile, hide, names).map((component, index) => (
                            <div className='h-6 transform scale-[20%] w-[20%]'>
                                <div
                                    className='p-8 bg-white shadow-2xl border-2 rounded-lg w-[21cm] min-h-[29.7cm] hover:cursor-pointer hover:bg-[#F2F2F2] h-6'
                                    key={index}
                                    onClick={() => setTab(index)}
                                >
                                    {component}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Resumes)
