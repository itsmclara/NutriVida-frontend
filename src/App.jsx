import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Agenda from "./pages/Agenda/Agenda";
import Pacientes from "./pages/Pacientes/Pacientes";
import Usuarios from "./pages/Usuarios/Usuarios";

import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
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

      <Route
        path="/usuarios"
        element={
          <Layout>
            <Usuarios />
          </Layout>
        }
      />

    </Routes>
  );
}

export default App;