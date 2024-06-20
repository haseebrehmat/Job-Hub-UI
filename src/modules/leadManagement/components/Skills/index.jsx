import { memo } from 'react'

import { getWidthClass } from '@utils/helpers'

// import { ResumeSvgs as svgs } from '@svgs'

const Skills = ({ data }) => (
    <div className='text-[#006366] '>
        <div className='flex flex-row justify-center'>
            <div className='border border-1 p-3 m-2 text-center h-fit bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%] z-10'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-md font-semibold uppercase'>Skills</p>
                </div>
            </div>
            <div className='flex flex-col w-full px-12 bg-slate-100 py-8 rounded-3xl -ml-8'>
                {data?.candidates?.skills.map((item, index) => (
                    <div key={index}>
                        <div className='mb-8'>
                            <div className='flex flex-row justify-between mb-1'>
                                <p className='text-sm uppercase'>{item.skill}</p>
                                <p className='text-sm uppercase'>{item.level * 20}%</p>
                            </div>
                            <hr className='h-1  bg-gray-400 z-10' />
                            <hr className={`h-1 bg-teal-700 -mt-1 ${getWidthClass(item.level)}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)
export default memo(Skills)
