import { useState, useEffect } from "react";

import {
  Plus,
  Users,
  Calendar,
  UserPlus,
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  TrendingUp,
  UserRound
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import ResumoNutricionistas from "../../components/ResumoNutricionistas/ResumoNutricionistas";

import {
  dateParaISO
} from "../../utils/formatadores";

import AgendamentosHoje from "../../components/AgendamentosHoje/AgendamentosHoje";
import PacienteResumo from "../../components/PacienteResumo/PacienteResumo";
import Historico from "../../components/Historico/Historico";
import CardResumo from "../../components/CardResumo/CardResumo";
import Button from "../../components/Button/Button";

import ModalNovoPaciente from "../../components/ModalNovoPaciente/ModalNovoPaciente";
import ModalNovoUsuario from "../../components/ModalNovoUsuario/ModalNovoUsuario";
import ModalNovaConsulta from "../../components/ModalNovaConsulta/ModalNovaConsulta";

import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [usuario] = useState(() => {

    const user = JSON.parse(sessionStorage.getItem("usuario"));
    const token = sessionStorage.getItem("token");

    return user && token
      ? user
      : null;
  });

  const [agendamentos, setAgendamentos] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [itemAgendaSelecionado, setItemAgendaSelecionado] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [resumo, setResumo] = useState(null);
  const [resumoNutricionistas, setResumoNutricionistas] = useState([]);

  const [modalPacienteAberto, setModalPacienteAberto] = useState(false);
  const [modalUsuarioAberto, setModalUsuarioAberto] = useState(false);
  const [modalConsultaAberto, setModalConsultaAberto] = useState(false);

  const dataHoje = dateParaISO(new Date());

  const consultasHoje =
    resumoNutricionistas.reduce(
      (total, nutri) =>
        total + (nutri.totalHoje || 0),
      0
    );

  const pendentesHoje =
    resumoNutricionistas.reduce(
      (total, nutri) =>
        total +
        (nutri.agendadas || 0) +
        (nutri.confirmadas || 0),
      0
    );

  const realizadasHoje =
    resumoNutricionistas.reduce(
      (total, nutri) =>
        total + (nutri.realizadas || 0),
      0
    );

  const canceladasHoje =
    resumoNutricionistas.reduce(
      (total, nutri) =>
        total +
        (nutri.canceladas || 0) +
        (nutri.ausentes || 0),
      0
    );

  useEffect(() => {

    if (!usuario) {
      navigate("/");
      return;
    }

    async function carregarDashboardInicial() {

      try {

        const res = await api.get("/dashboard", {
          params: {
            data: dataHoje
          }
        });


        setAgendamentos(res.data.agendamentosHoje || []);
        setPacienteSelecionado(null);
        setHistorico([]);
        setResumo(res.data);
        setResumoNutricionistas(
          res.data.resumoNutricionistas || []
        );

      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      }
    }

    carregarDashboardInicial();

  }, [usuario, navigate, dataHoje]);

  async function carregarPaciente(pacienteId) {

    try {

      const res = await api.get(
        "/dashboard",
        {
          params: {
            data: dataHoje,
            pacienteId
          }
        }
      );

      const agendamentosAtualizados =
        res.data.agendamentosHoje || [];

      setAgendamentos(
        agendamentosAtualizados
      );

      const itemAtualizado =
        agendamentosAtualizados.find(
          (a) =>
            a.paciente?.id === pacienteId
        );

      setItemAgendaSelecionado(
        itemAtualizado || null
      );

      setPacienteSelecionado(
        res.data.pacienteSelecionado || null
      );

      setHistorico(
        res.data.historico || []
      );

      setResumo(
        res.data
      );

    } catch (err) {

      console.error(
        "Erro ao carregar paciente:",
        err
      );
    }
  }

  function selecionarPaciente(itemAgenda) {

    const pacienteId =
      itemAgenda?.paciente?.id;

    if (!pacienteId) return;

    carregarPaciente(
      pacienteId
    );
  }

  if (!usuario) return null;

  async function alterarStatus(id, status) {

    try {

      await api.put(
        `/agendamentos/${id}/status`,
        {
          status
        }
      );

      setAgendamentos((prev) =>
        prev.map((a) => {

          if (a.itemAgendaId === id) {

            return {
              ...a,
              status
            };
          }

          return a;
        })
      );

    } catch (error) {

      console.error(
        "Erro ao alterar status:",
        error
      );
    }
  }

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">

        <div>
          <h1>Dashboard</h1>

          <p>
            Visualize as consultas do dia e acesse as principais ações da clínica.
          </p>
        </div>

        {/* SECRETÁRIA */}
        {usuario.perfil === "SECRETARIA" && (

          <div className="dashboard-actions">

            <Button
              onClick={() => setModalPacienteAberto(true)}
              icon={<Plus size={18} />}
            >
              Novo paciente
            </Button>

            <Button
              onClick={() => setModalConsultaAberto(true)}
              icon={<Plus size={18} />}
            >
              Nova consulta
            </Button>

          </div>

        )}

        {/* ADMIN */}
        {usuario.perfil === "ADMINISTRADOR" && (

          <div className="dashboard-actions">

            <Button
              onClick={() => setModalUsuarioAberto(true)}
              icon={<UserPlus size={18} />}
            >
              Novo usuário
            </Button>

            <Button
              onClick={() => setModalPacienteAberto(true)}
              icon={<Plus size={18} />}
            >
              Novo paciente
            </Button>

          </div>

        )}

      </div>

      {/* 🔥 CARDS */}
      {usuario.perfil === "ADMINISTRADOR" && (

        <div className="dashboard-cards">

          <CardResumo
            titulo="Total de usuários"
            valor={resumo?.totalUsuarios}
            icon={Users}
            cor="azul"
          />

          <CardResumo
            titulo="Total de pacientes"
            valor={resumo?.totalPacientes}
            icon={UserRound}
            cor="verde"
          />

          <CardResumo
            titulo="Agendamentos hoje"
            valor={resumo?.consultasHoje}
            icon={CalendarDays}
            cor="roxo"
          />

          <CardResumo
            titulo="Agendamentos no mês"
            valor={resumo?.agendamentosMes}
            icon={TrendingUp}
            cor="laranja"
          />

        </div>


      )}

      {usuario.perfil === "SECRETARIA" && (

        <>
          <div className="dashboard-section-header">

            <div className="dashboard-section-title">

              <Calendar
                size={20}
                className="dashboard-section-icon"
              />

              <h2>
                Resumo do dia
              </h2>

            </div>

          </div>

          <div className="dashboard-cards">

            <CardResumo
              titulo="Consultas hoje"
              valor={consultasHoje}
              descricao="agendamentos"
              icon={CalendarDays}
              cor="roxo"
            />

            <CardResumo
              titulo="Pendentes"
              valor={pendentesHoje}
              descricao="aguardando atendimento"
              icon={Clock3}
              cor="rosa"
            />

            <CardResumo
              titulo="Realizadas"
              valor={realizadasHoje}
              descricao="consultas concluídas"
              icon={CheckCircle2}
              cor="verde"
            />

            <CardResumo
              titulo="Canceladas/Faltas"
              valor={canceladasHoje}
              descricao="não realizadas"
              icon={XCircle}
              cor="vermelho"
            />

          </div>

        </>

      )}

      {/* GRID */}
      <div
        className={`dashboard-grid ${usuario.perfil === "SECRETARIA" ||
          usuario.perfil === "ADMINISTRADOR"
          ? "full"
          : ""
          }`}
      >

        {(usuario.perfil === "SECRETARIA" ||
          usuario.perfil === "ADMINISTRADOR") && (

            <section className="dashboard-section">

              <div className="dashboard-section-header">

                <div className="dashboard-section-title">

                  <Users
                    size={20}
                    className="dashboard-section-icon"
                  />

                  <h2>
                    Situação das nutricionistas
                  </h2>

                </div>

              </div>

              <ResumoNutricionistas
                nutricionistas={resumoNutricionistas}
              />

            </section>

          )}

        {usuario.perfil === "NUTRICIONISTA" && (
          <>
            <AgendamentosHoje
              agendamentos={agendamentos}
              onSelecionar={selecionarPaciente}
              onAlterarStatus={alterarStatus}
              itemSelecionado={itemAgendaSelecionado}
            />

            <PacienteResumo
              paciente={pacienteSelecionado}
              itemAgenda={itemAgendaSelecionado}
              onAtualizar={carregarPaciente}
            />

            <Historico
              historico={historico}
              paciente={pacienteSelecionado}
              onAtualizar={() =>
                carregarPaciente(
                  pacienteSelecionado.id
                )
              }
            />
          </>
        )}

      </div>

      {/* MODAIS */}

      <ModalNovoPaciente
        aberto={modalPacienteAberto}
        onClose={() => setModalPacienteAberto(false)}
      />

      <ModalNovoUsuario
        aberto={modalUsuarioAberto}
        onClose={() => setModalUsuarioAberto(false)}
      />

      <ModalNovaConsulta
        aberto={modalConsultaAberto}
        onClose={() => setModalConsultaAberto(false)}
        dataInicial={dataHoje}
      />

    </div>
  );
}

export default Dashboard;