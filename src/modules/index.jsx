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
import Integrations from '@modules/settings/integrations'
import Profile from '@modules/profile'
import CoverLetter from './coverLetter'
import Scrapper from '@modules/scrapper'

export {
    TeamAppliedJobs,
    AppliedJobs,
    JobsFilter,
    JobsUploader,
    Dashboard,
    Teams,
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
}
