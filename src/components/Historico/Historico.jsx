import { FileText, Eye } from "lucide-react";
import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";

import PdfConsulta from "../PdfConsulta/PdfConsulta";
import Modal from "../Modal/Modal"
import "./Historico.css";

function Historico({ paciente }) {

  const [abrirPdf, setAbrirPdf] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  if (!paciente) {
    return (
      <div className="historico-card empty">
        <p>Selecione um paciente para visualizar o histórico</p>
      </div>
    );
  }

  const historico = [
    {
      id: 1,
      data: "20/04/2026",
      descricao: "Ajuste de plano alimentar",
      peso: 72,
      altura: 1.68,
      observacoes: "Paciente apresentou boa evolução."
    },
    {
      id: 2,
      data: "06/04/2026",
      descricao: "Revisão do plano alimentar",
      peso: 73,
      altura: 1.68,
      observacoes: "Manter acompanhamento mensal."
    }
  ];

  return (
    <>
      <div className="historico-card">

        <div className="card-header">
          <span className="card-titulo">
            <FileText size={20} />
            Histórico
          </span>
        </div>

        <div className="historico-card-body">

          {historico.map((item) => (
            <div key={item.id} className="historico-item">

              <span className="historico-texto">
                {item.data} • {item.descricao}
              </span>

              <div className="historico-actions">
                <Eye size={20} className="icon-eye" />

                <FileText
                  size={20}
                  className="icon-pdf"
                  onClick={() => {
                    setConsultaSelecionada(item);
                    setAbrirPdf(true);
                  }}
                />
              </div>

            </div>
          ))}

        </div>

      </div>

      <Modal aberto={abrirPdf} onClose={() => setAbrirPdf(false)} className="modal-sem-scroll">
        <div className="pdf-container">

          <button
            className="btn-fechar-pdf"
            onClick={() => setAbrirPdf(false)}
          >
            ✕
          </button>

          <PDFViewer className="pdf-viewer">
            <PdfConsulta
              consulta={consultaSelecionada}
              paciente={paciente}
            />
          </PDFViewer>

        </div>
      </Modal>

    </>
  );
}

export default Historico;