import { User } from "lucide-react";
import Modal from "../Modal/Modal";
import "./ModalDetalhesPaciente.css";

function ModalDetalhesPaciente({ aberto, onClose, paciente }) {

  if (!paciente) return null;

  return (
    <Modal aberto={aberto} onClose={onClose}>

      <div className="modal-header">
        <div className="modal-title">
          <User size={20} className="modal-icon" />
          <h2>Detalhes do paciente</h2>
        </div>

        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="modal-body detalhes-body">

        <div className="detalhes-grid">

          <div>
            <span>ID</span>
            <strong>{paciente.id}</strong>
          </div>

          <div>
            <span>Data de cadastro</span>
            <strong>{paciente.dataCadastro}</strong>
          </div>

          <div>
            <span>Nome</span>
            <strong>{paciente.nome}</strong>
          </div>

          <div>
            <span>Gênero</span>
            <strong>{paciente.genero}</strong>
          </div>

          <div>
            <span>CPF</span>
            <strong>{paciente.cpf}</strong>
          </div>

          <div>
            <span>Data de nascimento</span>
            <strong>{paciente.dataNascimento}</strong>
          </div>

          <div>
            <span>Telefone</span>
            <strong>{paciente.telefone}</strong>
          </div>

          <div>
            <span>E-mail</span>
            <strong>{paciente.email}</strong>
          </div>

        </div>

        <div className="detalhes-section">
          <span>Endereço</span>
          <p>
            {paciente.endereco?.logradouro}, {paciente.endereco?.numero},{" "}
            {paciente.endereco?.bairro}, {paciente.endereco?.cidade} - {paciente.endereco?.uf}
          </p>
        </div>

      </div>

      <div className="modal-footer">
        <button className="btn-secondary" onClick={onClose}>
          Fechar
        </button>

        <button className="btn-primary">
          Editar paciente
        </button>
      </div>

    </Modal>
  );
}

export default ModalDetalhesPaciente;