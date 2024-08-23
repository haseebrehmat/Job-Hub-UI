import { memo, useState } from 'react'
import { Link } from 'react-router-dom'

import { can } from '@utils/helpers'

import { SeePassIcon, AssignCandidateIcon, ActionsIcons, HistoryIcon } from '@icons'

const LeadActions = ({ lead, dispatch = null }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDropdown = () => setIsOpen(!isOpen)
    const closeDropdown = () => setIsOpen(false)

    return (
        <div className='relative inline-block'>
            <button onClick={toggleDropdown} onBlur={closeDropdown} className={`${isOpen ? 'animate-bounce' : ''}`}>
                {ActionsIcons}
            </button>
            {isOpen && (
                <div className='absolute right-0 w-max z-40 bg-white border border-gray-300 rounded-md shadow-xl flex flex-col pt-2.5 pb-2 gap-y-2'>
                    {can('view_lead_details') && (
                        <button
                            onClick={() => {
                                dispatch({ draggable: lead?.id, show: true })
                                closeDropdown()
                            }}
                            className='bg-transparent border-0 hover:bg-slate-100 hover:text-[#048C8C] !px-2 flex items-center justify-between gap-4'
                        >
                            <span className='tracking-wide'>View lead details</span>
                            <span>{SeePassIcon}</span>
                        </button>
                    )}
                    {can('assign_candidate') && (
                        <Link
                            to={`/assign-candidate/${lead?.id}`}
                            state={{ candidate: lead?.candidate?.id }}
                            className='bg-transparent border-0 hover:bg-slate-100 hover:text-[#048C8C] !px-2 flex items-center justify-between gap-4'
                        >
                            <span className='tracking-wide'>Assign candidate</span>
                            <span>{AssignCandidateIcon}</span>
                        </Link>
                    )}
                    {can('assign_candidate') && (
                        <Link
                            to={`/assign-candidate/${lead?.id}`}
                            state={{ candidate: lead?.candidate?.id }}
                            className='bg-transparent border-0 hover:bg-slate-100 hover:text-[#048C8C] !px-2 flex items-center justify-between gap-4'
                        >
                            <span className='tracking-wide'>Show edit history</span>
                            <span>{HistoryIcon}</span>
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}
export default memo(LeadActions)
