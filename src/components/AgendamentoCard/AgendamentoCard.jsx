import {
  Clock,
  ChevronRight,
  ChevronDown
} from "lucide-react";

import StatusBadge from "../StatusBadge/StatusBadge";

import "./AgendamentoCard.css";

function AgendamentoCard({
  nome,
  hora,
  status,
  nutricionista,

  agendamentoId,
  selecionado = false,

  mostrarHora = false,
  mostrarNutri = false,

  tipo = "dashboard",

  onClick,
  onAlterarStatus
}) {

  const iniciais =
    nome
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (

    <div
      className={`
        agendamento-card
        ${status === "CANCELADA"
          ? "cancelado"
          : ""}
        ${selecionado
          ? "selecionado"
          : ""}
        ${onClick ? "clicavel" : ""}
      `}
      onClick={onClick}
    >

      <div className="avatar">
        {iniciais}
      </div>

      <div className="agendamento-info">

        <span className="nome">
          {nome || "Sem paciente"}
        </span>

        {mostrarNutri && nutricionista && (

          <span className="sub-info">
            {nutricionista}
          </span>

        )}

        {mostrarHora && (

          <span className="hora-agendamento">

            <Clock size={14} />

            {hora}

          </span>

        )}

      </div>

      {onAlterarStatus && status && (

        <StatusBadge
          status={status}
          onChange={(novoStatus) =>
            onAlterarStatus(
              agendamentoId,
              novoStatus
            )
          }
        />

      )}

      <div className="seta-container">

        {tipo === "dashboard" ? (

          <ChevronRight
            size={18}
            className="seta-icon"
          />

        ) : (

          <ChevronDown
            size={18}
            className="seta-icon"
          />

        )}

      </div>

    </div>

  );
}

export default AgendamentoCard;