import { memo, useState } from 'react'

import { Button, Input, CustomSelector } from '@components'

import { CronjobTypes } from '@modules/scrapper/components'

import { options } from '@constants/scrapper'

const CronjobTimeForm = () => {
    const [scrapperType, setScrapperType] = useState({ time: false, interval: false })

    return (
        <form>
            <CronjobTypes types={scrapperType} set={setScrapperType} />
            <div className='space-y-4'>
                {scrapperType.time && (
                    <div className='pt-6 w-1/4'>
                        <Input type='time' />
                    </div>
                )}
                {scrapperType.interval && (
                    <div className='pt-6 flex space-x-3 items-center'>
                        <Input ph='Enter interval number' />
                        <div>
                            <CustomSelector
                                options={options}
                                handleChange={e => console.log(e)}
                                placeholder='Select interval type'
                            />
                        </div>
                    </div>
                )}
                {(scrapperType.time || scrapperType.interval) && <Button label='Update Cronjob Time' fit />}
            </div>
        </form>
    )
}

export default memo(CronjobTimeForm)
