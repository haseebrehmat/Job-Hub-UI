import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { Form, TextEditor } from '@modules/coverLetter/components'
import { fetchIntegrations } from '@modules/settings/api'
import { CreateLetterIcon } from '@icons'
import { can } from '@/utils/helpers'

const CoverLetter = () => {
    const [Show, setShow] = useState(false)
    // const { data, error, isLoading, mutate } = useSWR(
    //     `/api/auth/integration/?companies=${3}&integrations=${1}`,
    //     fetchIntegrations
    // )
    const handleFilter = () => {
        setShow(!Show)
    }
    // if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-2'>
               <Button label='Generate Cover Letter' fit icon={CreateLetterIcon} onClick={() => handleFilter()} />
            </div>
            {!Show &&
                <TextEditor />
            }
            {Show && <Form show={Show} setShow={setShow} />}
        </div>
    )
}

export default memo(CoverLetter)
