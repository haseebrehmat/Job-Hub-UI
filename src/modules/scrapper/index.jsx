import { memo } from 'react'

import { Button } from '@components'

import { SyncNow } from '@modules/scrapper/components'

import { settingsHeads } from '@constants/scrapper'

import { CreateIcon } from '@icons'

const Scrapper = () => {
    console.log('Scrapper')

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 pb-6'>
                <Button label='Create Cronjob Setting' fit icon={CreateIcon} onClick={() => console.log('here')} />
                <SyncNow />
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {settingsHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-gray-100'>
                        <td className='px-3 py-6'>1</td>
                        <td className='px-3 py-6'>Dice</td>
                        <td className='px-3 py-6'>Interval Based</td>
                        <td className='px-3 py-6'>After every 12 minutes</td>
                        <td className='px-3 py-6'>Actions</td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-gray-100'>
                        <td className='px-3 py-6'>2</td>
                        <td className='px-3 py-6'>SimplyHired</td>
                        <td className='px-3 py-6'>Time Based</td>
                        <td className='px-3 py-6'>On 12:00 AM daily</td>
                        <td className='px-3 py-6'>Actions</td>
                    </tr>
                    <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-gray-100'>
                        <td className='px-3 py-6'>3</td>
                        <td className='px-3 py-6'>LinkedIn</td>
                        <td className='px-3 py-6'>Time Based</td>
                        <td className='px-3 py-6'>On 11:00 AM daily</td>
                        <td className='px-3 py-6'>Actions</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default memo(Scrapper)
