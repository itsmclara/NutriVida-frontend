import { FileText, Eye } from "lucide-react";
import "./Historico.css";

function Historico({ paciente }) {

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
      descricao: "Ajuste de plano alimentar"
    },
    {
      id: 2,
      data: "06/04/2026",
      descricao: "Revisão do plano alimentar"
    }
  ];

  return (
    <div className="historico-card">

      <div className="card-header">
        <span className="card-titulo">
          <FileText size={20} />
          Histórico
        </span>
      </div>

      <div className="card-body">

        {historico.map((item) => (
          <div key={item.id} className="historico-item">

            <span className="historico-texto">
              {item.data} • {item.descricao}
            </span>

            <div className="historico-actions">
              <Eye size={20} className="icon-eye" />
              <FileText size={20} className="icon-pdf" />
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Historico;