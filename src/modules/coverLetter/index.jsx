import { memo, useState } from 'react'
import { Loading, Button } from '@components'
import { Form, TextEditor } from '@modules/coverLetter/components'
import { CreateLetterIcon } from '@icons'
import { can } from '@/utils/helpers'

const CoverLetter = () => {
    const [Show, setShow] = useState(false)
    const [init, setInit] = useState("<p>your Ai Generated Cover Letter Displays here.........</p>")

    const handleFilter = () => {
        setShow(!Show)
    }

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-2'>
               <Button label='Generate Cover Letter' fit icon={CreateLetterIcon} onClick={() => handleFilter()} />
            </div>
            {!Show &&
                <TextEditor init={init}  />
            }
            {Show && <Form show={Show} setShow={setShow} setInit={setInit}/>}
        </div>
    )
}

export default memo(CoverLetter)
