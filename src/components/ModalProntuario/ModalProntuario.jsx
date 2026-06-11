import { FileText } from "lucide-react";
import Modal from "../Modal/Modal";
import "./ModalProntuario.css";
import Button from "../Button/Button";

function ModalProntuario({ aberto, onClose, paciente, onEditar }) {

  if (!paciente) return null;

  const prontuario = paciente.prontuario || {};

  return (
    <Modal aberto={aberto} onClose={onClose}>

      <div className="modal-header">
        <div className="modal-title">
          <FileText size={20} className="modal-icon" />
          <h2>Prontuário</h2>
        </div>

        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="modal-body">

        <div className="prontuario-section">
          <span>Objetivo</span>
          <p>{prontuario.objetivo || "—"}</p>
        </div>

        <div className="prontuario-section">
          <span>Informações clínicas</span>
          <p>{prontuario.informacoesClinicas || "—"}</p>
        </div>

        <div className="prontuario-section">
          <span>Restrições alimentares</span>
          <p>{prontuario.restricaoAlimentar || "—"}</p>
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
          Editar prontuário
        </Button>
      </div>

    </Modal>
  );
}

export default ModalProntuario;