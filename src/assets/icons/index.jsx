import {
    MdSpaceDashboard,
    MdNotifications,
    MdOutlineLogout,
    MdClose,
    MdClear,
    MdOutlineVerifiedUser,
} from 'react-icons/md'
import {
    BsFillFileTextFill,
    BsShieldShaded,
    BsArrowLeftCircle,
    BsArrowRightCircle,
    BsCheck2,
    BsSnow3,
} from 'react-icons/bs'
import { HiUser, HiUsers, HiOutlineFilter } from 'react-icons/hi'
import { HiUserPlus } from 'react-icons/hi2'
import { IoMdSettings, IoMdContact, IoIosSettings, IoIosNotifications } from 'react-icons/io'
import { FiMenu, FiRefreshCw } from 'react-icons/fi'
import {
    AiOutlineSearch,
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineFall,
    AiOutlineCloseCircle,
    AiOutlineMinusCircle,
} from 'react-icons/ai'
import { ImSearch } from 'react-icons/im'
import { CgSidebarOpen } from 'react-icons/cg'
import { IoNewspaperSharp } from 'react-icons/io5'
import { FaBriefcase, FaHotjar } from 'react-icons/fa'

export const LogoutIcon = <MdOutlineLogout style={{ fontSize: '22px' }} />
export const CloseIcon = <MdClose style={{ fontSize: '22px' }} />
export const NavigationIcon = <FiMenu style={{ fontSize: '22px' }} />
export const DashboardIcon = <MdSpaceDashboard style={{ fontSize: '20px' }} />
export const ReportIcon = <BsFillFileTextFill style={{ fontSize: '20px' }} />
export const UsersIcon = <HiUsers style={{ fontSize: '22px' }} />
export const RoleIcon = <HiUser style={{ fontSize: '22px' }} />
export const NewUserIcon = <HiUserPlus style={{ fontSize: '22px' }} />
export const SettingIcon = <IoMdSettings style={{ fontSize: '20px' }} />
export const NotificationIcon = <MdNotifications style={{ fontSize: '20px' }} />
export const SecurityIcon = <BsShieldShaded style={{ fontSize: '18px' }} />
export const PaginateNext = <BsArrowRightCircle style={{ fontSize: '18px' }} />
export const PaginatePrev = <BsArrowLeftCircle style={{ fontSize: '18px' }} />
export const SearchIcon = <AiOutlineSearch />
export const NavbarSearchIcon = <ImSearch className='w-4 h-4 text-[#048C8C]' />
export const NavSettingIcon = <IoIosSettings fontSize='1.5em' />
export const NavContactIcon = <IoMdContact fontSize='1.5em' />
export const NavBellIcon = <IoIosNotifications fontSize='1.5em' />
export const OpenSidebarIcon = <CgSidebarOpen fontSize='1.5em' />
export const SearchClearIcon = <MdClear fontSize='1.5em' />
export const Jobs = <FaBriefcase />
export const ValidateTrueIcon = <BsCheck2 fontSize='1.1em' color='green' />
export const ValidateFalseIcon = <AiOutlineMinusCircle fontSize='1.1em' color='red' />
export const SeePassIcon = <AiOutlineEye fontSize='1.4em' color='#048C8C' />
export const HidePassIcon = <AiOutlineEyeInvisible fontSize='1.4em' color='#048C8C' />
export const TotalIcon = <AiOutlineFall fontSize='1.4em' color='#048C8C' />
export const ProspectsIcon = <IoNewspaperSharp fontSize='1.4em' color='#048C8C' />
export const WarmLeadsIcon = <FaHotjar fontSize='1.4em' color='#048C8C' />
export const ColdLeadsIcon = <BsSnow3 fontSize='1.4em' color='#048C8C' />
export const HiredIcon = <MdOutlineVerifiedUser fontSize='1.4em' color='#048C8C' />
export const RejectedIcon = <AiOutlineCloseCircle fontSize='1.4em' color='#048C8C' />
export const FilterIcon = <HiOutlineFilter fontSize='1.5em' color='#048C8C' />
export const ResetIcon = <FiRefreshCw fontSize='1.5em' color='#048C8C' />
