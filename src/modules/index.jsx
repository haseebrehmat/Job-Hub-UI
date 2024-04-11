import Login from '@modules/authentication/login'
import ForgetPassword from '@modules/authentication/forgetPassword'
import ResetPassword from '@modules/authentication/resetPassword'
import Layout from '@modules/layout'
import AppliedJobs from '@modules/appliedJobs'
import TeamAppliedJobs from '@modules/teamAppliedJobs'
import Dashboard from '@modules/dashboard'
import JobsFilter from '@/modules/jobsFilter'
import JobsUploader from '@modules/jobsUploader'
import { Companies, JobSourceBlocking } from '@modules/userManagement'
import Roles from '@modules/userManagement/roles'
import Users from '@modules/userManagement/users'
import Teams from '@modules/userManagement/teams'
import Team from '@modules/userManagement/team'
import Integrations from '@modules/settings/integrations'
import Profile from '@modules/profile'
import CoverLetter from './coverLetter'
import Scrapper from '@modules/scrapper'
import Logger from '@modules/logger'
import ResumeBuilder from '@modules/settings/resumeBuilder'
import Pseudos from '@modules/pseudos'
import Vertical from '@/modules/pseudos/vertical'

export {
    TeamAppliedJobs,
    AppliedJobs,
    JobsFilter,
    JobsUploader,
    Dashboard,
    Teams,
    Team,
    Login,
    ForgetPassword,
    ResetPassword,
    Layout as AppLayout,
    Companies,
    Roles,
    Users,
    Integrations,
    JobSourceBlocking,
    Profile,
    CoverLetter,
    Scrapper,
    Logger,
    ResumeBuilder,
    Pseudos,
    Vertical,
}
