import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, CustomSelector } from '@components'

import { saveGenericSkill } from '@modules/pseudos/api'

import { companyStatusSchema } from '@utils/schemas'
import { GENERIC_SKILL_TYPES_OPTIONS } from '@constants/pseudos'

const CompanyStatusForm = ({ show, setShow, mutate }) => {
    const { values, errors, handleSubmit, resetForm, trigger, setFieldValue } = useMutate(
        '/api/profile/generic_skill/',
        saveGenericSkill,
        { status: [] },
        companyStatusSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => mutate() && resetForm()
    )

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Add Status</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Status*</span>
                    <CustomSelector
                        options={GENERIC_SKILL_TYPES_OPTIONS}
                        handleChange={obj => setFieldValue('status', obj)}
                        selectorValue={values.status}
                        isMulti
                        placeholder='Select Status'
                    />
                    {errors.status && <small className='__error'>{errors.status}</small>}
                    <div className='pt-4 space-y-2'>
                        {values.status.length > 0 && <Button label='Add' type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(CompanyStatusForm)
