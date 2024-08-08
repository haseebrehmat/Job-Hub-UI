import { memo } from 'react'
import useMutate from 'swr'

import CustomSelector from '@components/CustomSelector'
import { Button, Drawer } from '@components'

import { fetchCompanies } from '@/modules/userManagement/api'
import { parseCandidates } from '@utils/helpers'

const TeamForm = ({ show, setShow, team, mutate, candidates }) => {
    console.log(candidates)
    const { values, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `api/candidate_management/candidate_teams/${team?.id ? `/${team?.id}/` : '/'}`,
        fetchCompanies,
        { category: '' },
        null,
        async formValues => trigger({ ...formValues, id: team?.id }),
        null,
        () => {
            mutate()
            if (!team?.id) resetForm()
            setShow(false)
        }
    )

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <div className='grid grid-flow-row gap-2'>
                <p className='font-medium text-xl'>{team?.id ? 'Edit' : 'Create'} Team</p>
                <hr className='mb-2' />
                <span className='text-xs font-semibold'>Select Candidates</span>
                <CustomSelector
                    options={parseCandidates(candidates)}
                    handleChange={obj => handleChange('integrations', obj)}
                    selectorValue={values?.integrations}
                    isMulti
                    placeholder='Candidates'
                />
                <div className='pt-4 space-y-2'>
                    <Button label='Submit' fill onClick={handleSubmit} />
                    <Button label='Cancel' onClick={() => setShow({ show: false })} />
                </div>
            </div>
        </Drawer>
    )
}

export default memo(TeamForm)
