import Login from '@modules/authentication/login'
import ForgetPassword from '@modules/authentication/forgetPassword'
import ResetPassword from '@modules/authentication/resetPassword'
import Layout from '@modules/layout'
import AppliedJobs from '@modules/appliedJobs'
import TeamAppliedJobs from '@modules/teamAppliedJobs'
import Dashboard from '@modules/dashboard'
import JobsFilter from '@/modules/jobsFilter'
import JobsUploader from '@modules/jobsUploader'
import Companies from '@modules/userManagement/companies'
import Roles from '@modules/userManagement/roles'
import Users from '@modules/userManagement/users'
import Teams from '@modules/userManagement/teams'
import Integrations from '@modules/settings/integrations'

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
}
