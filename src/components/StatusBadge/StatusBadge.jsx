import { useState } from "react";
import "./StatusBadge.css";

function StatusBadge({ status, onChange }) {

  const [aberto, setAberto] = useState(false);

  const opcoes = [
    "AGENDADA",
    "CONFIRMADA",
    "REALIZADA",
    "CANCELADA",
    "AUSENTE"
  ];

  function trocarStatus(novoStatus) {

    onChange(novoStatus);

    setAberto(false);
  }

  return (

    <div
      className="status-container"
      onClick={(e) => e.stopPropagation()}
    >

      <span
        className={`status ${status?.toLowerCase()}`}
        onClick={(e) => {

          e.stopPropagation();

          setAberto(!aberto);
        }}
      >

        {
          status?.charAt(0) +
          status?.slice(1).toLowerCase()
        }

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

              {
                op.charAt(0) +
                op.slice(1).toLowerCase()
              }

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default StatusBadge;