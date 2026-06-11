import { useState } from "react";

import {
  ArrowLeft,
  FileDown
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import InputBusca from "../../components/InputBusca/InputBusca";
import FiltroSelect from "../../components/FiltroSelect/FiltroSelect";

import "./RelatorioUsuarios.css";

function RelatorioUsuarios() {

  const navigate = useNavigate();

  const [usuarios] = useState([]);

  return (
    <>
      <div className="relatorio-header">

        <div>

          <button
            className="btn-voltar"
            onClick={() =>
              navigate("/relatorios")
            }
          >
            <ArrowLeft size={18} />
            Voltar para relatórios
          </button>

          <h1>
            Relatório de Usuários
          </h1>

          <p>
            Lista os usuários cadastrados no sistema.
          </p>

        </div>

        <Button
          icon={<FileDown size={18} />}
        >
          Emitir relatório (PDF)
        </Button>

      </div>

      <div className="filtros-container">

        <InputBusca
          label="Nome"
          placeholder="Buscar usuário..."
        />

        <FiltroSelect
          label="Perfil"
          valor=""
          onChange={() => { }}
          opcoes={[]}
        />

        <FiltroSelect
          label="Status"
          valor=""
          onChange={() => { }}
          opcoes={[]}
        />

      </div>

      <div className="tabela-container">

        <div className="tabela-topo">

          <strong>
            Quantidade de usuários:
            <span className="total-valor">
              {" "}0
            </span>
          </strong>

        </div>

        <table className="tabela">

          <thead>

            <tr>
              <th>Nome</th>
              <th>Perfil</th>
              <th>Status</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>CRN</th>
              <th>Especialidade</th>
            </tr>

          </thead>

          <tbody>

            {usuarios.length > 0 ? (

              usuarios.map((u) => (

                <tr key={u.id}>
                  <td>{u.nome}</td>
                  <td>{u.perfil}</td>
                  <td>{u.status}</td>
                  <td>{u.telefone}</td>
                  <td>{u.email}</td>
                  <td>{u.crn}</td>
                  <td>{u.especialidade}</td>
                </tr>

              ))

            ) : (

              <tr className="empty-row">

                <td
                  colSpan="7"
                  className="empty-message"
                >
                  Nenhum usuário encontrado
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default RelatorioUsuarios;