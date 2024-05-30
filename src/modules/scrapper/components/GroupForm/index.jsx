import { memo, useState } from 'react'

import { useMutate } from '@/hooks'

import { Button, CustomSelector, Drawer, Input } from '@components'

import { CronjobTypes } from '@modules/scrapper/components'
import { saveGroupSetting } from '@modules/scrapper/api'

import { parseIntervalType } from '@utils/helpers'
import { GroupSchema } from '@utils/schemas'
import { INTERVAL_TYPE_OPTIONS } from '@constants/scrapper'

const GroupForm = ({ show, setShow, mutate, setting }) => {
    const [scrapperType, setScrapperType] = useState({ time: setting?.time_based, interval: setting?.interval_based })

    const { values, errors, handleSubmit, handleChange, resetForm, trigger, setFieldValue } = useMutate(
        `/api/job_scraper/group_scheduler${setting?.id ? `/${setting?.id}/` : '/'}`,
        saveGroupSetting,
        {
            id: setting?.id,
            type: setting ? (setting.scheduler_settings?.time_based ? 'time' : 'interval') : '',
            name: setting?.name || '',
            interval: setting?.scheduler_settings?.interval || 1,
            interval_type: setting?.scheduler_settings?.interval_type || '',
            time: setting?.scheduler_settings?.time || '',
        },
        GroupSchema,
        async formValues =>
            trigger({
                ...formValues,
                id: setting?.id,
                time_based: scrapperType.time,
                interval_based: scrapperType.interval,
            }),
        null,
        () => {
            mutate()
            if (!setting?.id) resetForm()
        }
    )
    console.log(setting?.scheduler_settings?.time_based)
    return (
        <Drawer show={show} setShow={setShow} w='400px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{setting?.id ? 'Edit' : 'Create'} Group Setting</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Group Name*</span>
                    <Input
                        type='text'
                        value={values.name}
                        onChange={e => setFieldValue('name', e.target.value)}
                        placeholder='Enter group name'
                    />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <span className='text-xs font-semibold mb-1'>Type*</span>
                    <CronjobTypes types={scrapperType} set={setScrapperType} onChange={handleChange} />
                    {errors.type && <small className='ml-1 text-xs text-red-600'>{errors.type}</small>}
                    {scrapperType.time && (
                        <>
                            <span className='text-xs font-semibold'>Time*</span>
                            <Input type='time' name='time' value={values.time} onChange={handleChange} />
                            {errors.time && <small className='ml-1 text-xs text-red-600'>{errors.time}</small>}
                        </>
                    )}
                    {scrapperType.interval && (
                        <>
                            <span className='text-xs font-semibold'>Interval Number*</span>
                            <Input
                                ph='Enter interval number'
                                type='number'
                                name='interval'
                                min={values.interval_type === 'minutes' ? 25 : 1}
                                value={values.interval}
                                onChange={handleChange}
                            />
                            {errors.interval && <small className='ml-1 text-xs text-red-600'>{errors.interval}</small>}
                            <span className='text-xs font-semibold'>Interval Type*</span>
                            <CustomSelector
                                options={INTERVAL_TYPE_OPTIONS}
                                selectorValue={parseIntervalType(values.interval_type)}
                                handleChange={e => setFieldValue('interval_type', e.value)}
                                placeholder='Select interval type'
                            />
                            {errors.interval_type && (
                                <small className='ml-1 text-xs text-red-600'>{errors.interval_type}</small>
                            )}
                        </>
                    )}
                    <div className='pt-4 space-y-2'>
                        {(scrapperType.time || scrapperType.interval) && (
                            <Button label={setting?.id ? 'Update' : 'Submit'} type='submit' fill />
                        )}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(GroupForm)
