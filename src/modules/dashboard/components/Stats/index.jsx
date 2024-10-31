import { memo } from 'react'
import AnimatedNumber2 from 'react-animated-number'

import { data } from '@modules/dashboard/api/data'

import { formatNum, isSuper } from '@utils/helpers'

import { UpIcon, DownIcon, UptoIcon } from '@icons'

const Dashboard = () => {
    const allowed = isSuper()

    return allowed ? (
        <div className='grid md:grid-cols-2'>
            <div className='pb-5 pl-2'>
                <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                    <div className='flex flex-col tracking-widest w-full'>
                        <p className='text-lg text-gray-700 border-b font-semibold'>Jobs Stats</p>
                        <small className='text-gray-500 pb-3'>Market Comparison of Jobs presense</small>
                        <div className='inline-flex gap-4 items-center text-gray-700 pb-1'>
                            Previous Month {UptoIcon} Current Month
                        </div>
                        <div className='inline-flex gap-4 items-center'>
                            <AnimatedNumber2
                                initialValue={0}
                                component='p'
                                value={data?.jobs?.month?.previous_count}
                                stepPrecision={0}
                                style={{ fontSize: 24 }}
                                duration={1000}
                                formatValue={n => formatNum(n)}
                            />
                            {UptoIcon}
                            <AnimatedNumber2
                                initialValue={0}
                                component='p'
                                value={data?.jobs?.month?.current_count}
                                stepPrecision={0}
                                style={{ fontSize: 24 }}
                                duration={1000}
                                formatValue={n => formatNum(n)}
                            />
                        </div>
                        <span
                            className={`inline-flex gap-4 pt-2.5  ${
                                data?.jobs?.month?.alteration === 'up' ? 'text-green-500' : 'text-red-500'
                            }`}
                        >
                            {data?.jobs?.month?.percentage} %
                            <span>{data?.jobs?.month?.alteration === 'up' ? UpIcon : DownIcon}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className='pb-5 pl-2'>
                <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                    <div className='flex flex-col tracking-widest w-full'>
                        <p className='text-lg text-gray-700 border-b font-semibold'>Thriving Job Source</p>
                        <small className='text-gray-500'>Has Jobs More Than Previous Month</small>
                        <p className='text-2xl font-semibold italic text-[#4f9d9b] py-2'>
                            {data?.thriving_source?.month?.source}
                        </p>
                        <div className='inline-flex gap-4 items-center'>
                            <AnimatedNumber2
                                initialValue={0}
                                component='p'
                                value={data?.thriving_source?.month?.previous_count}
                                stepPrecision={0}
                                style={{ fontSize: 20 }}
                                duration={1000}
                                formatValue={n => formatNum(n)}
                            />
                            {UptoIcon}
                            <AnimatedNumber2
                                initialValue={0}
                                component='p'
                                value={data?.thriving_source?.month?.current_count}
                                stepPrecision={0}
                                style={{ fontSize: 20 }}
                                duration={1000}
                                formatValue={n => formatNum(n)}
                            />
                        </div>
                        <span className='inline-flex gap-4 text-green-500 pt-2.5'>
                            {data?.thriving_source?.month?.percentage} %<span>{UpIcon}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className='pb-5 pl-2'>
                <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                    <div className='flex flex-col tracking-widest w-full'>
                        <p className='text-lg text-gray-700 border-b font-semibold'>Thriving Technologies</p>
                        <small className='text-gray-500'>List of Top 5 Thrived Technologies</small>
                        {data?.thriving_techs?.month?.map((item, index) => (
                            <div className='flex items-center justify-between pt-3' key={index}>
                                <div className='flex flex-col'>
                                    <p className='text-lg'>{item?.stack}</p>
                                    <div className='inline-flex gap-3 text-slate-700'>
                                        <AnimatedNumber2
                                            initialValue={0}
                                            component='span'
                                            value={item?.previous_count}
                                            stepPrecision={0}
                                            style={{ fontSize: 12 }}
                                            duration={1000}
                                            formatValue={n => formatNum(n)}
                                        />
                                        {UptoIcon}
                                        <AnimatedNumber2
                                            initialValue={0}
                                            component='span'
                                            value={item?.current_count}
                                            stepPrecision={0}
                                            style={{ fontSize: 12 }}
                                            duration={1000}
                                            formatValue={n => formatNum(n)}
                                        />
                                    </div>
                                </div>
                                <span className='inline-flex gap-4 text-green-500'>
                                    {item?.percentage} %<span>{UpIcon}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='pb-5 pl-2'>
                <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                    <div className='flex flex-col tracking-widest w-full'>
                        <p className='text-lg text-gray-700 border-b font-semibold'>Declining Technologies</p>
                        <small className='text-gray-500'>List of Top 5 Declined Technologies</small>
                        {data?.declining_techs?.month?.map((item, index) => (
                            <div className='flex items-center justify-between pt-3' key={index}>
                                <div className='flex flex-col'>
                                    <p className='text-lg'>{item?.stack}</p>
                                    <div className='inline-flex gap-3 text-slate-700'>
                                        <AnimatedNumber2
                                            initialValue={0}
                                            component='span'
                                            value={item?.previous_count}
                                            stepPrecision={0}
                                            style={{ fontSize: 12 }}
                                            duration={1000}
                                            formatValue={n => formatNum(n)}
                                        />
                                        {UptoIcon}
                                        <AnimatedNumber2
                                            initialValue={0}
                                            component='span'
                                            value={item?.current_count}
                                            stepPrecision={0}
                                            style={{ fontSize: 12 }}
                                            duration={1000}
                                            formatValue={n => formatNum(n)}
                                        />
                                    </div>
                                </div>
                                <span className='inline-flex gap-4 text-red-500'>
                                    {item?.percentage} %<span>{DownIcon}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='pb-5 pl-2'>
                <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                    <div className='flex flex-col tracking-widest w-full'>
                        <p className='text-lg text-gray-700 border-b font-semibold'>Emerging Job Titles</p>
                        <small className='text-gray-500'>
                            List of Top 5 Emerging Job Titles (from others & others dev) from current month
                        </small>
                        {data?.thriving_titles?.month?.map((item, index) => (
                            <div className='flex items-center justify-between pt-5' key={index}>
                                <p className='text-opacity-50'>{item?.title}</p>
                                <div className='inline-flex items-center gap-2 text-green-600'>
                                    <AnimatedNumber2
                                        className='font-mono'
                                        initialValue={0}
                                        component='span'
                                        value={item?.count}
                                        stepPrecision={0}
                                        style={{ fontSize: 16 }}
                                        duration={1000}
                                        formatValue={n => formatNum(n)}
                                    />
                                    {UpIcon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='pb-5 pl-2'>
                <div className='border shadow-lg p-4 rounded-xl flex items-start h-full'>
                    <div className='flex flex-col tracking-widest w-full'>
                        <p className='text-lg text-gray-700 border-b font-semibold'>Thriving Job Titles</p>
                        <small className='text-gray-500'>
                            List of Top 5 Thrived Job Titles Which Have Jobs Currently More Than Previous Month
                        </small>
                        {data?.thriving_titles?.month?.map((item, index) => (
                            <div className='flex items-center justify-between pt-3' key={index}>
                                <p className='text-opacity-50'>{item?.title}</p>
                                <div className='inline-flex items-center gap-2 text-[#4f9d9b]'>
                                    <AnimatedNumber2
                                        className='font-mono'
                                        initialValue={0}
                                        component='span'
                                        value={item?.count}
                                        stepPrecision={0}
                                        style={{ fontSize: 20 }}
                                        duration={1000}
                                        formatValue={n => formatNum(n)}
                                    />
                                    Jobs {UpIcon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default memo(Dashboard)
