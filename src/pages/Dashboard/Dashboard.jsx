import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { consultas, pacientes } from "../../mocks/dadosFake";

import ConsultasHoje from "../../components/ConsultasHoje/ConsultasHoje";
import PacienteResumo from "../../components/PacienteResumo/PacienteResumo";
import Historico from "../../components/Historico/Historico";

import ModalNovoPaciente from "../../components/ModalNovoPaciente/ModalNovoPaciente";
import ModalAgendarConsulta from "../../components/ModalAgendarConsulta/ModalAgendarconsulta";

import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [usuario] = useState(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");

    if (user && token) return user;
    return null;
  });

  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const [modalPacienteAberto, setModalPacienteAberto] = useState(false);
  const [modalConsultaAberto, setModalConsultaAberto] = useState(false);

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  function selecionarPaciente(consulta) {
    const paciente = pacientes.find(
      (p) => p.id === consulta.id_paciente
    );

    setPacienteSelecionado(paciente);
  }

  if (!usuario) return null;

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Visualize as consultas do dia e acesse as principais ações da clínica.
          </p>
        </div>

        {usuario.tipo === "SECRETARIA" && (
          <div className="dashboard-actions">
            <button
              className="btn-primary"
              onClick={() => setModalPacienteAberto(true)}
            >
              + Novo paciente
            </button>

            <button
              className="btn-primary"
              onClick={() => setModalConsultaAberto(true)}
            >
              + Agendar consulta
            </button>
          </div>
        )}
      </div>

      <div className={`dashboard-grid ${usuario.tipo === "SECRETARIA" ? "full" : ""}`}>

        <ConsultasHoje
          consultas={consultas}
          onSelecionar={selecionarPaciente}
        />

        {usuario.tipo === "NUTRICIONISTA" && (
          <>
            <PacienteResumo paciente={pacienteSelecionado} />
            <Historico paciente={pacienteSelecionado} />
          </>
        )}

      </div>

      <ModalNovoPaciente
        aberto={modalPacienteAberto}
        onClose={() => setModalPacienteAberto(false)}
      />

      <ModalAgendarConsulta
        key={modalConsultaAberto ? "dashboard" : "fechado"}
        aberto={modalConsultaAberto}
        onClose={() => setModalConsultaAberto(false)}
      />

    </div>
  );
}

export default Dashboard;