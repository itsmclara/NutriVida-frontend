import { useState } from "react";

import {
  ArrowLeft,
  FileDown
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import FiltroSelect from "../../components/FiltroSelect/FiltroSelect";

import "./RelatorioAgenda.css";

function RelatorioAgenda() {

  const navigate = useNavigate();

  const [agendamentos] = useState([]);

  return (
    <>
      <div className="relatorio-header">

        <div>

          <button
            className="btn-voltar"
            onClick={() =>
              navigate("/relatorios")
            }
          >
            <ArrowLeft size={18} />
            Voltar para relatórios
          </button>

          <h1>
            Relatório de Agenda do Dia
          </h1>

          <p>
            Exibe todos os horários agendados de uma determinada data.
          </p>

        </div>

        <Button
          icon={<FileDown size={18} />}
        >
          Emitir relatório (PDF)
        </Button>

      </div>

      <div className="filtros-container">

        <div className="input-group">

          <label>Data</label>

          <input type="date" />

        </div>

        <FiltroSelect
          label="Nutricionista"
          valor=""
          onChange={() => { }}
          opcoes={[
            "Dra. Patricia",
            "Dra. Ana"
          ]}
        />

      </div>

      <div className="tabela-container">

        <div className="tabela-topo">

          <strong>
            Quantidade de horários:
            <span className="total-valor">
              {" "}0
            </span>
          </strong>

        </div>

        <table className="tabela">

          <thead>

            <tr>
              <th>Horário</th>
              <th>Paciente</th>
              <th>Tipo da consulta</th>
            </tr>

          </thead>

          <tbody>

            {agendamentos.length > 0 ? (

              agendamentos.map((a) => (

                <tr key={a.id}>
                  <td>{a.hora}</td>
                  <td>{a.paciente}</td>
                  <td>{a.tipo}</td>
                </tr>

              ))

            ) : (

              <tr className="empty-row">

                <td
                  colSpan="3"
                  className="empty-message"
                >
                  Nenhum agendamento encontrado
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default RelatorioAgenda;