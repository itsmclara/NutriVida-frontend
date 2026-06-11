import { User } from "lucide-react";
import Modal from "../Modal/Modal";
import "./ModalDetalhesUsuario.css";
import { formatarTelefone } from "../../utils/formatadores";
import Button from "../Button/Button";

function ModalDetalhesUsuario({ aberto, onClose, usuario, onEditar }) {

  if (!usuario) return null;

  return (
    <Modal aberto={aberto} onClose={onClose}>

      <div className="modal-header">
        <div className="modal-title">
          <User size={20} className="modal-icon" />
          <h2>Detalhes do usuário</h2>
        </div>

        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="modal-body detalhes-body">

        <div className="detalhes-grid">

          <div>
            <span>ID</span>
            <strong>{usuario?.id}</strong>
          </div>

          <div>
            <span>Perfil de usuário</span>
            <strong>{usuario?.perfil}</strong>
          </div>

          <div>
            <span>Nome</span>
            <strong>{usuario?.nome}</strong>
          </div>

          <div>
            <span>E-mail</span>
            <strong>{usuario?.email}</strong>
          </div>

          <div>
            <span>Telefone</span>
            <strong>{formatarTelefone(usuario?.telefone)}</strong>
          </div>

          {usuario?.crn && (
            <div>
              <span>CRN</span>
              <strong>{usuario.crn}</strong>
            </div>
          )}

          {usuario?.especialidade && (
            <div>
              <span>Especialidade</span>
              <strong>{usuario.especialidade}</strong>
            </div>
          )}

        </div>

      </div>

      <div className="modal-footer">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Fechar
        </Button>

        <Button onClick={onEditar}>
          Editar usuário
        </Button>
      </div>

    </Modal>
  );
}

export default ModalDetalhesUsuario;