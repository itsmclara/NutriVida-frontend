import "./AgendaCard.css";
import { formatarNomeNutri, formatarData, formatarTexto } from "../../utils/formatadores";

function AgendaCard({ agenda, onClick }) {

  const iniciais = agenda.nutricionista.nome
    .split(" ")
    .map(n => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className="agenda-card-item"
      onClick={() => onClick(agenda)}
    >

      <div className="avatar">
        {iniciais}
      </div>

      <div className="agenda-info">
        <span className="data">
          {formatarData(agenda.data)}
        </span>

        <span className="nutri">
          {formatarNomeNutri(agenda.nutricionista)}
        </span>
      </div>

      <span className={`status ${agenda.status.toLowerCase()}`}>
        {formatarTexto(agenda.status)}
      </span>

    </div>
  );
}

export default AgendaCard;