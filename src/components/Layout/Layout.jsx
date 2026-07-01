import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Layout.css";

function Layout({ children }) {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <div className="layout">

      <div
        className={`sidebar-overlay ${sidebarAberta ? "visivel" : ""}`}
        onClick={() => setSidebarAberta(false)}
      />

      <Sidebar
        aberta={sidebarAberta}
        onFechar={() => setSidebarAberta(false)}
      />

      <div className="layout-main">
        <Header
          usuario={usuario}
          onAbrirMenu={() => setSidebarAberta(true)}
        />

        <div className="layout-content">
          {children}
        </div>
      </div>

    </div>
  );
}

export default Layout;