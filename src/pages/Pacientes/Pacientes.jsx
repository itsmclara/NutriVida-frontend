import { useState, useEffect } from "react";
import { Eye, Pencil, History, ClipboardList, Plus } from "lucide-react";
import "./Pacientes.css";

import api from "../../services/api";
import { formatarTelefone, calcularIdade } from "../../utils/formatadores";

import ModalNovoPaciente from "../../components/ModalNovoPaciente/ModalNovoPaciente";
import ModalDetalhesPaciente from "../../components/ModalDetalhesPaciente/ModalDetalhesPaciente";
import ModalEditarPaciente from "../../components/ModalEditarPaciente/ModalEditarPaciente";
import ModalProntuario from "../../components/ModalProntuario/ModalProntuario";
import ModalEditarProntuario from "../../components/ModalEditarProntuario/ModalEditarProntuario";
import ModalHistorico from "../../components/ModalHistorico/ModalHistorico";
import InputBusca from "../../components/InputBusca/InputBusca";
import Button from "../../components/Button/Button";

function Pacientes() {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");

  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalProntuarioAberto, setModalProntuarioAberto] = useState(false);
  const [modalEditarProntuarioAberto, setModalEditarProntuarioAberto] = useState(false);
  const [modalHistoricoAberto, setModalHistoricoAberto] = useState(false);

  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  useEffect(() => {
    async function carregarInicial() {
      try {
        const res = await api.get("/pacientes", {
          params: { limit: 5 }
        });
        setPacientes(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
      }
    }

    carregarInicial();
  }, []);

  async function buscarPacientes(termo) {
    try {
      const params = {};

      if (termo) {
        params.busca = termo;
      } else {
        params.limit = 5;
      }

      const res = await api.get("/pacientes", { params });

      if (Array.isArray(res.data)) {
        setPacientes(res.data);
      } else {
        setPacientes([]);
      }

    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  async function atualizarPacienteAtualizado(id) {
    try {
      const params = {};

      if (busca) {
        params.busca = busca;
      } else {
        params.limit = 5;
      }

      const res = await api.get("/pacientes", {
        params
      });

      if (Array.isArray(res.data)) {
        setPacientes(res.data);

        const atualizado = res.data.find(p => p.id === id);

        if (atualizado) {
          setPacienteSelecionado(atualizado);
        }
      }

    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
    }
  }

  return (
    <>
      <div className="pacientes-header">
        <div>
          <h1>Pacientes</h1>
          <p>
            Visualize, cadastre e edite os dados dos pacientes da clínica.
          </p>
        </div>

        <Button
          onClick={() => setModalNovoAberto(true)}
          icon={<Plus size={18} />}
        >
          Novo paciente
        </Button>
      </div>

      <div className="busca-wrapper">
        <InputBusca
          label="Buscar"
          placeholder="Buscar paciente por nome ou CPF"
          onBuscar={(termo) => {
            setBusca(termo);
            buscarPacientes(termo);
          }}
        />
      </div>

      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Gênero</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {pacientes.length > 0 ? (
              pacientes.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nome}</td>
                  <td>{calcularIdade(p.dataNascimento)}</td>
                  <td>{p.genero}</td>
                  <td>{formatarTelefone(p.telefone)}</td>

                  <td className="acoes">

                    <Eye
                      size={20}
                      className="icon-view"
                      title="Visualizar"
                      onClick={() => {
                        setPacienteSelecionado(p);
                        setModalDetalhesAberto(true);
                      }}
                    />

                    {usuario?.perfil === "SECRETARIA" ? (
                      <Pencil
                        size={20}
                        className="icon-edit"
                        title="Editar paciente"
                        onClick={() => {
                          setPacienteSelecionado(p);
                          setModalEditarAberto(true);
                        }}
                      />
                    ) : (
                      <>
                        <ClipboardList
                          size={20}
                          className="icon-prontuario"
                          title="Prontuário"
                          onClick={() => {
                            setPacienteSelecionado(p);
                            setModalProntuarioAberto(true);
                          }}
                        />

                        <History
                          size={20}
                          className="icon-historico"
                          title="Histórico"
                          onClick={() => {
                            setPacienteSelecionado(p);
                            setModalHistoricoAberto(true);
                          }}
                        />
                      </>
                    )}

                  </td>
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan="6" className="empty-message">
                  Nenhum paciente encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAIS */}

      <ModalNovoPaciente
        aberto={modalNovoAberto}
        onClose={() => setModalNovoAberto(false)}
        onPacienteCriado={() => {

          if (busca) {
            buscarPacientes(busca);
          } else {
            buscarPacientes();
          }

        }}
      />

      <ModalDetalhesPaciente
        aberto={modalDetalhesAberto}
        onClose={() => setModalDetalhesAberto(false)}
        paciente={pacienteSelecionado}
        onEditar={() => {
          setModalDetalhesAberto(false);
          setModalEditarAberto(true);
        }}
      />

      <ModalEditarPaciente
        aberto={modalEditarAberto}
        onClose={() => {
          setModalEditarAberto(false);

          if (busca) {
            buscarPacientes(busca);
          } else {
            buscarPacientes();
          }
        }}
        paciente={pacienteSelecionado}
      />

      <ModalProntuario
        aberto={modalProntuarioAberto}
        onClose={() => setModalProntuarioAberto(false)}
        paciente={pacienteSelecionado}
        onEditar={() => {
          setModalProntuarioAberto(false);
          setModalEditarProntuarioAberto(true);
        }}
      />

      <ModalEditarProntuario
        aberto={modalEditarProntuarioAberto}
        onClose={() => setModalEditarProntuarioAberto(false)}
        onSalvo={() => atualizarPacienteAtualizado(pacienteSelecionado.id)}
        paciente={pacienteSelecionado}
      />

      <ModalHistorico
        aberto={modalHistoricoAberto}
        onClose={() => setModalHistoricoAberto(false)}
        paciente={pacienteSelecionado}
      />

    </>
  );
}

export default Pacientes;