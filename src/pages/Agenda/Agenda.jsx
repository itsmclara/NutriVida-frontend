import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ConsultaCard from "../../components/ConsultaCard/ConsultaCard";
import "./Agenda.css";

function Agenda() {

  const [dataAtual, setDataAtual] = useState(new Date());
  const inputRef = useRef(null);

  const horarios = [
    "07:00", "07:30", "08:00", "08:30",
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ];

  const consultas = [
    {
      data: "2026-04-01",
      hora: "08:00",
      nome: "Nome do Paciente",
      status: "Confirmada"
    }
  ];

  function proximoDia() {
    const nova = new Date(dataAtual);
    nova.setDate(nova.getDate() + 1);
    setDataAtual(nova);
  }

  function diaAnterior() {
    const nova = new Date(dataAtual);
    nova.setDate(nova.getDate() - 1);
    setDataAtual(nova);
  }

  const dataFormatada = dataAtual.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const dataString = dataAtual.toISOString().split("T")[0];

  return (
    <div className="agenda">

      <div className="agenda-header">
        <div>
          <h1>Agenda</h1>
          <p>
            Visualize os horários disponíveis e gerencie os agendamentos da clínica.
          </p>
        </div>

        <button className="btn-primary">
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
              (c) => c.hora === hora && c.data === dataString
            );

            return (
              <div key={hora} className="agenda-item">

                <span className="hora">{hora}</span>

                {consulta ? (
                  <ConsultaCard consulta={consulta} />
                ) : (
                  <span className="disponivel">
                    Disponível
                  </span>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Agenda;