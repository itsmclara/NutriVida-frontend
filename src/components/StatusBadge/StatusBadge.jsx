import { useState } from "react";
import "./StatusBadge.css";

function StatusBadge({ statusInicial }) {

  const [status, setStatus] = useState(statusInicial);
  const [aberto, setAberto] = useState(false);

  const opcoes = [
    "Agendada",
    "Confirmada",
    "Realizada",
    "Cancelada",
    "Ausente"
  ];

  function trocarStatus(novoStatus) {
    setStatus(novoStatus);
    setAberto(false);
  }

  return (
    <div
      className="status-container"
      onClick={(e) => e.stopPropagation()} 
    >

      <span
        className={`status ${status.toLowerCase()}`}
        onClick={(e) => {
          e.stopPropagation(); 
          setAberto(!aberto);
        }}
      >
        {status}
      </span>

      {aberto && (
        <div className="status-dropdown">

          {opcoes.map((op) => (
            <div
              key={op}
              className="status-item"
              onClick={(e) => {
                e.stopPropagation();
                trocarStatus(op);
              }}
            >
              {op}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default StatusBadge;