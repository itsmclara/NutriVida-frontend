import { useState } from "react";
import { MoreVertical } from "lucide-react";
import StatusBadge from "../StatusBadge/StatusBadge";
import "./ConsultaCard.css";

function ConsultaCard({ consulta, mostrarHora = false }) {

  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="consulta-card">

      <div className="avatar">
        {consulta.nome
          .split(" ")
          .map(n => n[0])
          .join("")
          .slice(0, 2)}
      </div>

      <div className="consulta-info">
        <span className="nome">{consulta.nome}</span>

        {mostrarHora && (
          <span className="hora-consulta">{consulta.hora}</span>
        )}
      </div>

      <StatusBadge statusInicial={consulta.status} />

      <div className="menu-container">

        <MoreVertical
          size={18}
          className="menu-icon"
          onClick={() => setMenuAberto(!menuAberto)}
        />

        {menuAberto && (
          <div className="menu-dropdown">

            <div className="menu-item">
              Ver paciente
            </div>

            <div className="menu-item">
              Remarcar consulta
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ConsultaCard;