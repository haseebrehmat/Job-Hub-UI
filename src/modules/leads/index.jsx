import { memo, useState } from 'react'

import { Modal } from '@components'
import { Board } from '@modules/leads/components'

const Leads = () => {
    const [show, setShow] = useState(false)

    return (
        <div>
            <Modal show={show} setShow={setShow} content={<Board />}>
                <span onClick={() => setShow(true)}>Click Here</span>
            </Modal>
            {/* <Modal show={show} setShow={setShow} content={<span>Model Content</span>}>
                <span onClick={() => setShow(true)}>Click Here</span>
            </Modal> */}
        </div>
    )
}

export default memo(Leads)
