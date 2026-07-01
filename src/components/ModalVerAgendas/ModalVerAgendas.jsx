import { useEffect, useState } from "react";
import { CalendarDays, SlidersHorizontal } from "lucide-react";
import Modal from "../Modal/Modal";
import api from "../../services/api";
import AgendaCard from "../AgendaCard/AgendaCard";
import FiltroSelect from "../FiltroSelect/FiltroSelect";
import Button from "../Button/Button";
import "./ModalVerAgendas.css";

function ModalVerAgendas({ aberto, onClose, onSelecionar, nutricionistas }) {

  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  const ehNutricionista = usuario?.perfil === "NUTRICIONISTA";

  const [tipo, setTipo] = useState("ABERTA");
  const [agendas, setAgendas] = useState([]);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const hoje = new Date();
  const [mes, setMes] = useState(String(hoje.getMonth() + 1));
  const [ano, setAno] = useState(String(hoje.getFullYear()));
  const [nutricionistaId, setNutricionistaId] = useState("");

  useEffect(() => {
    if (!aberto) return;

    async function carregarAgendas() {
      try {
        const res = await api.get("/agendas", {
          params: {
            status: tipo,
            ...(mes ? { mes } : {}),
            ...(ano ? { ano } : {}),
            ...(ehNutricionista
              ? { nutricionistaId: usuario?.id }
              : nutricionistaId
                ? { nutricionistaId }
                : {})
          }
        });
        setAgendas(res.data);
      } catch (error) {
        console.error("Erro ao buscar agendas:", error);
      }
    }

    carregarAgendas();
  }, [tipo, aberto, mes, ano, nutricionistaId, ehNutricionista, usuario?.id]);

  function handleClose() {
    onClose();
  }

  return (
    <Modal aberto={aberto} onClose={handleClose} className="modal-ver-agendas">

      <div className="modal-header">
        <div className="modal-title">
          <CalendarDays size={20} className="modal-icon" />
          <h2>Ver agendas</h2>
        </div>
        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div className="agenda-toolbar">

        <div className="tabs">
          <button
            className={tipo === "ABERTA" ? "tab active" : "tab"}
            onClick={() => setTipo("ABERTA")}
          >
            Abertas
          </button>
          <button
            className={tipo === "FINALIZADA" ? "tab active" : "tab"}
            onClick={() => setTipo("FINALIZADA")}
          >
            Finalizadas
          </button>
        </div>

        <button
          className="btn-filtros"
          onClick={() => setFiltrosAbertos(!filtrosAbertos)}
        >
          <SlidersHorizontal size={16} />
          Filtros
        </button>

        <div className={`agenda-filtros ${filtrosAbertos ? "abertos" : ""}`}>
          <FiltroSelect
            label="Mês"
            valor={mes}
            onChange={setMes}
            opcoes={[
              { valor: "1", label: "Jan" },
              { valor: "2", label: "Fev" },
              { valor: "3", label: "Mar" },
              { valor: "4", label: "Abr" },
              { valor: "5", label: "Mai" },
              { valor: "6", label: "Jun" },
              { valor: "7", label: "Jul" },
              { valor: "8", label: "Ago" },
              { valor: "9", label: "Set" },
              { valor: "10", label: "Out" },
              { valor: "11", label: "Nov" },
              { valor: "12", label: "Dez" }
            ]}
          />

          <FiltroSelect
            label="Ano"
            valor={ano}
            onChange={setAno}
            opcoes={["2025", "2026", "2027"]}
          />

          {!ehNutricionista && (
            <FiltroSelect
              label="Nutricionista"
              valor={nutricionistaId}
              onChange={setNutricionistaId}
              opcoes={nutricionistas.map((n) => ({
                valor: String(n.id),
                label: n.nome
              }))}
            />
          )}
        </div>

      </div>

      <div className="modal-body">
        {agendas.length > 0 ? (
          agendas.map((agenda) => (
            <AgendaCard
              key={agenda.id}
              agenda={agenda}
              onClick={(a) => {
                onSelecionar(a);
                handleClose();
              }}
            />
          ))
        ) : (
          <div className="empty-message">Nenhuma agenda encontrada</div>
        )}
      </div>

      <div className="modal-footer">
        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
      </div>

    </Modal>
  );
}

export default ModalVerAgendas;