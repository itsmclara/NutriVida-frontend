import { useState } from "react";
import { Calendar } from "lucide-react";
import Modal from "../Modal/Modal";
import "./ModalAgendarConsulta.css";

function ModalAgendarConsulta({
  aberto,
  onClose,
  dataInicial = "",
  horaInicial = ""
}) {

  const [paciente, setPaciente] = useState("");
  const [data, setData] = useState(dataInicial || "");
  const [hora, setHora] = useState(horaInicial || "");

  function limparFormulario() {
    setPaciente("");
    setData("");
    setHora("");
  }

  function handleClose() {
    limparFormulario();
    onClose();
  }

  function handleSalvar() {
    const novaConsulta = {
      paciente,
      data,
      hora
    };

    console.log("CONSULTA:", novaConsulta);

    handleClose();
  }

  return (
    <Modal aberto={aberto} onClose={handleClose}>

      <div className="modal-header">
        <div className="modal-title">
          <Calendar size={20} className="modal-icon" />
          <h2>Agendar consulta</h2>
        </div>

        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div className="modal-body">

        <div className="form-group">
          <label>Paciente</label>
          <input
            placeholder="Buscar paciente"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className={!data ? "input-placeholder" : ""}
            />
          </div>

          <div className="form-group">
            <label>Horário</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className={!hora ? "input-placeholder" : ""}
            />
          </div>
        </div>

      </div>

      <div className="modal-footer">
        <button className="btn-secondary" onClick={handleClose}>
          Cancelar
        </button>

        <button className="btn-primary" onClick={handleSalvar}>
          Salvar
        </button>
      </div>

    </Modal>
  );
}

export default ModalAgendarConsulta;