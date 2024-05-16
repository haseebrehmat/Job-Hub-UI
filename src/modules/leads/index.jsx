import { memo, useReducer } from 'react'

import { Modal, Board, Badge } from '@components'

const Leads = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), {
        source: null,
        destination: null,
        show: false,
        move: true,
    })
    const itemsFromBackend = [
        {
            id: 1,
            content: (
                <div
                    className='bg-white text-gray-500 border border-[#048C8C] rounded-md p-2 space-y-1'
                    onClick={() => dispatch({ show: true })}
                >
                    <h2 className='text-sm capitalize'>application developer, php/.net</h2>
                    <h2 className='capitalize'>abt associates</h2>
                    <h2 className='text-xs capitalize'>First Interview</h2>
                    <h2 className='capitalize text-right'>
                        <Badge label='c#, .net' />
                    </h2>
                </div>
            ),
        },
        {
            id: 2,
            content: (
                <div
                    className='bg-white text-gray-500 border border-[#048C8C] rounded-md p-2 space-y-1'
                    onClick={() => dispatch({ show: true })}
                >
                    <h2 className='text-sm capitalize'>sr. php developer</h2>
                    <h2 className='capitalize'>eteam</h2>
                    <h2 className='text-xs capitalize'>2nd Interview</h2>
                    <h2 className='capitalize text-right'>
                        <Badge label='php' />
                    </h2>
                </div>
            ),
        },
        {
            id: 3,
            content: (
                <div
                    className='bg-white text-gray-500 border border-[#048C8C] rounded-md p-2 space-y-1'
                    onClick={() => dispatch({ show: true })}
                >
                    <h2 className='text-sm capitalize'>php full stack developer</h2>
                    <h2 className='capitalize'>galaxe.solutions</h2>
                    <h2 className='text-xs capitalize'>First Interview</h2>
                    <h2 className='capitalize text-right'>
                        <Badge label='laravel' />
                    </h2>
                </div>
            ),
        },
        {
            id: 4,
            content: (
                <div
                    className='bg-white text-gray-500 border border-[#048C8C] rounded-md p-2 space-y-1'
                    onClick={() => dispatch({ show: true })}
                >
                    <h2 className='text-sm capitalize'>
                        senior full stack engineer (angular/php) $160-180k - costa mesa!
                    </h2>
                    <h2 className='capitalize'>applab systems, inc</h2>
                    <h2 className='text-xs capitalize'>Final Call</h2>
                    <h2 className='capitalize text-right'>
                        <Badge label='angular' />
                    </h2>
                </div>
            ),
        },
    ]

    const columnsFromBackend = {
        1: {
            name: 'Warm Leads',
            items: itemsFromBackend,
        },
        2: {
            name: 'Hot Leads',
            items: [],
        },
        3: {
            name: 'Cold Leads',
            items: [],
        },
        4: {
            name: 'Prospect',
            items: [],
        },
        5: {
            name: 'Hired',
            items: [],
        },
        6: {
            name: 'Rejected',
            items: [],
        },
    }

    return (
        <div>
            <Modal
                show={vals.show}
                setShow={show => dispatch({ show })}
                content={<Board data={columnsFromBackend} set={dispatch} />}
            >
                <span
                    onClick={() => dispatch({ show: true })}
                    className='bg-gray-700 text-white p-2 m-2 flex justify-around'
                >
                    <span>Source Id : {vals.source}</span>
                    <span>Destination Id : {vals.destination}</span>
                </span>
            </Modal>
            <Board data={columnsFromBackend} set={dispatch} move={vals.move} />
        </div>
    )
}

export default memo(Leads)
