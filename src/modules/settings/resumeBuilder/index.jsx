import { memo } from 'react'

import { Resumes } from '@/components'

import { devProfile } from '@modules/settings/resumeBuilder/devProfile'
import { getSectionNames, getSectionStatus } from '@utils/helpers'

const ResumeBuilder = () => (
    <Resumes
        data={devProfile}
        hide={getSectionStatus(devProfile.sections)}
        names={getSectionNames(devProfile.sections)}
    />
)

export default memo(ResumeBuilder)
