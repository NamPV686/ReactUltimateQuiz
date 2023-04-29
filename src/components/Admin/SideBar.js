import 'react-pro-sidebar/dist/css/styles.css';
import './SideBar.scss';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md'
import {Link} from 'react-router-dom';

const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return(
        <>
            <ProSidebar image={sidebarBg} collapsed={collapsed} toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
                <SidebarHeader>
                <div style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                >
                    <DiReact size={'3em'} color={"00bffff"} />
                    Quiz
                </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdDashboard />} >
                            <Link to='/admins' />
                            Dashboard
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu icon={<FaGem />} title="Features">
                            <MenuItem><Link to='/admins/manageruser' />Quản lý Users</MenuItem>
                            <MenuItem> Quản lý Bài Quiz</MenuItem>
                            <MenuItem> Quản lý Câu Hỏi</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <div className="sidebar-btn-wrapper" style={{padding: '20px 24px'}} >
                        <a href="https://github.com/NamPV686/ReactUltimate" target="_blank" className="sidebar-btn" rel="noopener noreferrer" >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                NamPV686
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;