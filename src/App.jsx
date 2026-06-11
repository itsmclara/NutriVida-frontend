import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "./components/Toast/Toast";

import Login from "./pages/Login/Login";

import Dashboard from "./pages/Dashboard/Dashboard";
import Agenda from "./pages/Agenda/Agenda";
import Pacientes from "./pages/Pacientes/Pacientes";
import Usuarios from "./pages/Usuarios/Usuarios";

import Relatorios from "./pages/Relatorios/Relatorios";

import RelatorioPacientes from "./pages/RelatorioPacientes/RelatorioPacientes";
import RelatorioConsultas from "./pages/RelatorioConsultas/RelatorioConsultas";
import RelatorioAgendaDia from "./pages/RelatorioAgendaDia/RelatorioAgendaDia";
import RelatorioUsuarios from "./pages/RelatorioUsuarios/RelatorioUsuarios";

import Layout from "./components/Layout/Layout";

function App() {

  const [toast, setToast] =
    useState({
      visivel: false,
      mensagem: "",
      tipo: "info"
    });

  useEffect(() => {

    window.mostrarToast = (
      mensagem,
      tipo = "info"
    ) => {

      setToast({
        visivel: true,
        mensagem,
        tipo
      });

      setTimeout(() => {

        setToast(prev => ({
          ...prev,
          visivel: false
        }));

      }, 3000);
    };

  }, []);

  return (

    <>
      <Toast
        visivel={toast.visivel}
        mensagem={toast.mensagem}
        tipo={toast.tipo}
      />

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

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

        {/* LISTA DE RELATÓRIOS */}
        <Route
          path="/relatorios"
          element={
            <Layout>
              <Relatorios />
            </Layout>
          }
        />

        {/* RELATÓRIOS */}
        <Route
          path="/relatorios/pacientes"
          element={
            <Layout>
              <RelatorioPacientes />
            </Layout>
          }
        />

        <Route
          path="/relatorios/consultas"
          element={
            <Layout>
              <RelatorioConsultas />
            </Layout>
          }
        />

        <Route
          path="/relatorios/agenda-dia"
          element={
            <Layout>
              <RelatorioAgendaDia />
            </Layout>
          }
        />

        <Route
          path="/relatorios/usuarios"
          element={
            <Layout>
              <RelatorioUsuarios />
            </Layout>
          }
        />

      </Routes>
    </>
  );
}

export default App;