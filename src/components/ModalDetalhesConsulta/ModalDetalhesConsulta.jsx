import { FileText } from "lucide-react";
import Modal from "../Modal/Modal";
import "./ModalDetalhesConsulta.css";

function ModalDetalhesConsulta({ aberto, onClose, consulta }) {

  if (!consulta) return null;

  return (
    <Modal aberto={aberto} onClose={onClose}>

      <div className="modal-header">
        <div className="modal-title">
          <FileText size={20} className="modal-icon" />
          <h2>Consulta - {consulta?.data}</h2>
        </div>

        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="modal-body detalhes-body">

        <div className="detalhes-section">
          <span>Tipo de consulta</span>
          <p>{consulta?.tipo}</p>
        </div>

        <div className="detalhes-section">
          <span>Resumo da consulta</span>
          <p>{consulta?.resumo}</p>
        </div>

        <div className="detalhes-divider" />

        <h3 className="section-title">Avaliação física</h3>

        <div className="detalhes-grid">

          <div>
            <span>Peso</span>
            <strong>{consulta?.peso} kg</strong>
          </div>

          <div>
            <span>Altura</span>
            <strong>{consulta?.altura} m</strong>
          </div>

          <div>
            <span>Circunferência abdominal</span>
            <strong>{consulta?.circAbdominal} cm</strong>
          </div>

          <div>
            <span>Circunferência do quadril</span>
            <strong>{consulta?.circQuadril} cm</strong>
          </div>

          <div>
            <span>IMC</span>
            <strong>{consulta?.imc}</strong>
          </div>

          {consulta?.gorduraCorporal && (
            <div>
              <span>Gordura corporal</span>
              <strong>{consulta.gorduraCorporal}%</strong>
            </div>
          )}

        </div>

        <div className="detalhes-section">
          <span>Plano alimentar</span>
          <ul>
            {consulta?.planoAlimentar?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="detalhes-section">
          <span>Observações</span>
          <p>{consulta?.observacoes}</p>
        </div>

      </div>

      <div className="modal-footer">
        <button className="btn-secondary" onClick={onClose}>
          Fechar
        </button>

        <button className="btn-primary">
          Gerar PDF
        </button>
      </div>

    </Modal>
  );
}

export default ModalDetalhesConsulta;