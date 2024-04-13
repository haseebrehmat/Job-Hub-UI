import { memo, useState } from 'react'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

import { useMutate } from '@/hooks'
import { Button, Drawer } from '@components'
import CustomSelector from '@components/CustomSelector'
import { assignVertical, fetchPseudos } from '@modules/userManagement/api'

import { verticalSchema } from '@utils/schemas'
import { getMsg, parsePseudos, parseVertical } from '@utils/helpers'
import { can } from '@/utils/helpers'

const PseudosForm = ({ show, setShow, mutate, team }) => {
    const [pseudos, setPseudos] = useState({ pseudo: [], vertical: [] })
    const { values, handleSubmit, resetForm, trigger } = useMutate(
        'api/profile/team_vertical_assignment/',
        assignVertical,
        verticalSchema,
        async formValues => trigger({ ...formValues, team_id: team.id, verticals: [] }),
        error => toast.error(getMsg(error)),
        () => {
            mutate()
            if (!team?.id) resetForm()
        }
    )
    const { data, isLoading } = useSWR('api/profile/team_vertical_assignment/', fetchPseudos)
    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Pseudo Assignment</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Pesudos</span>
                    {isLoading ? (
                        'Pseudos Loading ...'
                    ) : (
                        <CustomSelector
                            name='pseudo'
                            options={parsePseudos(data?.pseudos)}
                            handleChange={obj => setPseudos({ ...pseudos, pseudo: obj })}
                            selectorValue={values.members}
                            isMulti
                            placeholder='Select Pseudos'
                        />
                    )}
                    <span className='text-xs font-semibold'>Verticles</span>
                    {isLoading ? (
                        'Verticles Loading ...'
                    ) : (
                        <CustomSelector
                            name='vertical'
                            options={parseVertical(pseudos.pseudo, data?.pseudos)}
                            handleChange={obj => setPseudos({ ...pseudos, vertical: obj })}
                            selectorValue={values.members}
                            isMulti
                            placeholder='Select verticles'
                        />
                    )}

                    <div className='pt-4 space-y-2'>
                        <Button label='Assign' type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(PseudosForm)
