import { memo, useMemo } from 'react'

import { Badge } from '@components'

const CandidateDesignationAndSkills = ({ skills, designation }) => {
    const memozied = useMemo(
        () => (
            <>
                <td className='px-2'>
                    <span className='flex items-center flex-wrap space-x-1.5 gap-y-1.5'>
                        {skills?.length > 0
                            ? skills?.map((skill, index) => (
                                  <Badge
                                      key={index}
                                      label={skill}
                                      type='success'
                                      classes='text-xs border border-green-300'
                                  />
                              ))
                            : 'N/A'}
                    </span>
                </td>
                <td className='px-2 py-1'>{designation ? <Badge label={designation?.title} /> : 'N/A'}</td>
            </>
        ),
        [skills, designation]
    )
    return memozied
}

export default memo(CandidateDesignationAndSkills)
