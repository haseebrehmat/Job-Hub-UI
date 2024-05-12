/* eslint-disable no-shadow */
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { v4 as uuid } from 'uuid'

const Board = () => {
    const itemsFromBackend = [
        { id: uuid(), content: <p className='text-2xl'>First task</p> },
        { id: uuid(), content: 'Second task' },
        { id: uuid(), content: 'Third task' },
        { id: uuid(), content: 'Fourth task' },
        { id: uuid(), content: 'Fifth task' },
        { id: uuid(), content: 'First task' },
        { id: uuid(), content: 'Second task' },
        { id: uuid(), content: 'Third task' },
        { id: uuid(), content: 'Fourth task' },
        { id: uuid(), content: 'Fifth task' },
        { id: uuid(), content: 'First task' },
        { id: uuid(), content: 'Second task' },
        { id: uuid(), content: 'Third task' },
        { id: uuid(), content: 'Fourth task' },
        { id: uuid(), content: 'Fifth task' },
        { id: uuid(), content: 'First task' },
        { id: uuid(), content: 'Second task' },
        { id: uuid(), content: 'Third task' },
        { id: uuid(), content: 'Fourth task' },
        { id: uuid(), content: 'Fifth task' },
        { id: uuid(), content: 'First task' },
        { id: uuid(), content: 'Second task' },
        { id: uuid(), content: 'Third task' },
        { id: uuid(), content: 'Fourth task' },
        { id: uuid(), content: 'Fifth task' },
    ]

    const columnsFromBackend = {
        [uuid()]: {
            name: 'Warm Leads',
            items: itemsFromBackend,
        },
        [uuid()]: {
            name: 'Hot Leads',
            items: [],
        },
        [uuid()]: {
            name: 'Cold Leads',
            items: [],
        },
        [uuid()]: {
            name: 'Prospect',
            items: [],
        },
        [uuid()]: {
            name: 'Hired',
            items: [],
        },
        [uuid()]: {
            name: 'Rejected',
            items: [],
        },
    }

    const [columns, setColumns] = useState(columnsFromBackend)

    const onDragEnd = result => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            })
        } else {
            const column = columns[source.droppableId]
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            })
        }
    }

    return (
        <div className='max-w-full overflow-x-auto mb-14'>
            <div className='flex px-2 overflow-y-auto h-screen hide_scrollbar'>
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    {Object.entries(columns).map(([columnId, column]) => (
                        <div className='flex flex-col' key={columnId}>
                            <p className='mx-2 text-lg'>{column.name}</p>
                            <div className='my-1 mx-2'>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={`${
                                                snapshot.isDraggingOver ? 'bg-gray-200' : 'bg-[#edfdfb]'
                                            } p-2 border border-gray-200 min-h-screen w-64`}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {column.items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                userSelect: 'none',
                                                                padding: 10,
                                                                margin: '0 0 8px 0',
                                                                minHeight: 150,
                                                                borderRadius: 4,
                                                                backgroundColor: snapshot.isDragging
                                                                    ? '#263B4A'
                                                                    : '#328d8c',
                                                                color: 'white',
                                                                ...provided.draggableProps.style,
                                                            }}
                                                        >
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    ))}
                </DragDropContext>
            </div>
        </div>
    )
}

export default Board
