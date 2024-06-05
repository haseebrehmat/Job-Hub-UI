import { memo, useMemo } from 'react'

import { Badge } from '@components'

const CandidateInfo = ({ info, exposed = false }) => {
    const memoized = useMemo(
        () => (
            <>
                {exposed ? (
                    <td className='px-3 py-6'>
                        <span className='capitalize'>{info?.candidate?.name ?? 'N/A'}</span>
                        {info?.candidate?.email && (
                            <span className='text-xs ml-1 italic'>{`(${info?.candidate?.email})`}</span>
                        )}
                    </td>
                ) : (
                    <>
                        <td className='px-3 py-6 capitalize'>{info?.name ?? 'N/A'}</td>
                        <td className='px-3 py-6'>{info?.email ?? 'N/A'}</td>
                        <td className='px-3 py-6 italic'>{info?.phone ?? 'N/A'}</td>
                        <td className='px-6 py-6'>{info?.experience ?? 'N/A'}</td>
                        <td className='px-6 py-6'>{info?.leads ?? 'N/A'}</td>
                    </>
                )}
                <td className='px-2'>
                    <span className='flex items-center flex-wrap space-x-1.5 gap-y-1.5'>
                        {info?.skills?.length > 0
                            ? info?.skills?.map((skill, index) => (
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
                <td className='px-2 py-1'>{info?.designation ? <Badge label={info?.designation} /> : 'N/A'}</td>
                {exposed ? null : (
                    <td className='px-3 py-6 font-bold uppercase italic'>{info?.company?.name ?? 'N/A'}</td>
                )}
            </>
        ),
        [info]
    )
    return memoized
}

export default memo(CandidateInfo)