import { memo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { useMutate } from '@/hooks'
import { Button, Drawer } from '@components'
import CustomSelector from '@components/CustomSelector'
import { assignVertical } from '@modules/userManagement/api'

import { verticalmemberSchema } from '@utils/schemas'
import { getMsg, parsePseudos } from '@utils/helpers'
// import { can } from '@/utils/helpers'

const PseudosMemberForm = ({ show, setShow, mutate, user, vert }) => {
    const [pseudos, setPseudos] = useState({ pseudo: [], vertical: [] })
    const { handleSubmit, trigger } = useMutate(
        'api/profile/user_vertical_assignment/',
        assignVertical,
        {
            user_id: user.id,
            verticals: pseudos.vertical.map(obj => obj.value),
        },
        verticalmemberSchema,
        async formValues =>
            trigger({ ...formValues, user_id: user.id, verticals: pseudos.vertical.map(obj => obj.value) }),
        error => toast.error(getMsg(error)),
        () => {
            mutate()
            setPseudos({ ...pseudos, pseudo: [], vertical: [] })
        }
    )

    const removeVertical = id => {
        const verticals = pseudos.vertical
        const index = verticals.findIndex(obj => obj.value === id)
        if (index !== -1) {
            verticals.splice(index, 1)
        }
        setPseudos({ ...pseudos, vertical: verticals })
    }
    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Vertical Assignment</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Verticles</span>
                    <CustomSelector
                        name='vertical'
                        options={parsePseudos(vert)}
                        handleChange={obj => setPseudos({ ...pseudos, vertical: obj })}
                        selectorValue={pseudos.vertical}
                        isMulti
                        placeholder='Select verticles'
                    />
                    <div className='pt-4 space-y-2'>
                        <Button label='Assign' type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                    <div>
                        <h1 className='my-2 font-medium'>Selcted Verticals</h1>
                        {pseudos.vertical?.length > 0 &&
                            pseudos.vertical?.map(tag => (
                                <span
                                    key={tag.value}
                                    className='inline-block  my-2 px-2.5 py-1.5 text-sm font-semibold bg-gray-200 rounded-full items-center mx-1'
                                >
                                    <span>{tag.label}</span>
                                    <button
                                        type='button'
                                        onClick={() => removeVertical(tag.value)}
                                        className='ml-2 text-gray-700 font-semibold focus:outline-none hover:text-red-700'
                                    >
                                        x
                                    </button>
                                </span>
                            ))}
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(PseudosMemberForm)
