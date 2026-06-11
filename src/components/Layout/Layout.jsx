import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Layout.css";

function Layout({ children }) {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  return (
    <div className="layout">

      <Sidebar />

      <div className="layout-main">
        <Header usuario={usuario} />

        <div className="layout-content">
          {children}
        </div>
      </div>

    </div>
  );
}

export default Layout;