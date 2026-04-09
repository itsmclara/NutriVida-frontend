import { useState } from "react";
import { Eye, Pencil } from "lucide-react";
import "./Pacientes.css";
import { pacientes } from "../../mocks/dadosFake";
import ModalNovoPaciente from "../../components/ModalNovoPaciente/ModalNovoPaciente"

function Pacientes() {

  const [modalAberto, setModalAberto] = useState(false);
  
  return (
    <>

      <div className="pacientes-header">

        <div>
          <h1>Pacientes</h1>
          <p>
            Visualize, cadastre e edite os dados dos pacientes da clínica.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setModalAberto(true)}>
          + Novo paciente
        </button>

      </div>

      <div className="tabela-container">

        <table className="tabela">

          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Gênero</th>
              <th>Contato</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {pacientes.length > 0 ? (
              pacientes.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nome}</td>
                  <td>{p.idade}</td>
                  <td>{p.genero}</td>
                  <td>{p.contato}</td>

                  <td className="acoes">
                    <Eye size={20} className="icon-view"/>
                    <Pencil size={20} className="icon-edit"/>
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
        aberto={modalAberto}
        onClose={() => setModalAberto(false)}
      />

    </>
  );
}

export default Pacientes;