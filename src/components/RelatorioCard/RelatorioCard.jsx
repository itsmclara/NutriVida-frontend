import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";

import "./RelatorioCard.css";

function RelatorioCard({
  titulo,
  descricao,
  icon,
  rota
}) {

  const navigate = useNavigate();

  return (
    <div className="relatorio-card">

      <div className="relatorio-icon">

        {icon || <FileText size={22} />}

      </div>

      <div className="relatorio-content">

        <h3>{titulo}</h3>

        <p>{descricao}</p>

      </div>

      <Button
        onClick={() => navigate(rota)}
      >
        Emitir relatório
      </Button>

    </div>
  );
}

export default RelatorioCard;