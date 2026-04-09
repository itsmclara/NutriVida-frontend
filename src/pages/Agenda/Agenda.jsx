import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ConsultaCard from "../../components/ConsultaCard/ConsultaCard";
import ModalAgendarConsulta from "../../components/ModalAgendarConsulta/ModalAgendarconsulta";
import "./Agenda.css";
import { consultas } from "../../mocks/dadosFake";

function Agenda() {

  const hoje = new Date();
  const dataInicialBase = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate()
  );

  const [dataAtual, setDataAtual] = useState(dataInicialBase);
  const inputRef = useRef(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horaSelecionada, setHoraSelecionada] = useState("");

  const horarios = [
    "07:00", "07:30", "08:00", "08:30",
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ];

  function formatarDataISO(date) {
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  }

  function proximoDia() {
    const nova = new Date(dataAtual);
    nova.setDate(nova.getDate() + 1);
    setDataAtual(new Date(
      nova.getFullYear(),
      nova.getMonth(),
      nova.getDate()
    ));
  }

  function diaAnterior() {
    const nova = new Date(dataAtual);
    nova.setDate(nova.getDate() - 1);
    setDataAtual(new Date(
      nova.getFullYear(),
      nova.getMonth(),
      nova.getDate()
    ));
  }

  const dataFormatada = dataAtual.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const dataString = formatarDataISO(dataAtual);

  return (
    <div className="agenda">

      <div className="agenda-header">
        <div>
          <h1>Agenda</h1>
          <p>
            Visualize os horários disponíveis e gerencie os agendamentos da clínica.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            setDataSelecionada("");
            setHoraSelecionada("");
            setModalAberto(true);
          }}
        >
          + Agendar consulta
        </button>
      </div>

      <div className="agenda-card">

        <div className="agenda-data">

          <button className="btn-seta" onClick={diaAnterior}>
            <ChevronLeft size={18} />
          </button>

          <span onClick={() => inputRef.current.showPicker()}>
            {dataFormatada}
          </span>

          <button className="btn-seta" onClick={proximoDia}>
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
              const [ano, mes, dia] = e.target.value.split("-");
              setDataAtual(new Date(ano, mes - 1, dia));
            }}
          />

        </div>

        <div className="agenda-lista">

          {horarios.map((hora) => {

            const consulta = consultas.find(
              (c) =>
                c.hora === hora &&
                c.data === dataString
            );

            return (
              <div key={hora} className="agenda-item">

                <span className="hora">{hora}</span>

                {consulta ? (
                  <ConsultaCard consulta={consulta} />
                ) : (
                  <span
                    className="disponivel"
                    onClick={() => {
                      setDataSelecionada(dataString); 
                      setHoraSelecionada(hora);       
                      setModalAberto(true);
                    }}
                  >
                    Disponível
                  </span>
                )}

              </div>
            );
          })}

        </div>

      </div>

      <ModalAgendarConsulta
        key={modalAberto ? dataSelecionada + horaSelecionada : "fechado"}
        aberto={modalAberto}
        onClose={() => setModalAberto(false)}
        dataInicial={dataSelecionada}
        horaInicial={horaSelecionada}
      />

    </div>
  );
}

export default Agenda;