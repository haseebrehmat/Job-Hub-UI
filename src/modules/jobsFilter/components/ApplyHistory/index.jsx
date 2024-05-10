import { memo } from 'react'

import { formatDate } from '@utils/helpers'

const ApplyHistory = ({ history }) => (
    <div className='flex flex-col bg-white border p-3 space-y-1 mb-4'>
        <p className='text-lg'>Job Apply History</p>
        <hr className='pb-2' />
        <table>
            <thead>
                <th>Vertical</th>
                <th>Team</th>
                <th>Applied At</th>
            </thead>
            <tbody>
                {history?.map(item => (
                    <td>
                        <tr>
                            {item.vertical} | {item.psuedo}
                        </tr>
                        <tr>{item.team}</tr>
                        <tr>{formatDate(item.date)}</tr>
                    </td>
                ))}
            </tbody>
        </table>
    </div>
)

export default memo(ApplyHistory)
