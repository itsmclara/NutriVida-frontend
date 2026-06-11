import { useState } from "react";
import { FileText } from "lucide-react";

import HistoricoLista from "../HistoricoLista/HistoricoLista";
import ModalConsultasOcultas from "../ModalConsultasOcultas/ModalConsultasOcultas";

import "./Historico.css";

function Historico({
  paciente,
  historico,
  onAtualizar
}) {

  const [
    modalOcultasAberto,
    setModalOcultasAberto
  ] = useState(false);

  if (!paciente) {

    return (
      <div className="historico-card empty">
        <p>
          Selecione um paciente para visualizar o histórico
        </p>
      </div>
    );
  }

  return (
    <div className="historico-card">

      <div className="card-header">

        <span className="card-titulo">

          <FileText size={20} />

          Histórico

        </span>

        <button
          className="btn-ocultas"
          onClick={() =>
            setModalOcultasAberto(true)
          }
        >
          Ver ocultas
        </button>

      </div>

      <HistoricoLista
        paciente={paciente}
        historico={historico}
        onAtualizar={onAtualizar}
      />

      <ModalConsultasOcultas
        aberto={modalOcultasAberto}
        onClose={() =>
          setModalOcultasAberto(false)
        }
        paciente={paciente}
        onAtualizar={onAtualizar}
      />

    </div>
  );
}

export default Historico;