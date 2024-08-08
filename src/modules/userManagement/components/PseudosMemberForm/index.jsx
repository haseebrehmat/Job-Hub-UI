import { memo, useMemo, useState } from 'react'

import { useMutate } from '@/hooks'
import { Button, Drawer, CustomSelector } from '@components'

import { assignVertical } from '@modules/userManagement/api'

import { parseVerticals } from '@utils/helpers'
import UserRolesDropdown from '../UserRolesDropdown'

const PseudosMemberForm = ({ show, setShow, mutate, user, vert, teamId }) => {
    const memoizedOptions = useMemo(() => {
        if (vert?.length < 0) return []
        const userRegions = user?.regions?.map(region => region.value)
        return parseVerticals(
            vert?.filter(v => v?.regions.some(region => userRegions.includes(region.value))),
            false,
            true
        )
    }, [vert])
    const [verticals, setVerticals] = useState(
        user?.verticals?.length > 0 ? parseVerticals(user?.verticals, false, true) : []
    )

    const { values, handleSubmit, trigger, setFieldValue } = useMutate(
        'api/profile/user_vertical_assignment/',
        assignVertical,
        { user_id: user.id, team_id: teamId, role: user?.role },
        null,
        async vals => trigger({ ...vals, verticals: verticals.map(obj => obj.value), role_id: vals?.role?.value }),
        null,
        () => mutate()
    )
    const removeVertical = id => setVerticals(verticals.filter(item => item.value !== id))

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Vertical Assignment</p>
                    <hr className='mb-2' />
                    <UserRolesDropdown set={setFieldValue} value={values.role} options={{ userId: user?.id }} />
                    <span className='text-xs font-semibold'>Verticals</span>
                    <CustomSelector
                        options={memoizedOptions}
                        handleChange={obj => setVerticals(obj)}
                        selectorValue={verticals}
                        isMulti
                        placeholder='Select verticals'
                    />
                    <div className='pt-4 space-y-2'>
                        <Button label='Assign' type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                    {verticals?.length > 0 && (
                        <div>
                            <h1 className='my-2 font-medium'>Selcted Verticals</h1>
                            {verticals?.map(tag => (
                                <span
                                    key={tag.value}
                                    className='inline-block my-2 px-2.5 py-1.5 text-sm font-semibold bg-gray-200 rounded-full items-center mx-1'
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
                    )}
                </div>
            </form>
        </Drawer>
    )
}

export default memo(PseudosMemberForm)
