import { User, FileEdit, PlusCircle } from "lucide-react";
import "./PacienteResumo.css";

function PacienteResumo({ paciente }) {

  if (!paciente) {
    return (
      <div className="paciente-card empty">
        <p>Selecione um paciente para visualizar os dados</p>
      </div>
    );
  }

  return (
    <div className="paciente-card">

      <div className="card-header">
        <span className="card-titulo">
          <User size={20} />
          Detalhes do paciente
        </span>
      </div>

      <div className="card-body">

        <div className="paciente-grid">

          <div>
            <span>Nº do prontuário</span>
            <strong>00001</strong>
          </div>

          <div>
            <span>Nome</span>
            <strong>{paciente.nome}</strong>
          </div>

          <div>
            <span>Idade</span>
            <strong>20</strong>
          </div>

          <div>
            <span>Gênero</span>
            <strong>Masculino</strong>
          </div>

        </div>

        <div className="paciente-section">
          <span>Objetivo</span>
          <p>Emagrecimento saudável...</p>
        </div>

        <div className="paciente-section">
          <span>Informações clínicas</span>
          <p>Diabetes tipo 2...</p>
        </div>

        <div className="paciente-section">
          <span>Restrições</span>
          <p>Intolerância à lactose</p>
        </div>

        <div className="paciente-actions">
          <button className="btn-secondary">
            <FileEdit size={16}/> Editar prontuário
          </button>

          <button className="btn-primary">
            <PlusCircle size={16}/> Registrar consulta
          </button>
        </div>

      </div>

    </div>
  
  );
}

export default PacienteResumo;