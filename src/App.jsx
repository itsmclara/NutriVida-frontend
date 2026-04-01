import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import DashboardSecretaria from "./pages/DashboardSecretaria/DashboardSecretaria";
import DashboardNutri from "./pages/DashboardNutri/DashboardNutri";
import Agenda from "./pages/Agenda/Agenda";
import Pacientes from "./pages/Pacientes/Pacientes";


import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard-secretaria"
        element={
          <Layout>
            <DashboardSecretaria />
          </Layout>
        }
      />

      <Route
        path="/dashboard-nutri"
        element={
          <Layout>
            <DashboardNutri />
          </Layout>
        }
      />

      <Route
        path="/agenda"
        element={
          <Layout>
            <Agenda />
          </Layout>
        }
      />

      <Route
        path="/pacientes"
        element={
          <Layout>
            <Pacientes />
          </Layout>
        }
      />

    </Routes>
  );
}

export default App;