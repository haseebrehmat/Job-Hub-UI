import {
    MdSpaceDashboard,
    MdNotifications,
    MdOutlineLogout,
    MdClose,
    MdClear,
    MdOutlineVerifiedUser,
    MdOutlineKeyboardArrowDown,
    MdWorkOutline,
    MdArrowBackIos,
    MdArrowForwardIos,
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdOutlinePostAdd,
    MdOutlineDriveFolderUpload,
} from 'react-icons/md'
import {
    BsFillFileTextFill,
    BsCloudUpload,
    BsShieldShaded,
    BsArrowLeftCircle,
    BsArrowRightCircle,
    BsCheck2,
    BsSnow3,
    BsCollectionFill,
    BsThreeDotsVertical,
    BsFillKeyFill,
    BsCloudArrowDownFill,
    BsFillPlayFill,
    BsCardList,
} from 'react-icons/bs'
import {
    HiUser,
    HiUsers,
    HiOutlineUsers,
    HiOutlineWifi,
    HiOutlineOfficeBuilding,
    HiOutlineLightBulb,
} from 'react-icons/hi'
import { HiUserPlus, HiOutlinePencilSquare } from 'react-icons/hi2'
import { IoMdSettings, IoMdContact, IoIosSettings, IoIosNotifications, IoIosCreate } from 'react-icons/io'
import { TbRefresh, TbCalendarTime } from 'react-icons/tb'
import { FiMenu, FiRefreshCw, FiUser, FiCheckCircle } from 'react-icons/fi'
import {
    AiOutlineSearch,
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineFall,
    AiOutlineCloseCircle,
    AiOutlineMinusCircle,
    AiOutlineCloudUpload,
    AiOutlineLink,
    AiFillSetting,
    AiOutlineHistory,
} from 'react-icons/ai'
import { ImSearch, ImCross } from 'react-icons/im'
import { CgSidebarOpen } from 'react-icons/cg'
import { IoNewspaperSharp } from 'react-icons/io5'
import { FaBriefcase, FaHotjar, FaUsers, FaRegTrashAlt, FaPowerOff } from 'react-icons/fa'
import { BiPlusCircle, BiMessageDetail, BiPause } from 'react-icons/bi'
import { RiUserSettingsLine, RiLock2Fill, RiTeamLine, RiStackFill, RiProfileLine } from 'react-icons/ri'
import { GrDocumentUser } from 'react-icons/gr'
import { Integrations, Filters, ResetFilters } from '@svgs'
import { VscVmRunning, VscSourceControl } from 'react-icons/vsc'

export const LogoutIcon = <MdOutlineLogout style={{ fontSize: '22px' }} />
export const CreateLetterIcon = <IoIosCreate style={{ fontSize: '22px' }} />
export const DownloadIcon = <BsCloudArrowDownFill style={{ fontSize: '22px' }} />
export const Checkedbox = <MdCheckBox style={{ fontSize: '22px' }} />
export const unCheckedbox = <MdCheckBoxOutlineBlank style={{ fontSize: '22px' }} />
export const UploadIcon = <AiOutlineCloudUpload style={{ fontSize: '22px' }} />
export const CoverLetter = <BiMessageDetail style={{ fontSize: '22px' }} />
export const CloseIcon = <MdClose style={{ fontSize: '22px' }} />
export const NavigationIcon = <FiMenu style={{ fontSize: '22px' }} />
export const DashboardIcon = <MdSpaceDashboard style={{ fontSize: '20px' }} />
export const ReportIcon = <BsFillFileTextFill style={{ fontSize: '20px' }} />
export const UsersIcon = <HiUsers style={{ fontSize: '22px' }} />
export const RoleIcon = <HiUser style={{ fontSize: '22px' }} VscVmRunning />
export const NewUserIcon = <HiUserPlus style={{ fontSize: '22px' }} />
export const SettingIcon = <IoMdSettings style={{ fontSize: '20px' }} />
export const ResetFilterIcon = <TbRefresh style={{ fontSize: '20px' }} />
export const NotificationIcon = <MdNotifications style={{ fontSize: '20px' }} />
export const SecurityIcon = <BsShieldShaded style={{ fontSize: '18px' }} />
export const PaginateNext = <BsArrowRightCircle style={{ fontSize: '18px' }} />
export const PaginatePrev = <BsArrowLeftCircle style={{ fontSize: '18px' }} />
export const SearchIcon = <AiOutlineSearch />
export const NavbarSearchIcon = <ImSearch className='w-4 h-4 text-[#048C8C]' />
export const NavSettingIcon = <IoIosSettings fontSize='1.5em' />
export const NavContactIcon = <IoMdContact fontSize='1.5em' />
export const NavBellIcon = <IoIosNotifications fontSize='1.5em' />
export const ManagementIcon = <HiOutlineUsers style={{ fontSize: '20px' }} />
export const OpenSidebarIcon = <CgSidebarOpen fontSize='1.5em' />
export const SearchClearIcon = <MdClear fontSize='1.5em' />
export const Jobs = <FaBriefcase style={{ fontSize: '22px' }} />
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
export const FilterIcon = <Filters />
export const ResetIcon = <FiRefreshCw fontSize='1.5em' color='#048C8C' />
export const JobsUploaderIcon = <BsCloudUpload style={{ fontSize: '22px' }} />
export const TeamAppliedJobsIcon = <BsCollectionFill style={{ fontSize: '22px' }} />
export const OpenSubMenuIcon = <MdOutlineKeyboardArrowDown style={{ fontSize: '22px' }} />
export const UserIcon = <FiUser style={{ fontSize: '22px' }} />
export const CompaniesIcon = <FaUsers style={{ fontSize: '22px' }} />
export const RolesIcon = <RiUserSettingsLine style={{ fontSize: '22px' }} />
export const CreateIcon = <BiPlusCircle style={{ fontSize: '22px' }} />
export const ActionsIcons = <BsThreeDotsVertical style={{ fontSize: '20px' }} />
export const TrashIcon = <FaRegTrashAlt style={{ fontSize: '16px' }} />
export const IntegrationIcon = <Integrations />
export const ResetFiltersSvg = <ResetFilters />
export const PermissionIcon = <RiLock2Fill style={{ fontSize: '22px' }} />
export const UserAppliedJobIcon = <MdWorkOutline style={{ fontSize: '22px' }} />
export const PageNext = <MdArrowForwardIos style={{ fontSize: 16 }} />
export const PagePrev = <MdArrowBackIos style={{ fontSize: 16 }} />
export const UpdatePasswordIcon = <BsFillKeyFill style={{ fontSize: '22px' }} />
export const CrossIcon = <ImCross />
export const TeamsIcon = <RiTeamLine style={{ fontSize: '22px' }} />
export const EditIcon = <HiOutlinePencilSquare style={{ fontSize: '20px' }} />
export const ScrapperIcon = <HiOutlineWifi style={{ fontSize: '20px' }} />
export const RunScrapperIcon = <BsFillPlayFill style={{ fontSize: '20px' }} />
export const PostJobIcon = <MdOutlinePostAdd style={{ fontSize: '22px' }} />
export const UploadJobIcon = <MdOutlineDriveFolderUpload style={{ fontSize: '22px' }} />
export const JobSourceLinkIcon = <AiOutlineLink style={{ fontSize: '22px' }} />
export const CronjobSettingIcon = <AiFillSetting style={{ fontSize: '22px' }} />
export const RunningScrapperIcon = <VscVmRunning style={{ fontSize: '22px' }} />
export const LoggerIcon = <BsCardList style={{ fontSize: '22px' }} />
export const SignOutIcon = <FaPowerOff style={{ fontSize: '22px' }} />
export const ResumeIcon = <GrDocumentUser style={{ fontSize: 16 }} />
export const JobSource = <VscSourceControl style={{ fontSize: '22px' }} />
export const TechSTack = <RiStackFill style={{ fontSize: '22px' }} />
export const PseudoIcon = <RiProfileLine style={{ fontSize: 16 }} />
export const LogsIcon = <AiOutlineHistory style={{ fontSize: '22px' }} />
export const PauseIcon = <BiPause style={{ fontSize: '22px' }} />
export const CompanyIcon = <HiOutlineOfficeBuilding style={{ fontSize: '22px' }} />
export const DateTimeIcon = <TbCalendarTime style={{ fontSize: '22px' }} />
export const SelectedIcon = <FiCheckCircle style={{ fontSize: '22px' }} />
export const GenericSkillIcon = <HiOutlineLightBulb style={{ fontSize: 22 }} />
