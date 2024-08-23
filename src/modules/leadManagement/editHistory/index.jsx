import { memo } from 'react'
import { useParams } from 'react-router-dom'

import { Input } from '@components'

import { formatDate } from '@utils/helpers'
import { today } from '@constants/dashboard'

const HistoryLog = ({ f = true, s = true, t = true, fth = true }) => (
    <div className='w-full mx-auto pl-3'>
        <ol className='border-l border-neutral-300'>
            {f && (
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 w-fit'>
                            changed <span className='font-semibold italic'>status</span> from
                            <span className='font-bold ml-1 line-through tracking-wider'>Status 1</span> to
                            <span className='font-semibold ml-1 tracking-wider'>Status 1</span>
                        </p>
                    </div>
                </li>
            )}
            {s && (
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 w-fit'>
                            changed <span className='font-semibold italic'>phase</span> from
                            <span className='font-bold ml-1 line-through tracking-wider'>Status 1</span> to
                            <span className='font-semibold ml-1 tracking-wider'>Status 2 Updated</span>
                        </p>
                    </div>
                </li>
            )}
            {t && (
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 w-fit'>
                            changed <span className='font-semibold italic'>effective_date</span> from
                            <span className='font-bold ml-1 line-through tracking-wider'>Status 1</span> to
                            <span className='font-semibold ml-1 tracking-wider'>Status 2 Updated</span>
                        </p>
                    </div>
                </li>
            )}
            {fth && (
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 w-fit'>
                            changed <span className='font-semibold italic'>due_date</span> from
                            <span className='font-bold ml-1 line-through tracking-wider'>Status 1</span> to
                            <span className='font-semibold ml-1 tracking-wider'>Status 3 Newly Updated</span>
                        </p>
                    </div>
                </li>
            )}
        </ol>
    </div>
)

const EditHistory = () => {
    const { id } = useParams()

    return (
        <div className='flex flex-col gap-2 px-4'>
            <Input ph='Search the history' classes='!w-1/3 mb-2' />
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        <th scope='col' className='p-3'>
                            Date
                        </th>
                        <th scope='col' className='p-3'>
                            User
                        </th>
                        <th scope='col' className='p-3'>
                            Changes
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='w-1/6 p-3'>{formatDate(today)}</td>
                        <td className='p-3'>ahsan riaz</td>
                        <td className='w-8/12 p-2'>
                            <HistoryLog f={false} />
                        </td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='w-1/6 p-3'>{formatDate(today)}</td>
                        <td className='p-3'>haseeb</td>
                        <td className='w-8/12 p-2'>
                            <HistoryLog />
                        </td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='w-1/6 p-3'>{formatDate(today)}</td>
                        <td className='p-3'>usman lala</td>
                        <td className='w-8/12 p-2'>
                            <HistoryLog f={false} s={false} t={false} />
                        </td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='w-1/6 p-3'>{formatDate(today)}</td>
                        <td className='p-3'>{id} riaz</td>
                        <td className='w-8/12 p-2'>
                            <HistoryLog f={false} s={false} />
                        </td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='w-1/6 p-3'>{formatDate(today)}</td>
                        <td className='p-3'>haseeb</td>
                        <td className='w-8/12 p-2'>
                            <HistoryLog s={false} />
                        </td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='w-1/6 p-3'>{formatDate(today)}</td>
                        <td className='p-3'>usman lala</td>
                        <td className='w-8/12 p-2'>
                            <HistoryLog f={false} s={false} t={false} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default memo(EditHistory)
