import "./NutricionistaCard.css";
import { formatarNomeNutri } from "../../utils/formatadores";

function NutricionistaCard({
  nutri,
  onClick,
  bloqueado = false
}) {
  return (
    <div className="nutri-card" onClick={onClick}>

      <div className="nutri-avatar">
        {nutri?.nome
          ? nutri.nome.split(" ").map(n => n[0]).join("").slice(0, 2)
          : "?"}
      </div>

      <div className="nutri-info">
        <span className="nutri-label">Nutricionista</span>

        <strong>
          {nutri ? formatarNomeNutri(nutri) : "Selecione uma nutricionista"}
        </strong>

        {nutri?.crn && (
          <span className="nutri-crn">CRN {nutri.crn}</span>
        )}
      </div>

      {!bloqueado && (
        <span className="nutri-arrow">
          ▾
        </span>
      )}

    </div>
  );
}

export default NutricionistaCard;