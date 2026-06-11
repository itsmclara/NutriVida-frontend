import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Users, Users2, LogOut, FileSpreadsheet } from "lucide-react";
import "./Sidebar.css";
import logo from "../../assets/logo-horizontal.svg";

function Sidebar() {

  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  function handleLogout() {
    sessionStorage.removeItem("usuario");
    window.location.href = "/"
  }

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="sidebar-menu">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <LayoutDashboard size={20} className="menu-icon" />
          Dashboard
        </NavLink>

        <NavLink
          to="/agenda"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <CalendarDays size={20} className="menu-icon" />
          Agenda
        </NavLink>

        <NavLink
          to="/pacientes"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <Users size={20} className="menu-icon" />
          Pacientes
        </NavLink>

        {usuario?.perfil?.toUpperCase() === "ADMINISTRADOR" && (
          <NavLink
            to="/usuarios"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <Users2 size={20} className="menu-icon" />
            Usuários
          </NavLink>
        )}

        <NavLink
          to="/relatorios"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FileSpreadsheet size={20} className="menu-icon" />
          Relatórios
        </NavLink>

      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          Sair
        </button>
      </div>

    </div>
  );
}

export default Sidebar;