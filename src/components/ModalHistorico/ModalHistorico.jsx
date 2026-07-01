import { useEffect, useState, useCallback } from "react";

import { History } from "lucide-react";

import Modal from "../Modal/Modal";
import HistoricoLista from "../HistoricoLista/HistoricoLista";
import ModalConsultasOcultas from "../ModalConsultasOcultas/ModalConsultasOcultas";

import api from "../../services/api";

import "./ModalHistorico.css";

function ModalHistorico({
  aberto,
  onClose,
  paciente
}) {

  const [
    modalOcultasAberto,
    setModalOcultasAberto
  ] = useState(false);

  const [historico, setHistorico] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const carregarHistorico = useCallback(
    async () => {

      if (!paciente) return;

      try {

        setLoading(true);

        const res = await api.get(
          "/consultas",
          {
            params: {
              pacienteId: paciente.id
            }
          }
        );

        setHistorico(
          res.data || []
        );

      } catch (error) {

        console.error(
          "Erro ao buscar histórico:",
          error
        );

        setHistorico([]);

      } finally {

        setLoading(false);

      }
    },
    [paciente]
  );

  useEffect(() => {

    if (!aberto || !paciente) return;

    carregarHistorico();

  }, [
    aberto,
    paciente,
    carregarHistorico
  ]);

  if (!paciente) return null;

  return (
    <Modal
      aberto={aberto}
      onClose={onClose}
    >

      <div className="modal-header">

        <div className="modal-title">

          <History
            size={20}
            className="modal-icon"
          />

          <h2>
            Histórico do paciente
          </h2>

        </div>

        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

      </div>

      <div className="historico-acoes">

        <button
          className="btn-ocultas"
          onClick={() =>
            setModalOcultasAberto(true)
          }
        >
          Ver consultas ocultas
        </button>

      </div>

      <div className="modal-body historico-modal-body">

        {loading ? (

          <div className="historico-loading">
            Carregando histórico...
          </div>

        ) : (

          <HistoricoLista
            paciente={paciente}
            historico={historico}
            onAtualizar={carregarHistorico}
          />

        )}

        <ModalConsultasOcultas
          aberto={modalOcultasAberto}
          onClose={() =>
            setModalOcultasAberto(false)
          }
          paciente={paciente}
          onAtualizar={carregarHistorico}
        />

      </div>

    </Modal>
  );
}

export default ModalHistorico;