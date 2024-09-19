import { memo, useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import { jsPDF as JsPDF } from 'jspdf'

import { Button } from '@components'

import {
    Template1,
    Template2,
    Template3,
    Template4,
    Template5,
    Template6,
    Template7,
    Template8,
    Template9,
    Template10,
} from '@modules/settings/templates'

import { devProfile } from '@modules/settings/resumeBuilder/devProfile'
import { htmlToPng } from '@utils/helpers'

import { DownloadIcon } from '@icons'

const Resumes = ({ data, hide, names, set = null }) => {
    const refs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ]
    const [tab, setTab] = useState(0)
    const convertTemplate = async (ref, conversion = 'pdf') => {
        await htmlToPng(ref, { name: 'download' }, false)
            .then(dataUrl => {
                const img = new Image()
                img.src = dataUrl
                img.onload = () => {
                    const pdfWidth = 8.5
                    const pdfHeight = (img.height * pdfWidth) / img.width
                    const pdf = new JsPDF({
                        unit: 'in',
                        floatPrecision: 'smart',
                        format: [pdfWidth, pdfHeight],
                    })
                    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
                    if (conversion === 'pdf') {
                        pdf.save('export.pdf')
                    } else if (conversion === 'blob') {
                        const bloob = pdf.output('blob')
                        set(bloob)
                    } else {
                        toast.error('Conversion type is inappropriate')
                    }
                }
            })
            .catch(err => {
                toast.error(err)
            })
    }

    const setBlob = reference => (set ? convertTemplate(reference?.current) : null)
    const downloadPdf = () => convertTemplate(refs[tab].current)

    useEffect(() => {
        setBlob(refs[tab])
    }, [tab])

    const getTemplates = (profile, gethide, name) => [
        <Template1 data={profile} hide={gethide} names={name} />,
        <Template2 data={profile} hide={gethide} names={name} />,
        <Template6 data={profile} hide={gethide} names={name} />,
        <Template9 data={profile} hide={gethide} names={name} />,
        <Template3 data={profile} hide={gethide} names={name} />,
        <Template10 data={profile} hide={gethide} names={name} />,
        <Template4 data={profile} hide={gethide} names={name} />,
        <Template5 data={profile} hide={gethide} names={name} />,
        <Template7 data={profile} hide={gethide} names={name} />,
        <Template8 data={profile} hide={gethide} names={name} />,
    ]
    return (
        <div className='w-fit'>
            <div className='flex flex-col-2 mx-auto'>
                <div className='w-[75%]'>
                    <div className='bg-white shadow-2xl border-2 rounded-lg h-screen overflow-y-auto'>
                        {getTemplates(data, hide, names).map(
                            (component, index) =>
                                tab === index && (
                                    <div key={index}>
                                        <div ref={refs[index]}>{component}</div>
                                    </div>
                                )
                        )}
                    </div>
                    <div>
                        <Button label='Download' icon={DownloadIcon} fit fill onClick={downloadPdf} classes='!m-4' />
                    </div>
                </div>
                <div className='2xl:w-[30%] xl:w-[20%] border-2 rounded-lg h-screen'>
                    <div className='bg-[#048C8C] border-2 rounded-lg py-4 text-center text-white text-xl font-semibold'>
                        Templates
                    </div>
                    <div className='h-[90%] grid 2xl:grid-cols-2 xl:grid-cols-1 3xl:grid-cols-3 hide_scrollbar overflow-y-auto gap-y-56'>
                        {getTemplates(devProfile, hide, names).map((component, index) => (
                            <div className='h-6 transform scale-[20%] w-[20%]' key={index}>
                                <div
                                    className={`${
                                        index === tab ? 'border-zinc-800 border-r-2' : 'bg-white '
                                    }shadow-2xl border-2 rounded-lg w-[21cm] min-h-[29.7cm] hover:cursor-pointer hover:bg-[#F2F2F2] h-2`}
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
            <div id='test-canvas' />
        </div>
    )
}

export default memo(Resumes)
