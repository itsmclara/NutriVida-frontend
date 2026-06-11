import { Calendar } from "lucide-react";

import AgendamentoCard from "../AgendamentoCard/AgendamentoCard";

import "./AgendamentosHoje.css";
import { formatarNomeNutri } from "../../utils/formatadores";

function AgendamentosHoje({
  agendamentos,
  onSelecionar,
  onAlterarStatus,
  itemSelecionado
}) {

  return (

    <div className="agendamentos-card">

      <div className="card-header">

        <span className="card-titulo">

          <Calendar size={20} />

          Consultas de hoje

        </span>

      </div>

      <div className="card-body">

        <div className="agendamentos-lista">

          {agendamentos.length > 0 ? (

            agendamentos.map((a) => (

              <AgendamentoCard
                key={a.itemAgendaId}

                selecionado={
                  itemSelecionado?.itemAgendaId ===
                  a.itemAgendaId
                }

                agendamentoId={a.itemAgendaId}

                nome={a.paciente?.nome}

                hora={a.hora}

                status={a.status}

                nutricionista={formatarNomeNutri(a.nutricionista)}

                mostrarHora={true}

                mostrarNutri={!!a.nutricionista}

                tipo="dashboard"

                onClick={() =>
                  onSelecionar(a)
                }

                onAlterarStatus={
                  onAlterarStatus
                }
              />

            ))

          ) : (

            <div className="empty-agendamentos">
              Nenhuma consulta para hoje
            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default AgendamentosHoje;