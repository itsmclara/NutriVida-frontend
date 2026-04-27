import { useState, useEffect } from "react";
import { Eye, Pencil } from "lucide-react";
import "./Pacientes.css";

import api from "../../services/api";
import { formatarTelefone, calcularIdade } from "../../utils/formatadores";

import ModalNovoPaciente from "../../components/ModalNovoPaciente/ModalNovoPaciente";
import ModalDetalhesPaciente from "../../components/ModalDetalhesPaciente/ModalDetalhesPaciente";
import ModalEditarPaciente from "../../components/ModalEditarPaciente/ModalEditarPaciente";
import BuscaInput from "../../components/BuscaInput/BuscaInput";

function Pacientes() {

  const [pacientes, setPacientes] = useState([]);

  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);

  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);


  async function buscarPacientes(termo) {
  try {
    let res;

    if (termo) {
      res = await api.get(`/paciente?busca=${termo}`);
    } else {
      res = await api.get("/paciente/recentes");
    }

    if (Array.isArray(res.data)) {
      setPacientes(res.data);
    } else {
      console.error("Resposta inesperada:", res.data);
      setPacientes([]);
    }

    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  useEffect(() => {
    async function carregarPacientes() {
      await buscarPacientes();
    }

    carregarPacientes();
  }, []);


  return (
    <>

      <div className="pacientes-header">

        <div>
          <h1>Pacientes</h1>
          <p>
            Visualize, cadastre e edite os dados dos pacientes da clínica.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setModalNovoAberto(true)}
        >
          + Novo paciente
        </button>

      </div>

      <div className="busca-wrapper">
        <BuscaInput
          placeholder="Buscar paciente por nome ou CPF"
          onBuscar={buscarPacientes}
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
                      onClick={() => {
                        setPacienteSelecionado(p);
                        setModalDetalhesAberto(true);
                      }}
                    />

                    <Pencil
                      size={20}
                      className="icon-edit"
                      onClick={() => {
                        setPacienteSelecionado(p);
                        setModalEditarAberto(true);
                      }}
                    />

                  </td>
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan="5" className="empty-message">
                  Nenhum paciente encontrado
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

      <ModalNovoPaciente
        aberto={modalNovoAberto}
        onClose={() => setModalNovoAberto(false)}
        onPacienteCriado={buscarPacientes}
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
          buscarPacientes();
        }}
        paciente={pacienteSelecionado}
      />

    </>
  );
}

export default Pacientes;