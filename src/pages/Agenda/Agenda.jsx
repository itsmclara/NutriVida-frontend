import { useState, useRef, useEffect } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarPlus,
  CalendarDays,
  Lock,
  Unlock
} from "lucide-react";

import AgendamentoCard from "../../components/AgendamentoCard/AgendamentoCard";
import ModalNovaConsulta from "../../components/ModalNovaConsulta/ModalNovaConsulta";
import ModalAbrirAgenda from "../../components/ModalAbrirAgenda/ModalAbrirAgenda";
import ModalVerAgendas from "../../components/ModalVerAgendas/ModalVerAgendas";
import NutricionistaCard from "../../components/NutricionistaCard/NutricionistaCard";
import ModalSelecionarNutri from "../../components/ModalSelecionarNutri/ModalSelecionarNutri";
import Button from "../../components/Button/Button";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

import "./Agenda.css";

import api from "../../services/api";

import {
  formatarCPF,
  formatarTelefone,
  formatarData,
  dateParaISO,
  criarDataLocal
} from "../../utils/formatadores";

function Agenda() {

  const usuario = JSON.parse(
    sessionStorage.getItem("usuario")
  );

  const ehNutricionista =
    usuario?.perfil === "NUTRICIONISTA";

  const usuarioId = usuario?.id;

  const hoje = new Date();

  const dataInicialBase = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate()
  );

  const [dataAtual, setDataAtual] =
    useState(dataInicialBase);

  const inputRef = useRef(null);

  const [agendamentos, setAgendamentos] =
    useState([]);

  const [
    agendamentoSelecionado,
    setAgendamentoSelecionado
  ] = useState(null);

  const [
    modalNovaConsultaAberto,
    setModalNovaConsultaAberto
  ] = useState(false);

  const [
    modalAbrirAgendaAberto,
    setModalAbrirAgendaAberto
  ] = useState(false);

  const [
    modalVerAgendasAberto,
    setModalVerAgendasAberto
  ] = useState(false);

  const [dataSelecionada, setDataSelecionada] =
    useState("");

  const [horaSelecionada, setHoraSelecionada] =
    useState("");

  const [nutriSelecionada, setNutriSelecionada] =
    useState(null);

  const [nutricionistas, setNutricionistas] =
    useState([]);

  const [
    modalSelecionarNutri,
    setModalSelecionarNutri
  ] = useState(false);

  const [
    modalFecharAgenda,
    setModalFecharAgenda
  ] = useState(false);

  const [agendaAtual, setAgendaAtual] =
    useState(null);

  const horarios = [
    "07:00", "07:30", "08:00", "08:30",
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ];

  function proximoDia() {

    const nova = new Date(dataAtual);

    nova.setDate(
      nova.getDate() + 1
    );

    setAgendaAtual(null);

    setDataAtual(
      new Date(
        nova.getFullYear(),
        nova.getMonth(),
        nova.getDate()
      )
    );
  }

  function diaAnterior() {

    const nova = new Date(dataAtual);

    nova.setDate(
      nova.getDate() - 1
    );

    setAgendaAtual(null);

    setDataAtual(
      new Date(
        nova.getFullYear(),
        nova.getMonth(),
        nova.getDate()
      )
    );
  }

  const dataFormatada =
    dataAtual.toLocaleDateString(
      "pt-BR",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );

  const dataString =
    dateParaISO(dataAtual);

  useEffect(() => {

    async function buscarNutricionistas() {

      try {

        const res =
          await api.get("/nutricionistas");

        setNutricionistas(
          res.data
        );

        if (ehNutricionista) {

          const propriaNutri =
            res.data.find(
              (n) => n.id === usuarioId
            );

          setNutriSelecionada(
            propriaNutri || null
          );
        }

      } catch (error) {

        console.error(
          "Erro ao buscar nutricionistas:",
          error
        );
      }
    }

    buscarNutricionistas();

  }, [ehNutricionista, usuarioId]);

  useEffect(() => {

    async function buscarAgenda() {

      if (!nutriSelecionada) {

        setAgendaAtual(null);
        return;
      }

      try {

        const res =
          await api.get(
            "/agendas/dia",
            {
              params: {
                data: dataString,
                nutricionistaId:
                  nutriSelecionada.id
              }
            }
          );

        if (!res.data.existe) {

          setAgendaAtual(null);
          return;
        }

        setAgendaAtual(
          res.data.agenda
        );

      } catch (error) {

        console.error(
          "Erro ao buscar agenda:",
          error
        );
      }
    }

    buscarAgenda();

  }, [dataString, nutriSelecionada]);

  useEffect(() => {

    if (!nutriSelecionada) return;

    async function buscarAgendamentos() {

      try {

        const res =
          await api.get(
            "/agendamentos",
            {
              params: {
                data: dataString,
                nutricionistaId:
                  nutriSelecionada.id
              }
            }
          );

        setAgendamentos(
          res.data
        );

      } catch (error) {

        console.error(
          "Erro ao buscar agendamentos:",
          error
        );
      }
    }

    buscarAgendamentos();

  }, [dataString, nutriSelecionada]);

  async function alterarStatus(id, status) {

    try {

      await api.put(
        `/agendamentos/${id}/status`,
        {
          status
        }
      );

      setAgendamentos((prev) =>
        prev.map((slot) => ({

          ...slot,

          agendamentos: slot.agendamentos?.map(
            (agendamento) => {

              if (agendamento.id === id) {

                return {
                  ...agendamento,
                  agendamentoStatus: status
                };
              }

              return agendamento;
            }
          ) || []

        }))
      );

    } catch (error) {

      console.error(
        "Erro ao alterar status:",
        error
      );
    }
  }

  async function fecharAgenda() {

    if (!agendaAtual) return;

    try {

      await api.put(
        `/agendas/${agendaAtual.id}/status`,
        {
          status: "FINALIZADA"
        }
      );

      setAgendaAtual((prev) => ({
        ...prev,
        status: "FINALIZADA"
      }));

    } catch (error) {

      console.error(
        "Erro ao fechar agenda:",
        error
      );
    }
  }

  async function reabrirAgenda() {

    if (!agendaAtual) return;

    try {

      await api.put(
        `/agendas/${agendaAtual.id}/status`,
        {
          status: "ABERTA"
        }
      );

      setAgendaAtual((prev) => ({
        ...prev,
        status: "ABERTA"
      }));

    } catch (error) {

      console.error(
        "Erro ao reabrir agenda:",
        error
      );
    }
  }

  async function abrirAgendaRapido() {

    if (!nutriSelecionada) {
      return;
    }

    try {

      await api.post("/agendas", {
        data: dataString,
        nutricionistaId:
          nutriSelecionada.id,
        status: "ABERTA"
      });

      const res =
        await api.get(
          "/agendas/dia",
          {
            params: {
              data: dataString,
              nutricionistaId:
                nutriSelecionada.id
            }
          }
        );

      setAgendaAtual(
        res.data.agenda
      );

    } catch (error) {

      console.error(
        "Erro ao abrir agenda:",
        error
      );
    }
  }


  return (
    <div className="agenda">

      <div className="agenda-header">

        <div>

          <h1>Agenda</h1>

          <p>
            Visualize os horários disponíveis e gerencie os agendamentos da clínica.
          </p>

        </div>

        <div className="agenda-actions">

          {!agendaAtual && (

            <Button
              variant="secondary"
              onClick={() => {

                if (ehNutricionista) {

                  abrirAgendaRapido();

                } else {

                  setModalAbrirAgendaAberto(true);
                }
              }}
              icon={<CalendarPlus size={18} />}
            >
              Abrir agenda
            </Button>

          )}

          {agendaAtual?.status ===
            "ABERTA" && (

              <Button
                variant="danger"
                onClick={() =>
                  setModalFecharAgenda(true)
                }
                icon={<Lock size={18} />}
              >
                Fechar agenda
              </Button>

            )}

          {agendaAtual?.status ===
            "FINALIZADA" && (

              <Button
                variant="secondary"
                onClick={reabrirAgenda}
                icon={<Unlock size={18} />}
              >
                Reabrir agenda
              </Button>

            )}

          <Button
            variant="secondary"
            onClick={() =>
              setModalVerAgendasAberto(true)
            }
            icon={<CalendarDays size={18} />}
          >
            Ver agendas
          </Button>

          <Button
            onClick={() => {
              setDataSelecionada(
                dataString
              );
              setHoraSelecionada("");
              setModalNovaConsultaAberto(true);
            }}
            icon={<Plus size={18} />}
          >
            Nova consulta
          </Button>

        </div>

      </div>

      <NutricionistaCard
        nutri={nutriSelecionada}
        bloqueado={ehNutricionista}
        onClick={() => {

          if (!ehNutricionista) {
            setModalSelecionarNutri(true);
          }

        }}
      />

      <div className="agenda-card">

        <div className="agenda-topo">

          <div className="agenda-data">

            <button
              className="btn-seta"
              onClick={diaAnterior}
            >
              <ChevronLeft size={18} />
            </button>

            <span
              onClick={() =>
                inputRef.current.showPicker()
              }
            >
              {dataFormatada}
            </span>

            <button
              className="btn-seta"
              onClick={proximoDia}
            >
              <ChevronRight size={18} />
            </button>

            <input
              type="date"
              ref={inputRef}
              style={{
                position: "absolute",
                opacity: 0,
                pointerEvents: "none"
              }}
              onChange={(e) => {

                setAgendaAtual(null);

                setDataAtual(
                  criarDataLocal(
                    e.target.value
                  )
                );
              }}
            />

          </div>

          <div className="agenda-status">

            {!agendaAtual && (

              <span className="status-sem-agenda">
                Sem agenda
              </span>

            )}

            {agendaAtual?.status ===
              "ABERTA" && (

                <span className="status-aberta">
                  Agenda aberta
                </span>

              )}

            {agendaAtual?.status ===
              "FINALIZADA" && (

                <span className="status-finalizada">
                  Agenda fechada
                </span>

              )}

          </div>

        </div>

        {!nutriSelecionada ? (

          <div className="empty-message">
            Selecione uma nutricionista para visualizar a agenda
          </div>

        ) : (

          <div className="agenda-lista">

            {(() => {

              return horarios.map((hora) => {

                const slot =
                  agendamentos.find(
                    (s) => s.hora === hora
                  );

                const listaAgendamentos =
                  slot?.agendamentos || [];

                return (

                  <div
                    key={hora}
                    className="agenda-item"
                  >

                    <span className="hora">
                      {hora}
                    </span>

                    {listaAgendamentos.length > 0 ? (

                      <>
                        <div className="agendamentos-hora">
                          {listaAgendamentos.map((agendamento) => {

                            return (

                              <div
                                key={agendamento?.id}
                              >

                                <AgendamentoCard
                                  nome={
                                    agendamento?.paciente?.nome
                                  }
                                  hora={slot.hora}
                                  status={
                                    agendamento?.agendamentoStatus
                                  }
                                  agendamentoId={
                                    agendamento?.id
                                  }
                                  selecionado={
                                    agendamentoSelecionado?.id ===
                                    agendamento?.id
                                  }
                                  tipo="agenda"
                                  onClick={() =>

                                    setAgendamentoSelecionado(

                                      agendamentoSelecionado?.id ===
                                        agendamento?.id
                                        ? null
                                        : agendamento

                                    )
                                  }
                                  onAlterarStatus={
                                    alterarStatus
                                  }
                                />

                                {agendamentoSelecionado?.id ===
                                  agendamento?.id &&

                                  agendamento?.paciente && (

                                    <div className="detalhes-paciente">

                                      <div className="detalhes-grid">

                                        <div>

                                          <span>ID</span>

                                          <strong>
                                            {agendamento.paciente.id}
                                          </strong>

                                        </div>

                                        <div>

                                          <span>
                                            Data de cadastro
                                          </span>

                                          <strong>
                                            {
                                              formatarData(
                                                agendamento.paciente.dataCadastro
                                              ) || "—"
                                            }
                                          </strong>

                                        </div>

                                        <div>

                                          <span>Nome</span>

                                          <strong>
                                            {agendamento.paciente.nome}
                                          </strong>

                                        </div>

                                        <div>

                                          <span>Gênero</span>

                                          <strong>
                                            {
                                              agendamento.paciente.genero || "—"
                                            }
                                          </strong>

                                        </div>

                                        <div>

                                          <span>CPF</span>

                                          <strong>
                                            {
                                              formatarCPF(
                                                agendamento.paciente.cpf
                                              )
                                            }
                                          </strong>

                                        </div>

                                        <div>

                                          <span>
                                            Data de nascimento
                                          </span>

                                          <strong>
                                            {
                                              formatarData(
                                                agendamento.paciente.dataNascimento
                                              ) || "—"
                                            }
                                          </strong>

                                        </div>

                                        <div>

                                          <span>Telefone</span>

                                          <strong>
                                            {
                                              formatarTelefone(
                                                agendamento.paciente.telefone
                                              ) || "—"
                                            }
                                          </strong>

                                        </div>

                                        <div>

                                          <span>E-mail</span>

                                          <strong>
                                            {
                                              agendamento.paciente.email || "—"
                                            }
                                          </strong>

                                        </div>

                                      </div>

                                      <div className="detalhes-section">

                                        <span>
                                          Endereço
                                        </span>

                                        <p>

                                          {[
                                            agendamento.paciente.logradouro,
                                            agendamento.paciente.numero,
                                            agendamento.paciente.bairro,
                                            agendamento.paciente.cidade
                                          ]
                                            .filter(Boolean)
                                            .join(", ") || "—"}

                                        </p>

                                      </div>

                                    </div>

                                  )}

                              </div>

                            );

                          })}
                        </div>
                      </>

                    ) : (

                      <span
                        className={
                          !agendaAtual
                            ? "sem-agenda"
                            : agendaAtual?.status ===
                              "FINALIZADA"
                              ? "agenda-fechada"
                              : "disponivel"
                        }
                        onClick={() => {
                          setDataSelecionada(
                            dataString
                          );

                          setHoraSelecionada(
                            hora
                          );

                          setModalNovaConsultaAberto(true);
                        }}
                      >

                        {!agendaAtual
                          ? "Sem agenda"
                          : agendaAtual?.status ===
                            "FINALIZADA"
                            ? "Agenda fechada"
                            : "Disponível"}

                      </span>

                    )}

                  </div>

                );
              });

            })()}

          </div>

        )}

      </div>

      <ModalNovaConsulta
        aberto={modalNovaConsultaAberto}
        onClose={() =>
          setModalNovaConsultaAberto(false)
        }
        dataInicial={dataSelecionada}
        horaInicial={horaSelecionada}
        nutricionista={nutriSelecionada}
        nutricionistas={nutricionistas}
        onConsultaCriada={async ({
          data,
          nutricionistaId
        }) => {

          setDataAtual(
            criarDataLocal(data)
          );

          const nutri =
            nutricionistas.find(
              (n) =>
                n.id === nutricionistaId
            );

          setNutriSelecionada(
            nutri || null
          );

          const agendaRes =
            await api.get(
              "/agendas/dia",
              {
                params: {
                  data,
                  nutricionistaId
                }
              }
            );

          setAgendaAtual(
            agendaRes.data.agenda
          );

          const agendamentosRes =
            await api.get(
              "/agendamentos",
              {
                params: {
                  data,
                  nutricionistaId
                }
              }
            );

          setAgendamentos(
            agendamentosRes.data
          );
        }}
      />

      <ModalAbrirAgenda
        aberto={modalAbrirAgendaAberto}
        onClose={() =>
          setModalAbrirAgendaAberto(false)
        }

        nutricionistas={nutricionistas}

        dataInicial={dataString}

        nutricionistaInicial={
          nutriSelecionada
        }

        onAgendaCriada={async ({
          data,
          nutricionistaId
        }) => {

          const res =
            await api.get(
              "/agendas/dia",
              {
                params: {
                  data,
                  nutricionistaId
                }
              }
            );

          setAgendaAtual(
            res.data.agenda
          );

          const nutri =
            nutricionistas.find(
              (n) =>
                n.id === nutricionistaId
            );

          setNutriSelecionada(
            nutri || null
          );

          setDataAtual(
            criarDataLocal(data)
          );
        }}
      />

      <ModalVerAgendas
        aberto={modalVerAgendasAberto}
        onClose={() =>
          setModalVerAgendasAberto(false)
        }

        nutricionistas={nutricionistas}

        onSelecionar={(agenda) => {

          setAgendaAtual(
            agenda
          );

          setDataAtual(
            criarDataLocal(
              agenda.data
            )
          );

          setNutriSelecionada(
            agenda.nutricionista
          );

          setModalVerAgendasAberto(false);

        }}
      />

      <ModalSelecionarNutri
        aberto={modalSelecionarNutri}
        onClose={() =>
          setModalSelecionarNutri(false)
        }
        nutricionistas={nutricionistas}
        onSelecionar={(n) => {

          setAgendaAtual(null);

          setNutriSelecionada(n);
        }}
      />

      <ConfirmModal
        aberto={modalFecharAgenda}
        titulo="Fechar agenda"
        mensagem="Deseja realmente fechar esta agenda?"
        textoConfirmar="Fechar agenda"
        onConfirmar={async () => {

          await fecharAgenda();

          setModalFecharAgenda(false);
        }}
        onCancelar={() =>
          setModalFecharAgenda(false)
        }
      />

    </div>
  );
}

export default Agenda;