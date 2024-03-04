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
import Integrations from '@modules/settings/integrations'

export {
    TeamAppliedJobs,
    AppliedJobs,
    JobsFilter,
    JobsUploader,
    Dashboard,
    Login,
    ForgetPassword,
    ResetPassword,
    Layout as AppLayout,
    Companies,
    Roles,
    Users,
    Integrations,
    JobSourceBlocking,
}
