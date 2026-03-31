import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Users } from "lucide-react";
import "./Sidebar.css";
import logo from "../../assets/logo-horizontal.svg";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="sidebar-menu">

        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}> 
        <LayoutDashboard size={20} className="menu-icon"/>
          Dashboard
        </NavLink>

        <NavLink to="/agenda" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
        <CalendarDays size={20} className="menu-icon"/>
          Agenda
        </NavLink>

        <NavLink to="/pacientes" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
        <Users size={20} className="menu-icon"/>
          Pacientes
        </NavLink>

      </nav>

    </div>
  );
}

export default Sidebar;