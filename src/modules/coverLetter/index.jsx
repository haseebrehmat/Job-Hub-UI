import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { Form } from '@modules/coverLetter/components'
import { fetchIntegrations } from '@modules/settings/api'
import { CreateIcon, ActionsIcons } from '@icons'
import { can } from '@/utils/helpers'

const CoverLetter = () => {
    const [Show, setShow] = useState(false)
    const { data, error, isLoading, mutate } = useSWR(
        `/api/auth/integration/?companies=${3}&integrations=${1}`,
        fetchIntegrations
    )
    const handleFilter = () => {
        setShow(!Show)
    }
    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                {can('generate_cover_letter') && (
                    <Button label='Generate Cover Letter' fit icon={CreateIcon} onClick={() => handleFilter()} />
                )}
            </div>
            <div editor-quill id='editor'>
                <h4>Hello World!</h4>
                <p>
                    <br />
                </p>
                <p>
                    Some initial <strong>bold</strong> text
                </p>
                <p>
                    <br />
                </p>
            </div>

            {Show && <Form show={Show} setShow={setShow} />}
        </div>
    )
}

export default memo(CoverLetter)
