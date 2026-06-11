import { useState } from "react";
import { User, FileEdit, PlusCircle } from "lucide-react";

import ModalRegistrarConsulta from "../ModalRegistrarConsulta/ModalRegistrarConsulta";
import ModalEditarProntuario from "../ModalEditarProntuario/ModalEditarProntuario";
import ModalEditarConsulta from "../ModalEditarConsulta/ModalEditarConsulta";
import Button from "../Button/Button";

import "./PacienteResumo.css";

function PacienteResumo({ paciente, itemAgenda, onAtualizar }) {

  const [modalRegistrarConsultaAberto, setModalRegistrarConsultaAberto] = useState(false);
  const [modalEditarProntuarioAberto, setModalEditarProntuarioAberto] = useState(false);
  const [modalEditarConsultaAberto, setModalEditarConsultaAberto] = useState(false);
  const possuiConsulta = !!itemAgenda?.consulta?.id;

  return (
    <div className="paciente-content">
      <div className="paciente-card">

        {/* HEADER */}
        <div className="card-header">
          <span className="card-titulo">
            <User size={20} />
            Detalhes do paciente
          </span>
        </div>

        <div className="card-body">

          {!paciente ? (
            <div className="empty-paciente">
              Selecione um paciente para visualizar os dados
            </div>
          ) : (

            <div className="paciente-content">

              <div className="paciente-scroll">

                {/* GRID */}
                <div className="paciente-grid">

                  <div>
                    <span>Nº do prontuário</span>
                    <strong>{paciente.prontuario?.numero || "—"}</strong>
                  </div>

                  <div>
                    <span>Nome</span>
                    <strong>{paciente.nome}</strong>
                  </div>

                  <div>
                    <span>Idade</span>
                    <strong>{paciente.idade || "—"}</strong>
                  </div>

                  <div>
                    <span>Gênero</span>
                    <strong>{paciente.genero || "—"}</strong>
                  </div>

                </div>

                {/* PRONTUÁRIO */}
                <div className="paciente-section">
                  <span>Objetivo</span>
                  <p>{paciente.prontuario?.objetivo || "Não informado"}</p>
                </div>

                <div className="paciente-section">
                  <span>Informações clínicas</span>
                  <p>{paciente.prontuario?.informacoesClinicas || "Não informado"}</p>
                </div>

                <div className="paciente-section">
                  <span>Restrições alimentares</span>
                  <p>{paciente.prontuario?.restricaoAlimentar || "Não informado"}</p>
                </div>

              </div>

              {/* AÇÕES */}
              <div className="paciente-actions">

                <Button
                  variant="secondary"
                  icon={<FileEdit size={16} />}
                  onClick={() =>
                    setModalEditarProntuarioAberto(true)
                  }
                >
                  Editar prontuário
                </Button>

                <Button
                  variant={
                    possuiConsulta
                      ? "secondary"
                      : "primary"
                  }

                  icon={
                    possuiConsulta
                      ? <FileEdit size={16} />
                      : <PlusCircle size={16} />
                  }

                  onClick={() => {

                    if (possuiConsulta) {

                      setModalEditarConsultaAberto(true);

                    } else {

                      setModalRegistrarConsultaAberto(true);
                    }
                  }}
                >

                  {possuiConsulta
                    ? "Editar consulta"
                    : "Registrar consulta"}

                </Button>

              </div>

            </div>

          )}

        </div>

      </div>

      {/* MODAIS */}

      <ModalRegistrarConsulta
        aberto={modalRegistrarConsultaAberto}
        onClose={() =>
          setModalRegistrarConsultaAberto(false)
        }
        itemAgendaId={itemAgenda?.itemAgendaId}
        pacienteId={paciente?.id}
        onSalvo={() =>
          onAtualizar(paciente?.id)
        }
      />

      <ModalEditarProntuario
        aberto={modalEditarProntuarioAberto}
        onClose={() => setModalEditarProntuarioAberto(false)}
        paciente={paciente}
        onSalvo={() => onAtualizar(paciente?.id)}
      />

      <ModalEditarConsulta
        aberto={modalEditarConsultaAberto}
        onClose={() =>
          setModalEditarConsultaAberto(false)
        }
        consulta={itemAgenda?.consulta}
        onSalvo={() =>
          onAtualizar(paciente?.id)
        }
      />

    </div>
  );
}

export default PacienteResumo;