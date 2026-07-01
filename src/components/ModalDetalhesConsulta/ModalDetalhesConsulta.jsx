import { FileText } from "lucide-react";
import Modal from "../Modal/Modal";
import "./ModalDetalhesConsulta.css";
import {
  formatarData,
  formatarTexto
} from "../../utils/formatadores";
import Button from "../Button/Button";

function ModalDetalhesConsulta({ aberto, onClose, consulta, onGerarPdf }) {

  if (!consulta) return null;

  return (
    <Modal aberto={aberto} onClose={onClose}>

      <div className="modal-header">
        <div className="modal-title">
          <FileText size={20} className="modal-icon" />
          <h2>Consulta - {formatarData(consulta.data)}</h2>
        </div>

        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="modal-body detalhes-body">

        <div className="detalhes-section">
          <span>Tipo</span>
          <p>{formatarTexto(consulta.tipoConsulta)}</p>
        </div>

        <div className="detalhes-section">
          <span>Resumo</span>
          <p>{consulta.resumo || "—"}</p>
        </div>

        <div className="detalhes-grid">

          <div>
            <span>Peso</span>
            <strong>{consulta.avaliacao?.peso} kg</strong>
          </div>

          <div>
            <span>Altura</span>
            <strong>{consulta.avaliacao?.altura} m</strong>
          </div>

          <div>
            <span>IMC</span>
            <strong>{consulta.avaliacao?.imc}</strong>
          </div>

          <div>
            <span>% Gordura</span>
            <strong>{consulta.avaliacao?.percentualGordura}</strong>
          </div>

          <div>
            <span>Circ. abdominal</span>
            <strong>{consulta.avaliacao?.circunferenciaAbdominal} cm</strong>
          </div>

          <div>
            <span>Circ. quadril</span>
            <strong>{consulta.avaliacao?.circunferenciaQuadril} cm</strong>
          </div>

        </div>

        <div className="detalhes-section">
          <span>Plano alimentar</span>
          <p className="plano-alimentar">
            {consulta.avaliacao?.planoAlimentar || "—"}
          </p>
        </div>

        <div className="detalhes-section">
          <span>Observações</span>
          <p>{consulta.observacoes || "—"}</p>
        </div>

      </div>

      <div className="modal-footer">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Fechar
        </Button>

        <Button
          onClick={onGerarPdf}
        >
          Gerar PDF
        </Button>
      </div>

    </Modal>
  );
}

export default ModalDetalhesConsulta;