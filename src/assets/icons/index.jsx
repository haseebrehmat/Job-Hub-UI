import { MdSpaceDashboard, MdNotifications, MdOutlineLogout, MdClose } from 'react-icons/md'
import { BsFillFileTextFill, BsShieldShaded, BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import { HiUser, HiUsers } from 'react-icons/hi'
import { HiUserPlus } from 'react-icons/hi2'
import { IoMdSettings } from 'react-icons/io'
import { FiMenu } from 'react-icons/fi'
import { AiOutlineSearch } from 'react-icons/ai'

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
