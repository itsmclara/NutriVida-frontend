import { useState } from "react";
import { FilePlus } from "lucide-react";
import Modal from "../Modal/Modal";
import "./ModalRegistrarConsulta.css";

function ModalRegistrarConsulta({ aberto, onClose }) {

  const [tipo, setTipo] = useState("");
  const [resumo, setResumo] = useState("");

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [circAbdominal, setCircAbdominal] = useState("");
  const [circQuadril, setCircQuadril] = useState("");
  const [gorduraCorporal, setGorduraCorporal] = useState("");

  const [planoAlimentar, setPlanoAlimentar] = useState("");
  const [observacoes, setObservacoes] = useState("");

  function limparFormulario() {
    setTipo("");
    setResumo("");
    setPeso("");
    setAltura("");
    setCircAbdominal("");
    setCircQuadril("");
    setGorduraCorporal("");
    setPlanoAlimentar("");
    setObservacoes("");
  }

  function handleClose() {
    limparFormulario();
    onClose();
  }

  function somenteNumero(valor) {
    return valor.replace(/[^\d.]/g, "");
  }

  function calcularIMC() {
    if (!peso || !altura) return null;
    const imc = peso / (altura * altura);
    return imc.toFixed(1);
  }

  function handleSalvar() {
    const novaConsulta = {
      data: new Date().toLocaleDateString("pt-BR"),
      tipo,
      resumo,
      peso,
      altura,
      circAbdominal,
      circQuadril,
      gorduraCorporal,
      imc: calcularIMC(),
      planoAlimentar: planoAlimentar.split("\n"),
      observacoes
    };

    console.log("CONSULTA:", novaConsulta);

    handleClose();
  }

  return (
    <Modal aberto={aberto} onClose={handleClose}>

      <div className="modal-header">
        <div className="modal-title">
          <FilePlus size={20} className="modal-icon" />
          <h2>Registrar consulta</h2>
        </div>

        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div className="modal-body">

        <div className="form-group">
          <label>Tipo de consulta</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className={!tipo ? "placeholder" : ""}
          >
            <option value="">Selecione o tipo de consulta</option>
            <option>Avaliação inicial</option>
            <option>Retorno</option>
          </select>
        </div>

        <div className="form-group">
          <label>Resumo da consulta (opcional)</label>
          <input
            placeholder="Ex: Revisão do plano alimentar..."
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Peso</label>
            <div className="input-unit">
              <input
                placeholder="Digite o peso"
                value={peso}
                onChange={(e) => setPeso(somenteNumero(e.target.value))}
              />
              <span>kg</span>
            </div>
          </div>

          <div className="form-group">
            <label>Altura</label>
            <div className="input-unit">
              <input
                placeholder="Digite a altura"
                value={altura}
                onChange={(e) => setAltura(somenteNumero(e.target.value))}
              />
              <span>m</span>
            </div>
          </div>

        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Circunferência abdominal</label>
            <div className="input-unit">
              <input
                placeholder="Digite a medida"
                value={circAbdominal}
                onChange={(e) => setCircAbdominal(somenteNumero(e.target.value))}
              />
              <span>cm</span>
            </div>
          </div>

          <div className="form-group">
            <label>Circunferência do quadril</label>
            <div className="input-unit">
              <input
                placeholder="Digite a medida"
                value={circQuadril}
                onChange={(e) => setCircQuadril(somenteNumero(e.target.value))}
              />
              <span>cm</span>
            </div>
          </div>

        </div>

        <div className="form-group">
          <label>Gordura corporal</label>
          <div className="input-unit">
            <input
              placeholder="Ex: 22"
              value={gorduraCorporal}
              onChange={(e) => setGorduraCorporal(somenteNumero(e.target.value))}
            />
            <span>%</span>
          </div>
        </div>

        <div className="form-group">
          <label>Plano alimentar</label>
          <textarea
            placeholder="Uma linha por refeição"
            value={planoAlimentar}
            onChange={(e) => setPlanoAlimentar(e.target.value)}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Observações</label>
          <textarea
            placeholder="Observações adicionais..."
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows={3}
          />
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

export default ModalRegistrarConsulta;