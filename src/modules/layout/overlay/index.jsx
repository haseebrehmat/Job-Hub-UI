import { memo } from 'react'

import { Logo, Logout, SidebarItems, TermsOfService } from '@modules/layout/components'

import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

const Overlay = ({ show, setShow }) => (
    <SlidingPane isOpen={show} from='left' width='70%' onRequestClose={() => setShow(!show)} hideHeader>
        <div className='text-[#048C8C] bg-[#EDFFFB] p-3 h-full flex flex-col justify-between'>
            <div>
                <Logo />
                <hr className='w-50 h-0.5 bg-[#048C8C] my-4 border-0 rounded' />
                <SidebarItems />
                <Logout />
                <hr className='w-50 h-0.5 bg-[#048C8C] my-4 border-0 rounded' />
            </div>
            <TermsOfService />
        </div>
    </SlidingPane>
)

export default memo(Overlay)
