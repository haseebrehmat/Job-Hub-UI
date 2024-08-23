import { memo } from 'react'

import { Input } from '@components'

import { timeSince } from '@utils/helpers'
import { today } from '@constants/dashboard'

const EditHistory = () => (
    <>
        <p className='font-semibold text-xl'>Edit History</p>
        <hr className='mt-1 mb-3' />
        <Input ph='Search the history' classes='h-8 !border-neutral-300' />
        <div className='w-full mx-auto pl-3'>
            <ol className='border-l border-neutral-300'>
                <li className='pt-4'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>haseebrehmat</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 1</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>abu bakar</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ahsan riaz</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>ubaid</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 2 Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
                <li className='pt-2 pb-2'>
                    <div className='flex items-baseline'>
                        <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                        <p className='ml-4 my-1 text-neutral-500 w-fit'>
                            <span className='font-semibold italic'>usman</span> changed to
                            <span className='font-semibold opacity-80 ml-1'>Status 3 Newly Updated</span>
                            <span className='text-sm ml-2 hover:underline'>{timeSince(today)}</span>
                        </p>
                    </div>
                </li>
            </ol>
        </div>
    </>
)

export default memo(EditHistory)
