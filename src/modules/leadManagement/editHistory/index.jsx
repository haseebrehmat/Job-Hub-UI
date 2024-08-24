import { memo } from 'react'
import { useParams } from 'react-router-dom'

import { Input } from '@components'

import { LeadChanges } from '@modules/leadManagement/components'

import { formatDate, timeSince } from '@utils/helpers'
import { LEAD_HISTORY_HEADS } from '@constants/leadManagement'
import { today } from '@constants/dashboard'

const EditHistory = () => {
    const { id } = useParams()

    return (
        <div className='flex flex-col gap-2 px-4'>
            <Input ph='Search the history' classes='!w-1/4 mb-2 float-right' />
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {LEAD_HISTORY_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading?.lg ? (
                                    <>
                                        {heading?.lg} <span className='!text-xs !font-normal'>{heading?.sm}</span>
                                    </>
                                ) : (
                                    heading
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='p-3'>1</td>
                        <td className='w-1/6 p-3'>
                            {timeSince(today)} <span className='block text-[13px]'>{formatDate(today)}</span>
                        </td>
                        <td className='p-3'>ahsan riaz</td>
                        <td className='w-8/12 p-2'>
                            <LeadChanges />
                        </td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='p-3'>1</td>
                        <td className='w-1/6 p-3'>
                            {timeSince(today)} <span className='block text-[13px]'>{formatDate(today)}</span>
                        </td>
                        <td className='p-3'>haseeb</td>
                        <td className='w-8/12 p-2'>
                            <LeadChanges />
                        </td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='p-3'>1</td>
                        <td className='w-1/6 p-3'>
                            {timeSince(today)} <span className='block text-[13px]'>{formatDate(today)}</span>
                        </td>
                        <td className='p-3'>usman lala</td>
                        <td className='w-8/12 p-2'>
                            <LeadChanges />
                        </td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='p-3'>1</td>
                        <td className='w-1/6 p-3'>
                            {timeSince(today)} <span className='block text-[13px]'>{formatDate(today)}</span>
                        </td>
                        <td className='p-3'>{id} riaz</td>
                        <td className='w-8/12 p-2'>
                            <LeadChanges />
                        </td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='p-3'>1</td>
                        <td className='w-1/6 p-3'>
                            {timeSince(today)} <span className='block text-[13px]'>{formatDate(today)}</span>
                        </td>
                        <td className='p-3'>haseeb</td>
                        <td className='w-8/12 p-2'>
                            <LeadChanges />
                        </td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'>
                        <td className='p-3'>1</td>
                        <td className='w-1/6 p-3'>
                            {timeSince(today)} <span className='block text-[13px]'>{formatDate(today)}</span>
                        </td>
                        <td className='p-3'>usman lala</td>
                        <td className='w-8/12 p-2'>
                            <LeadChanges />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default memo(EditHistory)
