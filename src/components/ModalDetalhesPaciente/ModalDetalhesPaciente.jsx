import { User } from "lucide-react";
import Modal from "../Modal/Modal";
import "./ModalDetalhesPaciente.css";
import { formatarCPF, formatarTelefone, formatarData} from "../../utils/formatadores";

function ModalDetalhesPaciente({ aberto, onClose, paciente, onEditar }) {

  if (!paciente) return null;

  function montarEndereco(p) {
    const partes = [
      p.logradouro,
      p.numero,
      p.bairro,
      p.cidade
    ];

    const filtrado = partes.filter(
      (item) => item !== null && item !== undefined && item !== ""
    );

    return filtrado.length > 0 ? filtrado.join(", ") : "—";
  }

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
            <strong>{formatarData(paciente.dataCadastro) || "—"}</strong>
          </div>

          <div>
            <span>Nome</span>
            <strong>{paciente.nome}</strong>
          </div>

          <div>
            <span>Gênero</span>
            <strong>{paciente.genero || "—"}</strong>
          </div>

          <div>
            <span>CPF</span>
            <strong>{formatarCPF(paciente.cpf)}</strong>
          </div>

          <div>
            <span>Data de nascimento</span>
            <strong>{formatarData(paciente.dataNascimento) || "—"}</strong>
          </div>

          <div>
            <span>Telefone</span>
            <strong>{formatarTelefone(paciente.telefone) || "—"}</strong>
          </div>

          <div>
            <span>E-mail</span>
            <strong>{paciente.email || "—"}</strong>
          </div>

        </div>

        <div className="detalhes-section">
          <span>Endereço</span>
          <p>{montarEndereco(paciente)}</p>
        </div>

      </div>

      <div className="modal-footer">
        <button className="btn-secondary" onClick={onClose}>
          Fechar
        </button>

        <button className="btn-primary" onClick={onEditar}>
          Editar paciente
        </button>
      </div>

    </Modal>
  );
}

export default ModalDetalhesPaciente;