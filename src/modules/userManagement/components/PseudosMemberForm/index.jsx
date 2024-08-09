import { memo, useMemo, useState } from 'react'

import { useMutate } from '@/hooks'
import { Button, Drawer, CustomSelector } from '@components'

import { assignVertical } from '@modules/userManagement/api'
import { UserRolesDropdown } from '@modules/userManagement/components'

import { parseVerticals } from '@utils/helpers'

const PseudosMemberForm = ({ show, setShow, mutate, user, vert, teamId, role = null }) => {
    const [verticals, setVerticals] = useState(
        role ? parseVerticals(user?.roles?.find(r => r?.value === role?.id)?.verticals, false, true) : []
    )

    const memoizedOptions = useMemo(() => {
        if (vert?.length < 0) return []
        const userRegions = user?.regions?.map(region => region.value)
        return parseVerticals(
            vert?.filter(v => v?.regions.some(region => userRegions.includes(region.value))),
            false,
            true
        )
    }, [vert])

    const { values, handleSubmit, trigger, setFieldValue } = useMutate(
        'api/profile/user_vertical_assignment/',
        assignVertical,
        { user_id: user.id, team_id: teamId, role_id: role?.id || null },
        null,
        async vals =>
            trigger({
                ...vals,
                verticals: verticals.map(obj => obj.value),
                role_id: role?.id ?? vals?.role_id?.value,
            }),
        null,
        () => mutate()
    )

    const removeVertical = id => setVerticals(verticals.filter(item => item.value !== id))

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium flex flex-col'>
                        <span className='text-xl'>Vertical Assignment</span>
                        <span className='text-sm tracking-widest'>{user?.username}</span>
                    </p>
                    <hr className='mb-2' />
                    {role ? (
                        <span className='text-xl font-semibold italic'>{role?.name}</span>
                    ) : (
                        <UserRolesDropdown
                            set={setFieldValue}
                            value={values.role_id}
                            options={{ userId: user?.id, teamId }}
                        />
                    )}
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
                            <h1 className='my-2 font-medium'>Selected Verticals</h1>
                            {verticals?.map(tag => (
                                <span
                                    key={tag.value}
                                    className='inline-block my-2 px-2.5 py-1.5 text-sm font-semibold bg-green-100 rounded-full items-center mx-1'
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
