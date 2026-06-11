import {
  Check,
  X,
  AlertTriangle,
  Info
} from "lucide-react";

import "./Toast.css";

function Toast({
  mensagem,
  tipo,
  visivel
}) {

  if (!visivel) return null;

  const icones = {
    sucesso: <Check size={18} />,
    erro: <X size={18} />,
    aviso: <AlertTriangle size={18} />,
    info: <Info size={18} />
  };

  return (
    <div className={`toast toast-${tipo}`}>

      <div className="toast-icon">

        {icones[tipo]}

      </div>

      <span>

        {mensagem}

      </span>

    </div>
  );
}

export default Toast;