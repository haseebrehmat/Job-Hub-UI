import { memo } from 'react'

import { useMutate } from '@/hooks'

import { useResctrictedKeywordsStore } from '@/stores'

import { Button, Drawer, Input } from '@components'

import { saveJobSource } from '@modules/settings/api'

import { jobSourceSchema } from '@utils/schemas'

const RestrictedKeywordForm = ({ refetch = null }) => {
    const [source, show, setShow] = useResctrictedKeywordsStore(state => [state?.keyword, state?.show, state?.setShow])

    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/job_scraper/job_source${source?.id ? `/${source?.id}/` : '/'}`,
        saveJobSource,
        { name: source?.name || '', key: source?.key || '' },
        jobSourceSchema,
        async formValues => trigger({ ...formValues, id: source?.id }),
        null,
        () => {
            if (refetch) refetch()
            if (!source?.id) resetForm()
            setShow(false)
        }
    )

    return (
        <Drawer
            show={show}
            setShow={setShow}
            w='350px'
            dir='bottom'
            header={`${source?.id ? 'Edit' : 'Create'} Job Source`}
        >
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <span className='text-xs font-semibold'>Keyword*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter Restricted Keyword' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <div className='pt-4 space-y-2'>
                        {values.name.length > 0 && (
                            <Button label={source?.id ? 'Update' : 'Submit'} type='submit' fill />
                        )}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(RestrictedKeywordForm)
