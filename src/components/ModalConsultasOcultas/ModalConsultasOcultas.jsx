import { useEffect, useState, useCallback } from "react";

import {
  ArchiveRestore,
  Archive
} from "lucide-react";

import Modal from "../Modal/Modal";

import api from "../../services/api";

import "./ModalConsultasOcultas.css";

import {
  formatarData,
  formatarTexto
} from "../../utils/formatadores";

function ModalConsultasOcultas({
  aberto,
  onClose,
  paciente,
  onAtualizar
}) {

  const [consultas, setConsultas] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const carregarOcultas = useCallback(
    async () => {

      if (!paciente) return;

      try {

        setLoading(true);

        const res = await api.get(
          "/consultas/ocultas",
          {
            params: {
              pacienteId: paciente.id
            }
          }
        );

        setConsultas(
          res.data || []
        );

      } catch (error) {

        console.error(
          "Erro ao buscar consultas ocultas:",
          error
        );

        setConsultas([]);

      } finally {

        setLoading(false);

      }
    },
    [paciente]
  );

  useEffect(() => {

    if (!aberto || !paciente) return;

    carregarOcultas();

  }, [
    aberto,
    paciente,
    carregarOcultas
  ]);

  async function restaurarConsulta(id) {

    try {

      await api.put(
        `/consultas/${id}/visibilidade`,
        {
          visivel: true
        }
      );

      await onAtualizar?.();

      await carregarOcultas();

      onAtualizar?.();

    } catch (error) {

      console.error(
        "Erro ao restaurar consulta:",
        error
      );
    }
  }

  if (!paciente) return null;

  return (

    <Modal
      aberto={aberto}
      onClose={onClose}
    >

      <div className="modal-header">

        <div className="modal-title">

          <Archive
            size={20}
            className="modal-icon"
          />

          <h2>
            Consultas ocultas
          </h2>

        </div>

        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

      </div>

      <div className="modal-body">

        {loading ? (

          <div className="ocultas-loading">
            Carregando...
          </div>

        ) : consultas.length === 0 ? (

          <div className="ocultas-empty">
            Nenhuma consulta oculta.
          </div>

        ) : (

          <div className="ocultas-lista">

            {consultas.map((consulta) => (

              <div
                key={consulta.id}
                className="ocultas-item"
              >

                <span>

                  {formatarData(
                    consulta.data
                  )}

                  {" • "}

                  {formatarTexto(
                    consulta.tipoConsulta
                  )}

                  {" • "}

                  {consulta.resumo}

                </span>

                <ArchiveRestore
                  size={20}
                  className="icon-restaurar"
                  onClick={() =>
                    restaurarConsulta(
                      consulta.id
                    )
                  }
                />

              </div>

            ))}

          </div>

        )}

      </div>

    </Modal>

  );
}

export default ModalConsultasOcultas;