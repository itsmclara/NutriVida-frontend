import { Calendar } from "lucide-react";
import ConsultaCard from "../ConsultaCard/ConsultaCard";
import "./ConsultasHoje.css";

function ConsultasHoje({ consultas, onSelecionar }) {

  return (
    <div className="consultas-card">

      <div className="card-header">
        <span className="card-titulo">
          <Calendar size={20} />
          Consultas de hoje
        </span>
      </div>

      <div className="card-body">
        <div className="consultas-lista">
          {consultas.map((c) => (
            <ConsultaCard
              key={c.id}
              consulta={c}
              mostrarHora={true} 
              onClick={onSelecionar} 
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default ConsultasHoje;